/**
 * release-postinstall.js
 *
 * XXX: We want to keep this script installable at least with node 4.x.
 *
 * This script is bundled with the `npm` package and executed on release.
 * Since we have a 'fat' NPM package (with all platform binaries bundled),
 * this postinstall script extracts them and puts the current platform's
 * bits in the right place.
 */

var path = require('path');
var cp = require('child_process');
var fs = require('fs');
var os = require('os');
var platform = process.platform;

var packageJson = require('./package.json');

function copyRecursive(srcDir, dstDir) {
  var results = [];
  var list = fs.readdirSync(srcDir);
  var src, dst;
  list.forEach(function (file) {
    src = path.join(srcDir, file);
    dst = path.join(dstDir, file);

    var stat = fs.statSync(src);
    if (stat && stat.isDirectory()) {
      try {
        fs.mkdirSync(dst);
      } catch (e) {
        console.log('directory already exists: ' + dst);
        console.error(e);
      }
      results = results.concat(copyRecursive(src, dst));
    } else {
      try {
        fs.writeFileSync(dst, fs.readFileSync(src));
      } catch (e) {
        console.log("could't copy file: " + dst);
        console.error(e);
      }
      results.push(src);
    }
  });
  return results;
}

// implementing it b/c we don't want to depend on fs.copyFileSync which appears
// only in node@8.x
function copyFileSync(sourcePath, destPath) {
  var data;
  try {
    data = fs.readFileSync(sourcePath);
  } catch (e) {
    data = fs.readFileSync(sourcePath + '.exe');
    sourcePath = sourcePath + '.exe';
    destPath = destPath + '.exe';
  }
  var stat = fs.statSync(sourcePath);
  fs.writeFileSync(destPath, data);
  fs.chmodSync(destPath, 0755);
}

var copyPlatformBinaries = (platformPath) => {
  var platformBuildPath = path.join(__dirname, 'platform-esy-npm-release-' + platformPath);

  let foldersToCopy, binariesToCopy;

  binariesToCopy = Object.keys(packageJson.bin).map(function (name) {
    return packageJson.bin[name];
  });

  if (platformPath === 'linux') {
    fs.mkdirSync(path.join(__dirname, 'lib'));
    foldersToCopy = ['bin', 'lib'];
  } else {
    foldersToCopy = ['bin', '_export'];
    binariesToCopy = binariesToCopy.concat(['esyInstallRelease.js']);
  }

  foldersToCopy.forEach((folderPath) => {
    var sourcePath = path.join(platformBuildPath, folderPath);
    var destPath = path.join(__dirname, folderPath);
    copyRecursive(sourcePath, destPath);
  });

  binariesToCopy.forEach((binaryPath) => {
    var sourcePath = path.join(platformBuildPath, binaryPath);
    var destPath = path.join(__dirname, binaryPath);
    if (fs.existsSync(destPath)) {
      fs.unlinkSync(destPath);
    }
    copyFileSync(sourcePath, destPath);
  });

  if (platformPath === 'linux') {
    fs.chmodSync(path.join(__dirname, 'lib', 'esy', 'esyBuildPackageCommand'), 0755);
    fs.chmodSync(path.join(__dirname, 'lib', 'esy', 'esySolveCudfCommand'), 0755);
    fs.chmodSync(path.join(__dirname, 'lib', 'esy', 'esyRewritePrefixCommand'), 0755);
  }
};

try {
  fs.mkdirSync('_export');
} catch (e) {
  console.log('Could not create _export folder');
}

switch (platform) {
  case 'win32':
    copyPlatformBinaries('win32-x64');
  // TODO. This only prevents re-installation of cygwin. ideally, even copyPlatformBinaries could be avoided if
  // esy installation was cached.
  const esyBashPackage = "@prometheansacrifice/esy-bash";
  if (!fs.existsSync(`${__dirname}/${esyBashPackage}`)) {
    console.log('Installing native compiler toolchain for Windows...');
    cp.execSync(
      `npm install ${esyBashPackage}@0.1.0-dev-2a4a4dc324edda87b93b39c98beca80aa2acfb42 --prefix "${__dirname}"`,
    );
    console.log('Native compiler toolchain installed successfully.');
  }
    require('./esyInstallRelease');
    break;
  case 'linux':
    copyPlatformBinaries(`${platform}-${platformArch}`);
    // Statically linked binaries dont need postinstall scripts
    break;
  case 'darwin':
    copyPlatformBinaries(`${platform}-${platformArch}`);
    require('./esyInstallRelease');
    break;
  default:
    console.warn('error: no release built for the ' + platform + ' platform');
    process.exit(1);
}
