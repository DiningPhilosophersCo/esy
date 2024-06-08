#include <stdio.h>

#include <caml/alloc.h>
#include <caml/memory.h>
#include <caml/mlvalues.h>
#include <caml/fail.h>

#ifdef WIN32
#include <Windows.h>
#include <winbase.h>
#endif

CAMLprim value
esy_win32_check_long_path_regkey(value unit) {
#ifndef WIN32
    return Val_true; 
#else
    HKEY hKey;
    LONG code = RegOpenKeyExW(
            HKEY_LOCAL_MACHINE,
            L"SYSTEM\\CurrentControlSet\\Control\\FileSystem",
            0,
            KEY_READ|KEY_WOW64_64KEY,
            &hKey);

    if (code != ERROR_SUCCESS)
        return Val_false;

    BYTE *buffer = (BYTE*)LocalAlloc(LPTR, 4);
    DWORD length = {4};
    code = RegQueryValueExW(
            hKey,
            L"LongPathsEnabled",
            0,
            0,
            buffer,
            &length
            );
    DWORD result = *(DWORD*)buffer;

    if (code != ERROR_SUCCESS)
        return Val_false;

    if (result == 1) {
        return Val_true;
    } else {
        return Val_false;
    }
#endif
}

CAMLprim value
esy_move_file(value src, value dst) {
#ifndef WIN32
  rename(String_val(src), String_val(dst));
#else
  MoveFileExA(String_val(src), String_val(dst), MOVEFILE_COPY_ALLOWED | MOVEFILE_REPLACE_EXISTING | MOVEFILE_WRITE_THROUGH);
#endif
  return Val_unit;
}  


CAMLprim value
esy_win32_get_regkey(value path, value reg_val) {
#ifndef WIN32
   caml_failwith("Called in a non-Windows environment"); 
#else
    size_t chars_converted;
    const char* c_path = String_val(path);
    size_t path_size = strlen(c_path) + 1;
    wchar_t* wc_path = (wchar_t*)malloc(path_size * sizeof(wchar_t));
    chars_converted = mbstowcs(wc_path, c_path, path_size);
    if (chars_converted == (size_t) -1) {
      caml_failwith("Internal system error: Could not convert to wide char string");
    }
    const char* c_reg_val = String_val(reg_val);
    size_t reg_val_size = strlen(c_reg_val) + 1;
    wchar_t* wc_reg_val = (wchar_t*)malloc(reg_val_size * sizeof(wchar_t));
    chars_converted = mbstowcs(wc_reg_val, c_reg_val, reg_val_size);
    if (chars_converted == (size_t) -1) {
      free(wc_path);
      free(wc_reg_val);
      caml_failwith("Internal system error: Could not convert to wide char string");
    }
    HKEY hKey;
    LONG code = RegOpenKeyExW(
            HKEY_LOCAL_MACHINE,
	    wc_path,
            0,
            KEY_READ|KEY_WOW64_64KEY,
            &hKey);

    if (code != ERROR_SUCCESS) {
      free(wc_path);
      free(wc_reg_val);
      char msg[1024];
      sprintf(msg, "Failed to open registry key with path: %s", c_path);
      caml_failwith(msg);
    }

    const int value_bytes_length = 1024;
    BYTE *buffer = (BYTE*)LocalAlloc(LPTR, value_bytes_length);
    DWORD length = {value_bytes_length};
    code = RegQueryValueExW(
            hKey,
	    wc_reg_val,
            0,
            0,
            buffer,
            &length
            );

    if (code != ERROR_SUCCESS) {
      char msg[1024];
      sprintf(msg, "Failed to get registry val (%s) with path: %s", c_reg_val, c_path);
      caml_failwith(msg);
    }

    return caml_alloc_initialized_string(length, buffer);

#endif
}
