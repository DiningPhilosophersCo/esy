module SandboxValue = EsyBuildPackage.Config.Value;
module SandboxEnvironment = EsyBuildPackage.Config.Environment;

let vsWhereOutput = {|instanceId: 48b20715
installDate: 24-05-2024 18:57:19
installationName: VisualStudio/17.10.0+34916.146
installationPath: C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools
installationVersion: 17.10.34916.146
productId: Microsoft.VisualStudio.Product.BuildTools
productPath: C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\Common7\Tools\LaunchDevCmd.bat
state: 4294967295
isComplete: 1
isLaunchable: 1
isPrerelease: 0
isRebootRequired: 0
displayName: Visual Studio Build Tools 2022
description: The Visual Studio Build Tools allows you to build native and managed MSBuild-based applications without requiring the Visual Studio IDE. There are options to install the Visual C++ compilers and libraries, MFC, ATL, and C++/CLI support.
channelId: VisualStudio.17.Release
channelUri: https://aka.ms/vs/17/release/channel
enginePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\resources\app\ServiceHub\Services\Microsoft.VisualStudio.Setup.Service
installChannelUri: https://aka.ms/vs/17/release/213061705_1612541648/channel
installedChannelId: VisualStudio.17.Release
installedChannelUri: https://aka.ms/vs/17/release/channel
releaseNotes: https://docs.microsoft.com/en-us/visualstudio/releases/2022/release-notes-v17.10#17.10.0
resolvedInstallationPath: C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools
thirdPartyNotices: https://go.microsoft.com/fwlink/?LinkId=661288
updateDate: 2024-05-24T13:27:19.3339249Z
catalog_buildBranch: d17.10
catalog_buildVersion: 17.10.34916.146
catalog_id: VisualStudio/17.10.0+34916.146
catalog_localBuild: build-lab
catalog_manifestName: VisualStudio
catalog_manifestType: installer
catalog_productDisplayVersion: 17.10.0
catalog_productLine: Dev17
catalog_productLineVersion: 2022
catalog_productMilestone: RTW
catalog_productMilestoneIsPreRelease: False
catalog_productName: Visual Studio
catalog_productPatchVersion: 0
catalog_productPreReleaseMilestoneSuffix: 8.0
catalog_productSemanticVersion: 17.10.0+34916.146
catalog_requiredEngineVersion: 3.10.2154.60269
properties_campaignId:
properties_channelManifestId: VisualStudio.17.Release/17.10.0+34916.146
properties_includeRecommended: 0
properties_nickname:
properties_setupEngineFilePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe

instanceId: df4d7c9d
installDate: 24-05-2024 19:58:14
installationName: VisualStudio/17.10.0+34916.146
installationPath: C:\Program Files\Microsoft Visual Studio\2022\Community
installationVersion: 17.10.34916.146
productId: Microsoft.VisualStudio.Product.Community
productPath: C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\devenv.exe
state: 4294967295
isComplete: 1
isLaunchable: 1
isPrerelease: 0
isRebootRequired: 0
displayName: Visual Studio Community 2022
description: Powerful IDE, free for students, open-source contributors, and individuals
channelId: VisualStudio.17.Release
channelUri: https://aka.ms/vs/17/release/channel
enginePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\resources\app\ServiceHub\Services\Microsoft.VisualStudio.Setup.Service
installedChannelId: VisualStudio.17.Release
installedChannelUri: https://aka.ms/vs/17/release/channel
releaseNotes: https://docs.microsoft.com/en-us/visualstudio/releases/2022/release-notes-v17.10#17.10.0
resolvedInstallationPath: C:\Program Files\Microsoft Visual Studio\2022\Community
thirdPartyNotices: https://go.microsoft.com/fwlink/?LinkId=661288
updateDate: 2024-05-24T14:28:14.5948276Z
catalog_buildBranch: d17.10
catalog_buildVersion: 17.10.34916.146
catalog_id: VisualStudio/17.10.0+34916.146
catalog_localBuild: build-lab
catalog_manifestName: VisualStudio
catalog_manifestType: installer
catalog_productDisplayVersion: 17.10.0
catalog_productLine: Dev17
catalog_productLineVersion: 2022
catalog_productMilestone: RTW
catalog_productMilestoneIsPreRelease: False
catalog_productName: Visual Studio
catalog_productPatchVersion: 0
catalog_productPreReleaseMilestoneSuffix: 8.0
catalog_productSemanticVersion: 17.10.0+34916.146
catalog_requiredEngineVersion: 3.10.2154.60269
properties_campaignId:
properties_channelManifestId: VisualStudio.17.Release/17.10.0+34916.146
properties_includeRecommended: 1
properties_nickname: 2
properties_setupEngineFilePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe
|};

let getSDK = () => {
  open Run.Syntax;
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
  let windowsKitPath = "C:\\Program Files (x86)\\Windows Kits";
  let arch = "x64";
  let hostArchFolder = "HostX64";
  let windowsVersion = "10";
  let windowsKitProductVersion = "10.0.20348.0";
  Ok((
    productInstallationPath,
    windowsKitPath,
    arch,
    hostArchFolder,
    windowsVersion,
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
    windowsVersion,
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
  Esy_logs.app(m => m("Windows Version: %s", windowsVersion));
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
                     "%s\\%s\\Include\\%s\\ucrt",
                     windowsKitPath,
                     windowsVersion,
                     windowsKitProductVersion,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\%s\\Include\\%s\\um",
                     windowsKitPath,
                     windowsVersion,
                     windowsKitProductVersion,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\%s\\Include\\%s\\shared",
                     windowsKitPath,
                     windowsVersion,
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
                     "C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\VC\\Tools\\MSVC\\14.40.33807\\lib\\%s",
                     arch,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\%s\\Lib\\%s\\um\\%s",
                     windowsKitPath,
                     windowsVersion,
                     windowsKitProductVersion,
                     arch,
                   )
                ++ ";"
                ++ Printf.sprintf(
                     "%s\\%s\\Lib\\%s\\ucrt\\%s",
                     windowsKitPath,
                     windowsVersion,
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
                     "%s\\%s\\Bin\\%s\\%s",
                     windowsKitPath,
                     windowsVersion,
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
