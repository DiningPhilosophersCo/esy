exception InvalidEnvJSON(string);
exception InvariantViolation(unit);
/* TODO remove these exceptions, given how we use result type */

type bosError = [ | `Msg(string)];
let pathDelimStr = Sys.unix ? "/" : "\\";
let pathDelimChr = pathDelimStr.[0];

let log = msg => {
  let debugMode =
    (
      try(Sys.getenv("ESY_BASH_DEBUG")) {
      | Not_found => ""
      }
    )
    != "";
  if (debugMode) {
    print_endline(msg);
  };
};

let normalizePath = str =>
  String.concat("/", String.split_on_char(pathDelimChr, str));

let normalizeEndlines = str =>
  String.concat("\n", Str.split(Str.regexp("\r\n"), str));

let remapPathsInEnvironment = envVars =>
  Array.map(
    envVar =>
      switch (String.split_on_char('=', envVar)) {
      | [k, v, ...rest] =>
        if (String.lowercase_ascii(k) == "path") {
          "PATH="
          ++ String.concat(
               Sys.unix ? ":" : ";",
               ["/usr/bin", "/usr/local/bin", normalizePath(v)],
             );
        } else if (String.lowercase_ascii(k) == "home") {
          "HOME=/usr/esy";
        } else {
          k ++ "=" ++ v;
        }
      | _ => raise(InvariantViolation())
      },
    envVars,
  );

let collectKeyValuePairs = jsonKeyValuePairs =>
  List.map(
    pair => {
      let (k, jsonValue) = pair;
      switch (jsonValue) {
      | `String(a) => k ++ "=" ++ a
      | _ => raise(InvalidEnvJSON("Not a valid env json file"))
      };
    },
    jsonKeyValuePairs,
  );

let rec traverse = json =>
  switch (json) {
  | `Assoc(keyValuePairs) => collectKeyValuePairs(keyValuePairs)
  | _ => raise(InvalidEnvJSON("Not a valid env json file"))
  };

let extractEnvironmentVariables = environmentFile => {
  let json = Yojson.Basic.from_file(environmentFile);
  traverse(json);
};

let nonce = ref(0);
let executablePath = Sys.executable_name;
let parent = Filename.dirname;

let getEsyBashRootPath = () =>
  switch (Sys.getenv_opt("ESY__ESY_BASH")) {
  | Some(path) => path
  | None =>
    parent(parent(parent(parent(parent(parent(executablePath))))))
    ++ "\\node_modules\\esy-bash"
  };

let prepareBashExec = (~environmentFile=?, command) => {
  let cygwinBash = getEsyBashRootPath() ++ "\\.cygwin\\bin\\bash.exe";
  let shellPath = Sys.unix ? "/bin/bash" : cygwinBash;
  nonce := nonce^ + 1;
  log(
    Format.asprintf(
      "esy-bash: executing bash command: %a |  nonce %s\n",
      Bos.Cmd.pp,
      command,
      string_of_int(nonce^),
    ),
  );
  let tmpFileName =
    Printf.sprintf(
      "__esy-bash__%s__%s__.sh",
      string_of_int(Hashtbl.hash(command)),
      string_of_int(nonce^),
    );
  let tempFilePath =
    Sys.getenv(Sys.unix ? "TMPDIR" : "TMP") ++ pathDelimStr ++ tmpFileName;
  let cygwinSymlinkVar = "CYGWIN=winsymlinks:nativestrict";

  let bashCommandWithDirectoryPreamble =
    Format.asprintf(
      "mount -c /cygdrive -o binary,noacl,posix=0,user > /dev/null; \ncd \"%s\";\n%s;",
      normalizePath(Sys.getcwd()),
      Bos.Cmd.to_string(command),
    );
  let normalizedShellScript =
    normalizeEndlines(bashCommandWithDirectoryPreamble);

  let fileChannel = open_out_bin(tempFilePath);
  Printf.fprintf(fileChannel, "%s", normalizedShellScript);
  close_out(fileChannel);

  let existingVars = Unix.environment();
  let vars =
    remapPathsInEnvironment(
      Array.append([|cygwinSymlinkVar|], existingVars),
    );

  let environmentVars =
    switch (environmentFile) {
    | Some(x) =>
      let varsFromFile =
        remapPathsInEnvironment(
          Array.of_list(extractEnvironmentVariables(x)),
        );
      Array.append(existingVars, varsFromFile);
    | None =>
      vars
      |> Array.to_list
      |> List.filter(l => !Str.string_match(Str.regexp("^="), l, 0))
      |> Array.of_list
    };

  (environmentVars, Bos.Cmd.(v(shellPath) % "-lc" % tempFilePath));
};

let bashExec = (~environmentFile=?, command) => {
  let (environmentVars, cmd) = prepareBashExec(~environmentFile?, command);
  let env =
    environmentVars
    |> Array.fold_left(
         (map, kv) => {
           switch (String.split_on_char('=', kv)) {
           | [k, v] => Astring.String.Map.add(k, v, map)
           | _ => map
           }
         },
         Astring.String.Map.empty,
       );
  Bos.OS.Cmd.run(~env, cmd);
};

let bashExecOut = (~environmentFile=?, command) => {
  let (environmentVars, cmd) = prepareBashExec(~environmentFile?, command);
  let env =
    environmentVars
    |> Array.fold_left(
         (map, kv) => {
           switch (String.split_on_char('=', kv)) {
           | [k, v] => Astring.String.Map.add(k, v, map)
           | _ => map
           }
         },
         Astring.String.Map.empty,
       );

  Bos.OS.Cmd.run_out(~env, cmd);
};

let bashExecLwt = (~environmentFile=?, command) => {
  let (environmentVars, cmd) = prepareBashExec(~environmentFile?, command);
  let toolAndArgs = (
    Bos.Cmd.get_line_tool(command),
    command |> Bos.Cmd.line_args |> Array.of_list,
  );
  Lwt_process.exec(
    ~env=environmentVars,
    ~stderr=`FD_copy(Unix.stderr),
    ~stdout=`FD_copy(Unix.stdout),
    ~stdin=`FD_copy(Unix.stdin),
    toolAndArgs,
  );
};
