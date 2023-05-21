let bashExec:
  (~environmentFile: string=?, Bos.Cmd.t) => result(unit, [> | `Msg(string)]);
let bashExecOut: (~environmentFile: string=?, Bos.Cmd.t) => Bos.OS.Cmd.run_out;
let bashExecLwt:
  (~environmentFile: string=?, Bos.Cmd.t) => Lwt.t(Unix.process_status);
