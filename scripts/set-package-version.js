// Used on the CI to set the package version of the NPM tarball
// See .github/workflows/release.yml
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

const arg = process.argv[2];
if (!arg) {
  console.log(
    'set-package-version.js needs a argument: path to manifest file to be patched',
  );
  process.exit(-1);
}
const manifestPath = path.resolve(process.cwd(), arg);
const manifest = require(manifestPath);

const version = cp.execSync('git describe --always --tags').toString().trim();

console.log(JSON.stringify({...manifest, version}, null, 2));
