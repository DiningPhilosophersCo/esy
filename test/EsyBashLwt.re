let%test "execute a simple bash command (cross-platform)" = {
  let cmd = Bos.Cmd.(v("bash") % "-c" % "echo hello-world");
  switch (EsyBashLib.bashExec(cmd)) {
  | Ok(_) => true
  | Error(`Msg(m)) =>
    Format.eprintf("ERROR: %s@.", m);
    false;
  };
};
