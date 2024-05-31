"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[8504],{8050:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>a});var d=s(5893),l=s(1151);const i={id:"commands",title:"Commands"},c=void 0,o={id:"commands",title:"Commands",description:"Reference of all available esy commands. The most common commands are [`esy",source:"@site/../docs/commands.md",sourceDirName:".",slug:"/commands",permalink:"/docs/commands",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/commands.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1716772755,formattedLastUpdatedAt:"May 27, 2024",frontMatter:{id:"commands",title:"Commands"},sidebar:"docs",previous:{title:"Environment",permalink:"/docs/environment"},next:{title:"Low Level Commands",permalink:"/docs/low-level-commands"}},r={},a=[{value:"Main commands",id:"main-commands",level:2},{value:"<code>esy</code>",id:"esy",level:3},{value:"<code>esy install</code>",id:"esy-install",level:3},{value:"<code>esy build</code>",id:"esy-build",level:3},{value:"Run commands in the specified environment",id:"run-commands-in-the-specified-environment",level:2},{value:"<code>esy COMMAND</code>",id:"esy-command",level:3},{value:"<code>esy build COMMAND</code>",id:"esy-build-command",level:3},{value:"<code>esy x COMMAND</code>",id:"esy-x-command",level:3},{value:"<code>esy shell</code>",id:"esy-shell",level:3},{value:"<code>esy build-shell</code>",id:"esy-build-shell",level:3},{value:"Sandbox introspection",id:"sandbox-introspection",level:2},{value:"<code>esy ls-builds</code>",id:"esy-ls-builds",level:3},{value:"<code>esy ls-libs</code>",id:"esy-ls-libs",level:3},{value:"<code>esy ls-modules</code>",id:"esy-ls-modules",level:3},{value:"<code>esy build-env</code>",id:"esy-build-env",level:3},{value:"<code>esy command-env</code>",id:"esy-command-env",level:3},{value:"Other commands",id:"other-commands",level:2},{value:"<code>esy add</code>",id:"esy-add",level:3},{value:"<code>esy npm-release</code>",id:"esy-npm-release",level:3},{value:"<code>esy export-dependencies</code>",id:"esy-export-dependencies",level:3},{value:"<code>esy export-build</code>",id:"esy-export-build",level:3},{value:"<code>esy import-build</code>",id:"esy-import-build",level:3},{value:"<code>esy cleanup</code>",id:"esy-cleanup",level:3},{value:"Options",id:"options",level:2},{value:"<code>-C</code>, <code>--change-directory</code>",id:"-c---change-directory",level:3}];function t(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(n.p,{children:["Reference of all available esy commands. The most common commands are ",(0,d.jsx)(n.a,{href:"#esy-install",children:(0,d.jsx)(n.code,{children:"esy install"})})," and ",(0,d.jsx)(n.a,{href:"#esy-build",children:(0,d.jsx)(n.code,{children:"esy build"})}),"."]}),"\n",(0,d.jsx)(n.h2,{id:"main-commands",children:"Main commands"}),"\n",(0,d.jsx)(n.h3,{id:"esy",children:(0,d.jsx)(n.code,{children:"esy"})}),"\n",(0,d.jsxs)(n.p,{children:["The default command combines ",(0,d.jsx)(n.code,{children:"esy install"})," and ",(0,d.jsx)(n.code,{children:"esy build"})," and runs them in\nconsecutively."]}),"\n",(0,d.jsx)(n.p,{children:"This makes it possible for the default esy project workflow be just:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% git clone https://github.com/USER/PROJECT && cd PROJECT\n% esy\n"})}),"\n",(0,d.jsx)(n.p,{children:"The commands above will clone project sources and make all dependencies\nincluding compiler toolchain and dev dependencies like IDE plugins be installed\n& built."}),"\n",(0,d.jsx)(n.h3,{id:"esy-install",children:(0,d.jsx)(n.code,{children:"esy install"})}),"\n",(0,d.jsxs)(n.p,{children:["Install dependencies declared in ",(0,d.jsx)(n.code,{children:"package.json"}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy install\n"})}),"\n",(0,d.jsxs)(n.p,{children:["If the solution lock ",(0,d.jsx)(n.code,{children:"esy.lock"})," (an analogue of ",(0,d.jsx)(n.code,{children:"yarn.lock"})," lockfile) exists\nthen it will be used to resolve dependencies' version constraints to concrete\nversions, otherwise constraints resolution will be performed and saved to a\nfresh ",(0,d.jsx)(n.code,{children:"esy.lock"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-build",children:(0,d.jsx)(n.code,{children:"esy build"})}),"\n",(0,d.jsxs)(n.p,{children:["Ensure all dependencies are built and then execute the project's build commands.\nNote that esy tries to reuse built artifacts as much as possible, even across\ndifferent sandboxes. That means that usually ",(0,d.jsx)(n.code,{children:"esy build"})," executes only root\nproject's build process."]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build\n"})}),"\n",(0,d.jsxs)(n.p,{children:["You can also use ",(0,d.jsx)(n.code,{children:"esy b"})," shortcurt instead of ",(0,d.jsx)(n.code,{children:"esy build"}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy b\n"})}),"\n",(0,d.jsx)(n.h2,{id:"run-commands-in-the-specified-environment",children:"Run commands in the specified environment"}),"\n",(0,d.jsx)(n.p,{children:"These commands allow to execute arbitrary commands in esy's managed\nenvironments. For more info about environment types see [corresponding\ndocs][environment.md]."}),"\n",(0,d.jsx)(n.h3,{id:"esy-command",children:(0,d.jsx)(n.code,{children:"esy COMMAND"})}),"\n",(0,d.jsxs)(n.p,{children:["Run command ",(0,d.jsx)(n.code,{children:"COMMAND"})," in the command environment."]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy vim ./bin/hello.re\n"})}),"\n",(0,d.jsxs)(n.p,{children:["As command environment contains development time dependencies (like\n",(0,d.jsx)(n.code,{children:"@opam/merlin"}),") ",(0,d.jsx)(n.code,{children:"vim"})," program will have access to those."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-build-command",children:(0,d.jsx)(n.code,{children:"esy build COMMAND"})}),"\n",(0,d.jsxs)(n.p,{children:["Run command ",(0,d.jsx)(n.code,{children:"COMMAND"})," in the build environment."]}),"\n",(0,d.jsxs)(n.p,{children:["For example, we can see which ",(0,d.jsx)(n.code,{children:"ocamlfind"})," libraries are available:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build ocamlfind\n"})}),"\n",(0,d.jsx)(n.p,{children:"Another example usage would be to execute a build process for some specific\nbuild target:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build dune build bin/hello.exe\n"})}),"\n",(0,d.jsx)(n.p,{children:"This is useful when you want to perform a build just for a subset of build\noutputs."}),"\n",(0,d.jsxs)(n.p,{children:["You can also use ",(0,d.jsx)(n.code,{children:"esy b"})," shortcurt instead of ",(0,d.jsx)(n.code,{children:"esy build"}),":"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy b dune build bin/hello.exe\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Note that the invocation ",(0,d.jsx)(n.code,{children:"esy build CMD"})," also has access to ",(0,d.jsx)(n.code,{children:'"devDependencies"'})," and\nthus it might be used for development time builds:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build refmterr dune build\n"})}),"\n",(0,d.jsxs)(n.p,{children:["where ",(0,d.jsx)(n.code,{children:"refmterr"})," command comes from ",(0,d.jsx)(n.code,{children:"refmterr"})," package which is defined in\n",(0,d.jsx)(n.code,{children:'"devDependencies"'}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-x-command",children:(0,d.jsx)(n.code,{children:"esy x COMMAND"})}),"\n",(0,d.jsxs)(n.p,{children:["Execute command ",(0,d.jsx)(n.code,{children:"COMMAND"})," in the test environment."]}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy x hello\n"})}),"\n",(0,d.jsxs)(n.p,{children:["This invocation puts root project's executables in ",(0,d.jsx)(n.code,{children:"$PATH"})," thus it's useful to\ntest the project as it was installed."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-shell",children:(0,d.jsx)(n.code,{children:"esy shell"})}),"\n",(0,d.jsx)(n.p,{children:"Initialize shell with the project's command environment."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy shell\n% vim\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The commands above are the equivalent of running ",(0,d.jsx)(n.code,{children:"esy vim"}),"."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-build-shell",children:(0,d.jsx)(n.code,{children:"esy build-shell"})}),"\n",(0,d.jsx)(n.p,{children:"Initialize shell with the project's build environment."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build-shell\n% dune build bin/hello.exe\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The commands above are the equivalent of running ",(0,d.jsx)(n.code,{children:"esy build dune build bin/hello.exe"}),"."]}),"\n",(0,d.jsx)(n.p,{children:"The command accept a position argument which allows to shell into a specific\npackage's build environment, referring to the package by its name:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build-shell @opam/lwt\n"})}),"\n",(0,d.jsx)(n.p,{children:"This command is useful for debugging failing builds."}),"\n",(0,d.jsx)(n.h2,{id:"sandbox-introspection",children:"Sandbox introspection"}),"\n",(0,d.jsx)(n.h3,{id:"esy-ls-builds",children:(0,d.jsx)(n.code,{children:"esy ls-builds"})}),"\n",(0,d.jsx)(n.p,{children:"Prints a dependency tree with status of each package."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy ls-builds\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-ls-libs",children:(0,d.jsx)(n.code,{children:"esy ls-libs"})}),"\n",(0,d.jsx)(n.p,{children:"Prints a dependency tree with all available libraries."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy ls-libs\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-ls-modules",children:(0,d.jsx)(n.code,{children:"esy ls-modules"})}),"\n",(0,d.jsx)(n.p,{children:"Prints a dependency tree with all available libraries and modules."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy ls-modules\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-build-env",children:(0,d.jsx)(n.code,{children:"esy build-env"})}),"\n",(0,d.jsx)(n.p,{children:"Prints build environment on stdout."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy build-env\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-command-env",children:(0,d.jsx)(n.code,{children:"esy command-env"})}),"\n",(0,d.jsx)(n.p,{children:"Prints command environment on stdout."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy command-env\n"})}),"\n",(0,d.jsx)(n.h2,{id:"other-commands",children:"Other commands"}),"\n",(0,d.jsx)(n.h3,{id:"esy-add",children:(0,d.jsx)(n.code,{children:"esy add"})}),"\n",(0,d.jsx)(n.p,{children:"Adds a new dependency for a project."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy add @opam/lwt\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-npm-release",children:(0,d.jsx)(n.code,{children:"esy npm-release"})}),"\n",(0,d.jsx)(n.p,{children:"Produce an npm package with pre built binaries for the current platform."}),"\n",(0,d.jsxs)(n.p,{children:["See ",(0,d.jsx)(n.a,{href:"/docs/npm-release",children:"Building npm Releases"})," for more info."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-export-dependencies",children:(0,d.jsx)(n.code,{children:"esy export-dependencies"})}),"\n",(0,d.jsx)(n.p,{children:"Export dependencies of the root project from a build store."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy export-dependencies\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The invocation above produces a set of tarballs inside ",(0,d.jsx)(n.code,{children:"_export"})," directory.\nThose tarballs can be shipped to another host and imported into build store with\n",(0,d.jsx)(n.code,{children:"esy import-build"})," command."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-export-build",children:(0,d.jsx)(n.code,{children:"esy export-build"})}),"\n",(0,d.jsx)(n.p,{children:"Export a single build out of a build store."}),"\n",(0,d.jsx)(n.p,{children:"Example:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy export-build ~/.esy/3/i/ocaml-4.6.0-abcdef90\n"})}),"\n",(0,d.jsxs)(n.p,{children:["This commands produces ",(0,d.jsx)(n.code,{children:"_export/ocaml-4.6.0-abcdef90.tar.gz"})," tarball which can\nbe imported into another build store with ",(0,d.jsx)(n.code,{children:"esy import-build"})," command."]}),"\n",(0,d.jsx)(n.h3,{id:"esy-import-build",children:(0,d.jsx)(n.code,{children:"esy import-build"})}),"\n",(0,d.jsx)(n.p,{children:"Import a single build into a build store."}),"\n",(0,d.jsx)(n.p,{children:"Import from a previously exported build:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy import-build ./_export/ocaml-4.6.0-abcdef90.tar.gz\n"})}),"\n",(0,d.jsx)(n.p,{children:"Import from a build store:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy import-build /path/to/build/store/3/i/ocaml-4.6.0-abcdef90\n"})}),"\n",(0,d.jsx)(n.h3,{id:"esy-cleanup",children:(0,d.jsx)(n.code,{children:"esy cleanup"})}),"\n",(0,d.jsx)(n.p,{children:"Cleans up unused builds from the global cache. It, optionally, takes paths to esy projects as args and ensures its dependencies are retained during the clean up process."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy cleanup [/path/to/esy/project1 /esy/project/2]\n"})}),"\n",(0,d.jsxs)(n.p,{children:["It also supports ",(0,d.jsx)(n.code,{children:"--dry-run"})," option to inspect what will get purged."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"% esy cleanup --dry-run [/path/proj1 /path/proj2]\n"})}),"\n",(0,d.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,d.jsxs)(n.h3,{id:"-c---change-directory",children:[(0,d.jsx)(n.code,{children:"-C"}),", ",(0,d.jsx)(n.code,{children:"--change-directory"})]}),"\n",(0,d.jsxs)(n.p,{children:["When using ",(0,d.jsx)(n.code,{children:"esy CMD"})," , the command or script is run from the current directory.\nOne can use ",(0,d.jsx)(n.code,{children:"esy -C CMD"})," in order to execute ",(0,d.jsx)(n.code,{children:"CMD"})," in the project's root directory (where the ",(0,d.jsx)(n.code,{children:"package.json"})," is)."]})]})}function h(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(t,{...e})}):t(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>c});var d=s(7294);const l={},i=d.createContext(l);function c(e){const n=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),d.createElement(i.Provider,{value:n},e.children)}}}]);