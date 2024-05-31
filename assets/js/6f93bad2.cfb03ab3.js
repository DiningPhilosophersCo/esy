"use strict";(self.webpackChunksite_v_3=self.webpackChunksite_v_3||[]).push([[4022],{6059:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var t=s(5893),r=s(1151);const a={id:"release-process",title:"Release Process"},i=void 0,o={id:"contributing/release-process",title:"Release Process",description:"esy is released on npm.",source:"@site/../docs/contributing/release-process.md",sourceDirName:"contributing",slug:"/contributing/release-process",permalink:"/docs/contributing/release-process",draft:!1,unlisted:!1,editUrl:"https://github.com/esy/esy/tree/master/docs/../docs/contributing/release-process.md",tags:[],version:"current",lastUpdatedBy:"prometheansacrifice",lastUpdatedAt:1716772755,formattedLastUpdatedAt:"May 27, 2024",frontMatter:{id:"release-process",title:"Release Process"},sidebar:"docs",previous:{title:"Notes about CI/CD",permalink:"/docs/contributing/ci"}},l={},c=[];function d(e){const n={a:"a",code:"code",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"esy is released on npm."}),"\n",(0,t.jsx)(n.p,{children:"Because esy is written in OCaml/Reason and compiled into a native executable we need to acquire a set of prebuilt binaries for each supported platform (Windows, macOS and Linux). We employ CI servers (thanks Azure) to build platform specific releases. For MacOS M1, however, we don't have a CI runner and build the artifact from a M1 machine and add it to the tarball before uploading to NPM."}),"\n",(0,t.jsx)(n.p,{children:"The release workflow is the following:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["After making sure the ",(0,t.jsx)(n.code,{children:"master"})," branch is green, we create a release on Github from the ",(0,t.jsx)(n.a,{href:"https://github.com/esy/esy/releases",children:"release page"}),". This triggers the CI which will eventually produce an NPM tarball (called release.zip) on ",(0,t.jsx)(n.a,{href:"https://dev.azure.com/esy-dev/esy/_build",children:"Azure Pipelines"})," containing pre-built binaries for MacOS (Intel), Linux (statically linked) and Windows. All ",(0,t.jsx)(n.code,{children:"x86_64"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"release.zip"})," is downloaded"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Build on a MacOS M1 machine"}),"\n",(0,t.jsx)(n.p,{children:"a. Fetch all git tags"}),"\n",(0,t.jsxs)(n.p,{children:["b. Build the source at the tag being release. ",(0,t.jsx)(n.a,{href:"/docs/contributing/building-from-source",children:"This page"})," explains how to build esy from source."]}),"\n",(0,t.jsxs)(n.p,{children:["c. Run ",(0,t.jsx)(n.code,{children:"esy npm-release"})]}),"\n",(0,t.jsxs)(n.p,{children:["d. Place ",(0,t.jsx)(n.code,{children:"_release"})," inside unzipped ",(0,t.jsx)(n.code,{children:"release.zip"})," folder as: ",(0,t.jsx)(n.code,{children:"/platform-darwin-arm64"}),". The contents of release folder will very likely look like the follow (with the m1 artifacts)"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"\t.\n|-- LICENSE\n|-- README.md\n|-- bin\n|   `-- esy\n|-- package.json\n|-- platform-darwin\n|   |-- LICENSE\n|   |-- README.md\n|   |-- _export\n|   |   `-- esy-b79b29e0.tar.gz\n|   |-- bin\n|   |   |-- _storePath\n|   |   `-- esy\n|   |-- esyInstallRelease.js\n|   `-- package.json\n|-- platform-darwin-arm64\n|   |-- LICENSE\n|   |-- README.md\n|   |-- _export\n|   |   `-- esy-f489fcc4.tar.gz\n|   |-- bin\n|   |   |-- _storePath\n|   |   `-- esy\n|   |-- esyInstallRelease.js\n|   `-- package.json\n|-- platform-linux\n|   |-- _export\n|   |   `-- esy-0c16a771.tar.gz\n|   |-- bin\n|   |   |-- _storePath\n|   |   `-- esy\n|   |-- esyInstallRelease.js\n|   `-- package.json\n|-- platform-windows-x64\n|   |-- LICENSE\n|   |-- README.md\n|   |-- _export\n|   |   `-- esy-34889961.tar.gz\n|   |-- bin\n|   |   |-- _storePath\n|   |   `-- esy.exe\n|   |-- esyInstallRelease.js\n|   `-- package.json\n`-- postinstall.js\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"4",children:["\n",(0,t.jsx)(n.li,{children:"Publish the folder to NPM"}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>i});var t=s(7294);const r={},a=t.createContext(r);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);