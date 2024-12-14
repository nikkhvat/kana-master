const fs = require('fs').promises;

const newVersion = process.argv[2];

const pathAppConfig = './app.json';
const pathPackageConfig = './package.json';
const pathENV = '.env';

const writeVersionENV = async () => {
  const data = await fs.readFile(pathENV, 'utf8')
  const lines = data
    .split("\n")
    .map(line => line.includes("VERSION") ? `VERSION=${newVersion}` : line)
    .join("\n")

  await fs.writeFile(pathENV, lines)
}

const writeVersionPackage = async () => {
  const data = await fs.readFile(pathPackageConfig, 'utf8')
  const json = JSON.parse(data)
  json.version = newVersion;

  await fs.writeFile(pathPackageConfig, JSON.stringify(json, null, 2)) 
}

const readVersionFromApp = async () => {
  const data = await fs.readFile(pathAppConfig, 'utf8')
  const json = JSON.parse(data)

  json.expo.version = newVersion;
  json.expo.ios.buildNumber = "0";
  json.expo.android.version = newVersion;
  json.expo.android.versionCode = 1;

  await fs.writeFile(pathAppConfig, JSON.stringify(json, null, 2))
}

const check = async () => {
  await writeVersionENV();
  await writeVersionPackage();
  await readVersionFromApp();
}

check()