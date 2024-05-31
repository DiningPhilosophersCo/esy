"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[9894],{684:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>o});var a=s(5893),t=s(1151);const i={id:"npm-release",title:"Building npm Releases"},r=void 0,l={id:"npm-release",title:"Building npm Releases",description:"Applications developed with esy can have complex dependencies at runtime; not",source:"@site/../docs/npm-release.md",sourceDirName:".",slug:"/npm-release",permalink:"/docs/npm-release",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/npm-release.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1716772755,formattedLastUpdatedAt:"May 27, 2024",frontMatter:{id:"npm-release",title:"Building npm Releases"},sidebar:"docs",previous:{title:"Multiple Project Sandboxes",permalink:"/docs/multiple-sandboxes"},next:{title:"Workflow for opam Packages",permalink:"/docs/opam-workflow"}},c={},o=[{value:"Producing Releases",id:"producing-releases",level:2},{value:"Including Dependencies",id:"including-dependencies",level:2},{value:"Relocating Artifacts (Path Rewriting)",id:"relocating-artifacts-path-rewriting",level:2}];function d(e){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Applications developed with esy can have complex dependencies at runtime; not\njust code linked statically but also executables, dynamically loaded libraries\nand other resources such as images, translations and so on."}),"\n",(0,a.jsx)(n.p,{children:"This requires a special release process which bundles all those dependencies\ntogether in an end user installable package."}),"\n",(0,a.jsxs)(n.p,{children:["There's ",(0,a.jsx)(n.code,{children:"esy npm-release"})," command which produces an npm package ready to be\npublished which:"]}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Packages project's and all dependencies' pre built artifacts."}),"\n",(0,a.jsx)(n.li,{children:"Exposes a specified set of project's executables as commands available to end\nusers."}),"\n",(0,a.jsx)(n.li,{children:"Optionally includes pre built artifacts of project's dependencies."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:'The very important property of such packages is that only a configured set of\nexecutable is being exposed to an end user, all other executables and libraries\nare "private" to the release. That means multiple releases can be installed on a\nuser\'s machine with different versions of the same software without interfering\nbetween each other.'}),"\n",(0,a.jsx)(n.h2,{id:"producing-releases",children:"Producing Releases"}),"\n",(0,a.jsxs)(n.p,{children:["To configure a release one should add ",(0,a.jsx)(n.code,{children:'"esy.release.bin"'})," configuration field to a\n",(0,a.jsx)(n.code,{children:"package.json"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n  ...\n  "esy": {\n    "release": {\n      "bin": ["refmt"]\n    }\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:["Such field lists all executable names which must be made available on ",(0,a.jsx)(n.code,{children:"$PATH"})," when\nrelease is installed on a user's machine."]}),"\n",(0,a.jsx)(n.p,{children:"After that configuration is done the only command to run is:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"% esy npm-release\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Which produces a ",(0,a.jsx)(n.code,{children:"_release"})," directory with a ready to be published npm package\nwith pre built binaries for the current platform."]}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Currently release can only contain an application built for a single platform\n(macOS, Linux or Windows). This restriction will be lifted in the future."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"To publish such package to npm:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"% cd _release\n% npm publish\n"})}),"\n",(0,a.jsx)(n.h2,{id:"including-dependencies",children:"Including Dependencies"}),"\n",(0,a.jsx)(n.p,{children:"In some cases project's executables invoke other executables or depend on some\ndynamically loaded libraries being available at runtime."}),"\n",(0,a.jsx)(n.p,{children:"This means that a corresponding project dependency must be bundled as a part of\nthe project's release."}),"\n",(0,a.jsxs)(n.p,{children:["To configure a set of packages one should set ",(0,a.jsx)(n.code,{children:'"esy.release.includePackages"'}),"\nconfiguration field within the project's ",(0,a.jsx)(n.code,{children:"package.json"})," to a list of package\nnames which should be bundled as part of the release:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n  ...\n  "esy": {\n    "release": {\n      "bin": ["refmt"],\n      "includePackages": [\n        "root",\n        "@opam/dune",\n        "@opam/lwt"\n      ]\n    }\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:["A special token ",(0,a.jsx)(n.code,{children:"root"})," is used to refer to the current package."]}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"We are working on a way to make esy configuration more granular which would\nallow to automatically exclude non-runtime dependencies from releases. We are\nnot there yet."}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"relocating-artifacts-path-rewriting",children:"Relocating Artifacts (Path Rewriting)"}),"\n",(0,a.jsx)(n.p,{children:"Some prebuilt artifacts contain hard coded paths which refer to the location\nwhere the package was built or to their dependencies' locations. Installing such\nartifacts on another machine could fail due to different paths."}),"\n",(0,a.jsxs)(n.p,{children:["The notable example is ",(0,a.jsx)(n.code,{children:"ocaml"})," package which can't be simply moved to another\nmachine or even to a different location within the same machine."]}),"\n",(0,a.jsx)(n.p,{children:'There\'s a way to "fix" such artifacts by adding an extra step to a release\ninstallation procedure which relocates artifacts by rewriting paths in them.'}),"\n",(0,a.jsxs)(n.p,{children:["To enable that one should set ",(0,a.jsx)(n.code,{children:'"esy.release.rewritePrefix"'})," to ",(0,a.jsx)(n.code,{children:"true"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n  ...\n  "esy": {\n    "release": {\n      "bin": ["refmt"],\n      "includePackages": ["root", "ocaml"],\n      "rewritePrefix": true\n    }\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"NOTE"})}),"\n",(0,a.jsxs)(n.p,{children:["Releases configured with ",(0,a.jsx)(n.code,{children:'"esy.release.rewritePrefix": true'})," cannot be\ninstalled into deep filesystem locations (the limit is around 108 characters)."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>r});var a=s(7294);const t={},i=a.createContext(t);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);