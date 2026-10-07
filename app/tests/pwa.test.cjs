const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");
const upstream = process.env.TEST_BASE_URL || "http://localhost:3000";
let server, browser, origin, version = 1;

before(async () => {
  // A same-origin relay lets the test publish a second worker without changing
  // the checked-in worker or production server files.
  server = http.createServer(async (req, res) => {
    try {
      const response = await fetch(upstream + req.url);
      let body = Buffer.from(await response.arrayBuffer());
      if (req.url === "/sw.js" && version === 2) body = Buffer.from(body.toString().replace(/groomingher-offline-[^"]+/, "groomingher-offline-test-v2"));
      res.statusCode = response.status;
      for (const [key, value] of response.headers) {
        if (!["content-length", "content-encoding", "transfer-encoding", "connection"].includes(key)) res.setHeader(key, value);
      }
      res.end(body);
    } catch (error) { res.statusCode = 502; res.end(String(error)); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
});
after(async () => { await browser?.close(); await new Promise((resolve) => server.close(resolve)); });

test("PWA manifest, icons, browser installability and worker headers", async () => {
  // Installation is unavailable in incognito; use a disposable normal profile.
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "groomingher-install-"));
  const context = await chromium.launchPersistentContext(profile, {
    executablePath: process.env.CHROMIUM_PATH || (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    const page = await context.newPage();
    const response = await page.goto(origin);
    assert.equal(response.status(), 200);
    await page.evaluate(() => navigator.serviceWorker.ready);
    const manifest = await (await context.request.get(origin + "/manifest.webmanifest")).json();
    assert.equal(manifest.id, "/");
    assert.equal(manifest.scope, "/");
    assert.equal(manifest.display, "standalone");
    for (const icon of manifest.icons) {
      const file = await context.request.get(origin + icon.src);
      assert.equal(file.status(), 200);
      const bytes = await file.body();
      assert.equal(bytes.subarray(1, 4).toString(), "PNG");
      const size = Number(icon.sizes.split("x")[0]);
      assert.equal(bytes.readUInt32BE(16), size);
      assert.equal(bytes.readUInt32BE(20), size);
    }
    assert.ok(manifest.icons.some((icon) => icon.purpose === "maskable"));
    assert.equal(await page.locator('link[rel="apple-touch-icon"]').getAttribute("href"), "/icons/apple-touch-icon.png");
    const worker = await context.request.get(origin + "/sw.js");
    assert.match(worker.headers()["cache-control"], /no-store/);
    const cdp = await context.newCDPSession(page);
    const result = await cdp.send("Page.getInstallabilityErrors");
    assert.deepEqual(result.installabilityErrors, []);
  } finally { await context.close(); fs.rmSync(profile, { recursive: true, force: true }); }
});

test("offline launch shows the fallback and never caches role or API data", async () => {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(origin + "/login");
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await page.getByRole("button", { name: "Enter Girl demo", exact: true }).click();
    await page.waitForURL("**/demo/girl");
    await page.evaluate(() => fetch("/api/health"));
    const cached = await page.evaluate(async () => {
      const names = await caches.keys();
      return (await Promise.all(names.map(async (name) => (await (await caches.open(name)).keys()).map((request) => new URL(request.url).pathname)))).flat();
    });
    assert.ok(cached.includes("/offline.html"));
    assert.ok(cached.every((path) => path === "/offline.html" || path.startsWith("/icons/")));
    await context.setOffline(true);
    await page.goto(origin + "/demo/girl/diary");
    await page.getByRole("heading", { name: "You’re offline" }).waitFor();
    await context.setOffline(false);
    await page.getByRole("link", { name: "Try again" }).click();
    await page.waitForURL(origin + "/");
    assert.match(await page.title(), /GroomingHer/);
  } finally { await context.close(); }
});

test("an updated worker waits for confirmation, then reloads and removes old cache", async () => {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(origin);
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await page.evaluate(() => { window.demoWorkStillOpen = true; });
    version = 2;
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
    const update = page.getByRole("button", { name: "Update and reload", exact: true });
    await update.waitFor();
    assert.equal(await page.evaluate(() => window.demoWorkStillOpen), true);
    await page.getByText("Reloading clears unsaved demonstration diaries, messages and progress.", { exact: false }).waitFor();
    await update.click();
    await page.waitForFunction(() => window.demoWorkStillOpen === undefined);
    const names = await page.evaluate(() => caches.keys());
    assert.ok(names.includes("groomingher-offline-test-v2"));
    assert.deepEqual(names.filter((name) => name.startsWith("groomingher-offline-")), ["groomingher-offline-test-v2"]);
  } finally { version = 1; await context.close(); }
});
