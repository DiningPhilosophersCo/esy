module SandboxValue = EsyBuildPackage.Config.Value;
module SandboxEnvironment = EsyBuildPackage.Config.Environment;

/**

   Returns environment paths (listed below) necessary to compile
   C programs with MSVC.

 */
let compilerPaths: option(string) => Run.t(list(Environment.Binding.t(SandboxEnvironment.value)))


 
