module SandboxValue = EsyBuildPackage.Config.Value;
module SandboxEnvironment = EsyBuildPackage.Config.Environment;

let productInstallationPath = "C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools";
let compilerPaths = globalPathVariable => {
  open Run.Syntax;
  /*
     Some notes.

     * Command to display the environment from MSVC. Tested on Powershell
     C:\Windows\System32\cmd.exe /c "`"C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat`" x64 && set"

     * It's not enought to just run vcvarall because of the way we call Bos.Cmd
     If vcvarsall is run,
     "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\14.40.33807\bin\HostX64\x64" is missing in Path

     * The following did not work as arguments to Bos.Cmd.(v(...) <args>)
       % "\"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\Build\\vcvarsall.bat\" x64 && set" 
       % "`\"C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Auxiliary\\Build\\vcvarsall.bat`\" x64 && set"

   */
  let cmd =
    Bos.Cmd.(
      v(
        Printf.sprintf("%s\\VC\\Auxiliary\\Build\\vcvarsall.bat", productInstallationPath)
      )
      % "x64"
      % "uwp"
      % "10.0.20348.0"
      % "&&"
      % "set"
    );
  let* (kvLines, _run_status) =
    Run.ofBosError @@ Bos.OS.Cmd.out_lines(Bos.OS.Cmd.run_out(cmd));
  let kvLines =
    List.filter_map(
      ~f=
        kv => {
          switch (String.split_on_char('=', kv)) {
          /* | ["TMP" as a, b, ..._r] => None */
          | ["INCLUDE" as a, b, ..._r] =>
            Some(
              SandboxEnvironment.Bindings.value(
                a,
                b
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.20348.0\\ucrt"
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.20348.0\\um"
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Include\\10.0.20348.0\\shared"
                |> SandboxValue.v,
              ),
            )
          | ["LIBPATH" as a, b, ..._r]
          | ["LIB" as a, b, ..._r] =>
            Some(
              SandboxEnvironment.Bindings.value(
                a,
                b
                ++ ";"
                ++ "C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\VC\\Tools\\MSVC\\14.40.33807\\lib\\x64"
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.20348.0\\um\\x64"
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.20348.0\\ucrt\\x64"
                |> SandboxValue.v,
              ),
            )

          | ["PATH", b, ..._r]
          | ["Path", b, ..._r] =>
            let defaultPath =
              switch (globalPathVariable) {
              | Some(pathVar) =>
                let esyGlobalPath = Sys.getenv(pathVar);
                "$PATH;" ++ esyGlobalPath;
              | None => "$PATH"
              };
            let windir = Sys.getenv("WINDIR") ++ "/System32";
            let windir = Path.normalizePathSepOfFilename(windir);
            Some(
              SandboxEnvironment.Bindings.value(
                "PATH",
                Printf.sprintf("%s\\VC\\Tools\\MSVC\\14.40.33807\\bin\\HostX64\\x64;", productInstallationPath)
                ++ "/bin;/usr/bin;" // This order is important for some reason. Otherwise, compiler fails to build with /entry:wmainCRTStartup is invalid option
                ++ b
                ++ ";"
                ++ windir
                ++ ";"
                ++ defaultPath
                ++ ";"
                ++ "C:\\Program Files (x86)\\Windows Kits\\10\\Bin\\10.0.20348.0\\x64"
                |> SandboxValue.v,
              ),
            );
          | _ => None
          }
        },
      ["LIB=", ...kvLines],
    );
  Ok(kvLines);
};
