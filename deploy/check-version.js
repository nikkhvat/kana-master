const fs = require('fs').promises;

const appleLink = 'https://apps.apple.com/us/app/kana-master-learn-japanese/id6479753061';
const githubLink = 'https://api.github.com/repos/nikkhvat/kana-master/releases/latest';

const pathAppConfig = './app.json';
const pathPackageConfig = './package.json';
const pathENV = '.env';

const fetchAppStoreVersion = async () => {
  const extractTagWithClass = (html, className) => {
    const regex = new RegExp(`<p[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>(.*?)</p>`, 'gi');
    let match = regex.exec(html);
    return match ? match[0] : null;
  }

  const res = await fetch(appleLink, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "Referer": "https://google.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const body = await res.text()

  
  const version = extractTagWithClass(body, "whats-new__latest__version")
    .split(">")[1]
    .split("<")[0]
    .split("Version")[1]
    .trim();

  return version;
}

const fetchAppVersionGithub = async () => {
  const res = await fetch(githubLink);
  const body = await res.json();

  return body.tag_name.replace("v", "");
}

const readVersionFromENV = async () => {
  const data = await fs.readFile(pathENV, 'utf8')
  const lines = data.split("\n")
  const version = lines
    .filter(line => line.includes("VERSION"))[0]
    .split('=')[1]

  return version.trim()
}

const readVersionFromPackage = async () => {
  const data = await fs.readFile(pathPackageConfig, 'utf8')
  const json = JSON.parse(data)

  return json.version.trim()
}

const readVersionFromApp = async () => {
  const data = await fs.readFile(pathAppConfig, 'utf8')
  const json = JSON.parse(data)

  return {
    androidVersion: json.expo.version.trim(),
    iosVersion: json.expo.android.version.trim(),
  }
}

const logVersion = (version, source) => {
  if (version) {
    console.log(`🌐 ${source} -> ${version}`)
  } else {
    console.log(`🌐❌ ${source} version unavailable`)
  }
}

const check = async () => {
  const appleVersion = await fetchAppStoreVersion();
  const githubVersion = await fetchAppVersionGithub();

  const envVersion = await readVersionFromENV();
  const packageVersion = await readVersionFromPackage();
  const { androidVersion, iosVersion } = await readVersionFromApp();

  const condition = envVersion !== packageVersion || packageVersion !== iosVersion ||
    iosVersion !== androidVersion || androidVersion !== envVersion;

  logVersion(appleVersion, "apple")
  logVersion(githubVersion, "github")

  console.log("\n");

  console.log("📦 .env ->", envVersion);
  console.log("📦 package.json ->", packageVersion);
  console.log("📦 app.json (ios) ->", androidVersion);
  console.log("📦 app.json (android) ->", iosVersion);

  if (condition) {
    console.log("❌ The versions do not match");
  } else {
    console.log("✅ The versions match");
  }
}

check()