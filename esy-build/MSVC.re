module SandboxValue = EsyBuildPackage.Config.Value;
module SandboxEnvironment = EsyBuildPackage.Config.Environment;

let getSDK = () => {
  open Run.Syntax;
  let* (vsWhereOutput, _run_status) =
    Bos.Cmd.(
      v(
        "C:\\Program Files (x86)\\Microsoft Visual Studio\\Installer\\vswhere.exe",
      )
      % "-products"
      % "*"
      % "/nologo"
    )
    |> Bos.OS.Cmd.run_out
    |> Bos.OS.Cmd.out_string
    |> Run.ofBosError;
  let products =
    vsWhereOutput
    |> Astring.String.cuts(~sep="\n\n")
    |> List.map(~f=product =>
         product
         |> Astring.String.cuts(~sep="\n")
         |> List.filter_map(~f=line => line |> Astring.String.cut(~sep=": "))
         |> StringMap.of_list
       );

  let* product =
    switch (products) {
    | [] => Run.error("No Visual Studion installation found")
    | [product] => Run.return(product)
    | products =>
      Esy_logs.app(m => m("Found the following products"));
      products
      |> List.iter(~f=product => {
           let productId = StringMap.get("productId", product);
           Esy_logs.app(m => m("%s", productId));
         });
      products |> List.hd |> Run.return;
    };

  Esy_logs.app(m => m("Picking: %s", StringMap.get("productId", product)));
  let productInstallationPath = StringMap.get("installationPath", product);
  // For ref,
  // Get-ItemProperty -path "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Microsoft SDKs\Windows\v10.0"
  let windowsKitPath =
    System.getRegistryKey(
      "SOFTWARE\\WOW6432Node\\Microsoft\\Microsoft SDKs\\Windows\\v10.0",
      "InstallationFolder",
    );
  let arch = "x64";
  let hostArchFolder = "HostX64";
  let windowsKitProductVersion =
    System.getRegistryKey(
      "SOFTWARE\\WOW6432Node\\Microsoft\\Microsoft SDKs\\Windows\\v10.0",
      "ProductVersion",
    );
  Ok((
    productInstallationPath,
    windowsKitPath,
    arch,
    hostArchFolder,
    windowsKitProductVersion,
  ));
};

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
  let* (
    productInstallationPath,
    windowsKitPath,
    arch,
    hostArchFolder,
    windowsKitProductVersion,
  ) =
    getSDK();
  Esy_logs.app(m =>
    m(
      "Visual Studio production installation path: %s",
      productInstallationPath,
    )
  );
  Esy_logs.app(m => m("Windows Kits: %s", windowsKitPath));
  Esy_logs.app(m =>
    m("Windows Kit product version: %s", windowsKitProductVersion)
  );
  let cmd =
    Bos.Cmd.(
      v(
        Printf.sprintf(
          "%s\\VC\\Auxiliary\\Build\\vcvarsall.bat",
          productInstallationPath,
        ),
      )
      % arch
      % "uwp"
      % windowsKitProductVersion
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
                ++ Printf.sprintf(
                     "%s\\Include\\%s\\ucrt",
                     windowsKitPath,
                     windowsKitProductVersion,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\Include\\%s\\um",
                     windowsKitPath,
                     windowsKitProductVersion,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\Include\\%s\\shared",
                     windowsKitPath,
                     windowsKitProductVersion,
                   )
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
                ++ Printf.sprintf(
                     "%s\\VC\\Tools\\MSVC\\14.40.33807\\lib\\%s",
                     productInstallationPath,
                     arch,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\Lib\\%s\\um\\%s",
                     windowsKitPath,
                     windowsKitProductVersion,
                     arch,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\Lib\\%s\\ucrt\\%s",
                     windowsKitPath,
                     windowsKitProductVersion,
                     arch,
                   )
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
                Printf.sprintf(
                  "%s\\VC\\Tools\\MSVC\\14.40.33807\\bin\\%s\\%s;",
                  productInstallationPath,
                  hostArchFolder,
                  arch,
                )
                ++ "/bin;/usr/bin;"  // This order is important for some reason. Otherwise, compiler fails to build with /entry:wmainCRTStartup is invalid option
                ++ b
                ++ ";"
                ++ windir
                ++ ";"
                ++ defaultPath
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\Bin\\%s\\%s",
                     windowsKitPath,
                     windowsKitProductVersion,
                     arch,
                   )
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
