const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
async function build() {
const buildId = fs.readFileSync(path.join(root, ".next/BUILD_ID"), "utf8").trim();
if (!/^[a-zA-Z0-9_-]+$/.test(buildId)) throw new Error("Invalid Next.js build ID");
const source = fs.readFileSync(path.join(root, "pwa/sw.js"), "utf8");
if (!source.includes("__BUILD_ID__")) throw new Error("Worker version marker is missing");
const icons = path.join(root, "public/icons");
fs.mkdirSync(icons, { recursive: true });
const svg = fs.readFileSync(path.join(root, "app/icon.svg"), "utf8");
for (const size of [192, 512]) await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(icons, `icon-${size}.png`));
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(icons, "apple-touch-icon.png"));
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#FFF9F4"/><svg x="96" y="96" width="320" height="320" viewBox="0 0 64 64">${svg.replace(/<svg[^>]*>|<\/svg>/g, "")}</svg></svg>`;
await sharp(Buffer.from(maskable)).png().toFile(path.join(icons, "maskable-512.png"));
fs.writeFileSync(path.join(root, "public/sw.js"), source.replaceAll("__BUILD_ID__", buildId));
console.log("Generated PWA icons and versioned worker for this build.");
}
build().catch((error) => { console.error(error); process.exitCode = 1; });
