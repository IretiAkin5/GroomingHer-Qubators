const { test, before, after, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const artifacts =
  process.env.GROOMINGHER_ARTIFACTS || path.resolve("test-results");
let browser, context, page, errors;
before(async () => {
  fs.mkdirSync(artifacts, { recursive: true });
  const executablePath =
    process.env.CHROMIUM_PATH ||
    (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
  browser = await chromium.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox"],
  });
});
after(async () => {
  await browser?.close();
});
beforeEach(async () => {
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  page = await context.newPage();
  errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
});
afterEach(async () => {
  await context?.close();
  assert.deepEqual(errors, [], "No browser runtime errors");
});
async function visit(route) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  assert.ok(response.status() < 400, route + " must open");
}
async function visible(text) {
  await page
    .getByText(text, { exact: false })
    .first()
    .waitFor({ state: "visible" });
}
async function enter(role) {
  if (await page.locator(".space-main").count()) {
    const publicLink = page.getByRole("link", { name: "Public website ↗" });
    if (!(await publicLink.isVisible()))
      await page.getByRole("button", { name: /Space menu/ }).click();
    await publicLink.click();
    await page.waitForURL(base + "/");
    const login = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Log In", exact: true });
    if (!(await login.isVisible())) await page.locator(".menu-toggle").click();
    await login.click();
    await page.waitForURL("**/login");
  } else await visit("/login");
  await page
    .getByRole("button", {
      name:
        role === "girl"
          ? "Enter Girl demo"
          : role === "parent"
            ? "Enter Parent / Guardian demo"
            : "Enter School demo",
      exact: true,
    })
    .click();
  await page.waitForURL(`**/demo/${role}`);
  await page.locator(".space-main").waitFor();
}
async function shot(name) {
  await page.screenshot({
    path: path.join(artifacts, name + ".png"),
    fullPage: true,
  });
}
async function continueStep() {
  await page.getByRole("button", { name: "Continue", exact: true }).click();
}
async function accessibility() {
  await page.waitForFunction(() => document.title.trim().length > 0);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
  );
}

test(
  "public destinations, unknown pages and legacy collection endpoints",
  { timeout: 180000 },
  async () => {
    for (const route of [
      "/",
      "/about",
      "/solutions/girls",
      "/solutions/parents",
      "/solutions/schools",
      "/how-it-works",
      "/resources",
      "/resources/getting-to-know-your-period",
      "/contact",
      "/get-started",
      "/login",
      "/privacy",
      "/terms",
      "/child-safety",
      "/accessibility",
      "/support",
      "/faqs",
      "/recovery",
      "/sample-pack",
    ]) {
      const response = await context.request.get(base + route);
      assert.equal(response.status(), 200, route);
    }
    assert.equal(
      (await context.request.get(base + "/resources/not-a-lesson")).status(),
      404,
    );
    assert.equal(
      (await context.request.get(base + "/demo/parent/diary")).status(),
      404,
    );
    for (const endpoint of [
      "profile",
      "profile/pin",
      "profile/verify",
      "cycles",
      "symptoms",
      "normal",
      "ask",
      "auth/sign-up/email",
      "shares",
      "reminders",
      "learn",
    ]) {
      for (const method of ["get", "post"]) {
        const response = await context.request[method](
          base + "/api/" + endpoint,
        );
        assert.equal(response.status(), 410, method + " " + endpoint);
      }
    }
    for (const route of [
      "/constructor",
      "/solutions/constructor",
      "/demo/constructor",
      "/onboarding/constructor",
    ]) {
      assert.equal(
        (await context.request.get(base + route)).status(),
        404,
        route,
      );
    }
    const health = await (
      await context.request.get(base + "/api/health")
    ).json();
    assert.equal(health.mode, "fictional-demo");
    assert.equal(health.healthCollection, false);
  },
);

test(
  "desktop and phone navigation, role destinations, review labels and screenshots",
  { timeout: 90000 },
  async () => {
    await visit("/");
    await shot("stage-1-home-desktop");
    await accessibility();
    await page.getByRole("button", { name: /Solutions/ }).click();
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    assert.equal(
      await nav.getByRole("link", { name: "Girls", exact: true }).count(),
      1,
    );
    assert.equal(
      await nav
        .getByRole("link", { name: "Parents and Guardians", exact: true })
        .count(),
      1,
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await nav.getByRole("link", { name: "Girls", exact: true }).count(),
      0,
    );
    await page.getByRole("button", { name: /Solutions/ }).click();
    await nav.getByRole("link", { name: "Girls", exact: true }).click();
    await page.waitForURL("**/solutions/girls");
    await visible("whether or not your periods have started");
    await page.setViewportSize({ width: 390, height: 844 });
    await visit("/");
    await page.locator(".menu-toggle").click();
    await nav
      .getByRole("link", { name: "Learning Resources", exact: true })
      .waitFor({ state: "visible" });
    await page.locator(".menu-toggle").click();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await accessibility();
    await shot("stage-1-home-mobile");
    await page
      .getByRole("link", { name: "Get Started", exact: true })
      .first()
      .click();
    await page.waitForURL("**/get-started");
    assert.equal(await page.locator(".role-card").count(), 3);
  },
);

test("public resources filter/detail and print-friendly sample pack", async () => {
  await visit("/resources");
  await page.getByRole("button", { name: "Periods", exact: true }).click();
  assert.equal(await page.locator(".resource-card").count(), 1);
  await page.getByRole("link", { name: /Getting to know your period/ }).click();
  await page.waitForURL("**/resources/getting-to-know-your-period");
  await visible("awaiting professional review");
  await visible("Approval date: none");
  await accessibility();
  await visit("/sample-pack");
  await visible("Facilitator notes");
  await visible("One-page parent guide");
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: path.join(artifacts, "sample-lesson-pack.pdf"),
    format: "A4",
    printBackground: true,
  });
});

test("enquiry and school interest are fictional, never sent, and failures are truthful", async () => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await visit("/contact");
  assert.equal(await page.getByLabel("Your name").isEditable(), false);
  assert.equal(
    await page.getByLabel("Message", { exact: true }).isEditable(),
    false,
  );
  await page
    .getByRole("button", { name: "Preview enquiry submission" })
    .click();
  await visible("Nothing was sent.");
  await page.getByLabel("Preview a submission failure").check();
  await page
    .getByRole("button", { name: "Preview enquiry submission" })
    .click();
  await visible("your enquiry was not sent");
  await accessibility();
  await visit("/solutions/schools");
  await page
    .getByRole("button", { name: "Preview interest submission" })
    .click();
  await visible("not school approval");
  assert.equal(await page.getByLabel("School name").isEditable(), false);
  assert.deepEqual(posts, []);
});

test(
  "girl onboarding handles invitation, age, pending permission, wrong pairing, resume and skip",
  { timeout: 90000 },
  async () => {
    await visit("/onboarding/girl");
    await page.getByLabel("Sample invitation").selectOption("invalid");
    await continueStep();
    await visible("invalid or withdrawn");
    await page.getByLabel("Sample invitation").selectOption("valid");
    await continueStep();
    await page.getByLabel("Sample age").selectOption("16");
    await continueStep();
    await visible("first pilot is for ages 13–15");
    await page.getByLabel("Sample age").selectOption("14");
    await continueStep();
    await page
      .getByLabel("Sample access preference (optional)")
      .selectOption("Shared device");
    await visible("Screenshots, browser history");
    await page.reload({ waitUntil: "networkidle" });
    await visible("What would you like to explore?");
    await page.getByRole("button", { name: "Skip preferences" }).click();
    await continueStep();
    await visible("Permission steps are pending");
    await page
      .getByLabel("Simulate required guardian permission being verified")
      .check();
    await page
      .getByLabel("Simulate Ada’s own agreement to participate")
      .check();
    await continueStep();
    await page.getByLabel("Sample connection").selectOption("wrong");
    await page
      .getByLabel("Confirm this is the intended fictional connection")
      .check();
    await continueStep();
    await visible("Connection not confirmed");
    await page.getByLabel("Sample connection").selectOption("correct");
    await page
      .getByLabel("Confirm this is the intended fictional connection")
      .check();
    await continueStep();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await visible("Check the connection.");
    await continueStep();
    await page
      .getByRole("button", { name: "Enter Girl demo", exact: true })
      .click();
    await page.waitForURL("**/demo/girl");
    await visible("Welcome, Ada.");
    await shot("stage-2-girl-desktop");
    assert.equal(
      await page
        .locator(".space-main")
        .getByText("Sample: Ada made time for a quiet rest.")
        .count(),
      0,
    );
  },
);

test("parent onboarding does not treat relationship as authority", async () => {
  await visit("/onboarding/parent");
  await continueStep();
  await page.getByLabel("Sample relationship").selectOption("Other caregiver");
  await continueStep();
  await visible("needs authority verification");
  await page.getByLabel("Sample relationship").selectOption("Legal guardian");
  await continueStep();
  await page.getByRole("button", { name: "Skip preferences" }).click();
  await continueStep();
  await visible("Permission steps are pending");
  await page
    .getByLabel("Simulate verified authority and required guardian permission")
    .check();
  await page
    .getByLabel("Acknowledge the girl must separately agree to participate")
    .check();
  await continueStep();
  await page
    .getByLabel("Confirm this is the intended fictional connection")
    .check();
  await continueStep();
  await page
    .getByRole("button", { name: "Enter Parent / Guardian demo", exact: true })
    .click();
  await visible("Support her with understanding.");
  await shot("stage-2-parent-desktop");
});

test("staff onboarding is separate from interest and never approves programme readiness", async () => {
  await visit("/onboarding/school");
  await page.getByLabel("Sample invitation").selectOption("withdrawn");
  await continueStep();
  await visible("invalid or withdrawn");
  await page.getByLabel("Sample invitation").selectOption("valid");
  await continueStep();
  await continueStep();
  await page.getByRole("button", { name: "Skip preferences" }).click();
  await page
    .getByLabel("Simulate a separately approved named staff invitation")
    .check();
  await page
    .getByLabel(
      "Acknowledge pending content reviews, support contact, backup and funding",
    )
    .check();
  await continueStep();
  await page
    .getByLabel("Confirm this is the intended fictional connection")
    .check();
  await continueStep();
  await page
    .getByRole("button", { name: "Enter School demo", exact: true })
    .click();
  await visible("Not ready");
  assert.equal(await page.locator(".readiness-item").count(), 7);
  await shot("stage-2-school-desktop");
});

test("optional diary CRUD, cancellation, date correction and failed save use fictional data only", async () => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await enter("girl");
  await page
    .getByRole("navigation", { name: "Girl navigation" })
    .getByRole("link", { name: "My Diary", exact: true })
    .click();
  await visible("No entries.");
  await page
    .getByRole("link", { name: "Skip diary and keep learning" })
    .click();
  await page.waitForURL("**/demo/girl/lessons");
  await page
    .getByRole("navigation", { name: "Girl navigation" })
    .getByRole("link", { name: "My Diary", exact: true })
    .click();
  await page.getByRole("button", { name: "Try a fictional entry" }).click();
  await page
    .getByLabel("Sample end date (optional)")
    .selectOption("2026-09-30");
  await page.getByRole("button", { name: "Save fictional entry" }).click();
  await visible("cannot come before");
  await page
    .getByLabel("Sample end date (optional)")
    .selectOption("2026-10-04");
  await page.getByLabel("Simulate a save failure").check();
  await page.getByRole("button", { name: "Save fictional entry" }).click();
  await visible("Demo save failed");
  await page.getByLabel("Simulate a save failure").uncheck();
  await page.getByLabel("Sample flow (optional)").selectOption("Medium");
  await page.getByRole("button", { name: "Save fictional entry" }).click();
  await visible("Fictional entry saved");
  assert.equal(await page.locator(".diary-list .panel").count(), 1);
  await page.getByRole("button", { name: "Edit fictional entry" }).click();
  await page.getByLabel("Sample flow (optional)").selectOption("Light");
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await visible("Flow: Medium");
  await page.getByRole("button", { name: "Edit fictional entry" }).click();
  await page.getByLabel("Sample flow (optional)").selectOption("Light");
  await page.getByRole("button", { name: "Save fictional entry" }).click();
  await visible("Flow: Light");
  await page.getByRole("button", { name: "Delete entry", exact: true }).click();
  await page.getByRole("button", { name: "Keep entry" }).click();
  assert.equal(await page.locator(".diary-list .panel").count(), 1);
  await page.getByRole("button", { name: "Delete entry", exact: true }).click();
  await page.getByRole("button", { name: "Confirm deletion" }).click();
  await visible("No entries.");
  assert.deepEqual(posts, []);
  const storage = await page.evaluate(() => ({
    ...sessionStorage,
    ...localStorage,
  }));
  assert.equal(Object.keys(storage).length, 1);
  assert.equal(storage["groomingher-demo-role"], "girl");
  await accessibility();
});

test("sharing requires confirmation, cancellation/failure sends nothing, parent sees exact confirmed text", async () => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await enter("girl");
  await page
    .getByRole("link", { name: "Help Me Tell Someone", exact: true })
    .click();
  await page.getByRole("button", { name: "Review exact message" }).click();
  await visible("Attachments: none");
  await page.getByRole("button", { name: "Cancel sharing" }).click();
  await visible("Cancelled. Nothing was shared.");
  await page
    .getByRole("link", { name: "My Shared Messages", exact: true })
    .click();
  await visible("No confirmed sample messages.");
  await page
    .getByRole("link", { name: "Help Me Tell Someone", exact: true })
    .first()
    .click();
  await page
    .getByLabel("Edit the sample closing")
    .selectOption("Could we choose a time to talk?");
  await page.getByRole("button", { name: "Review exact message" }).click();
  const exact = await page.locator(".exact-message").innerText();
  await page.getByLabel("Simulate delivery failure").check();
  await page.getByRole("button", { name: "Confirm sharing in demo" }).click();
  await visible("Demo delivery failed");
  await page.getByLabel("Simulate delivery failure").uncheck();
  await page.getByRole("button", { name: "Confirm sharing in demo" }).click();
  await visible("No real message was sent");
  await page
    .getByRole("button", { name: "Preview recipient’s Parent space →" })
    .click();
  await page.waitForURL("**/demo/parent/messages");
  assert.equal(await page.locator(".exact-message").innerText(), exact);
  assert.equal(
    await page.getByRole("link", { name: "My Diary", exact: true }).count(),
    0,
  );
  await shot("stage-2-confirmed-parent-message");
  await accessibility();
  assert.deepEqual(posts, []);
  await visit("/demo/girl/diary");
  await visible("Changing the URL does not switch roles");
  assert.equal(
    await page.getByRole("button", { name: "Try a fictional entry" }).count(),
    0,
  );
});

test("learning check, learning-only progress, AI unavailable and human support stay accessible", async () => {
  await enter("girl");
  await page.getByRole("link", { name: "Explore sample lesson" }).click();
  await page
    .getByRole("button", { name: "Wait until she has filled in a diary" })
    .click();
  await visible("A diary is optional");
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await page
    .getByRole("button", { name: "Skip check and see explanation" })
    .click();
  await visible("That’s a thoughtful choice");
  await page
    .getByRole("button", { name: "Mark sample lesson explored" })
    .click();
  await page
    .getByRole("button", { name: "Sample lesson explored", exact: true })
    .waitFor();
  await page.getByRole("link", { name: "My Progress", exact: true }).click();
  await visible("1 of 6 sample lessons explored");
  await page
    .getByRole("navigation", { name: "Girl navigation" })
    .getByRole("link", { name: "Ask GroomingHer" })
    .click();
  await visible("AI unavailable");
  await page.getByRole("button", { name: "Do I have PCOS?" }).click();
  await visible("AI cannot determine");
  await page.getByRole("button", { name: "I am in severe pain now" }).click();
  await visible("Do not wait for an app reply");
  await page
    .getByRole("navigation", { name: "Girl navigation" })
    .getByRole("link", { name: "Get Support", exact: true })
    .click();
  await visible("not a live contact");
  await accessibility();
});

test("parent guides and school scheduling, attendance, materials and small-group feedback", async () => {
  await enter("parent");
  await page
    .getByRole("navigation", { name: "Parent / Guardian navigation" })
    .getByRole("link", { name: "Parent Guides" })
    .click();
  await page
    .getByRole("button", { name: "Periods and hygiene", exact: true })
    .click();
  await visible("Do not infer a diagnosis");
  await accessibility();
  await enter("school");
  await page
    .getByRole("navigation", { name: "School navigation" })
    .getByRole("link", { name: "Sessions", exact: true })
    .click();
  await page
    .getByLabel("Week 6 sample date")
    .selectOption({ label: "16 November 2026 (fictional draft)" });
  await enter("parent");
  await page
    .getByRole("navigation", { name: "Parent / Guardian navigation" })
    .getByRole("link", { name: "School Programme" })
    .click();
  await visible("16 November 2026 (fictional draft)");
  await enter("school");
  await page
    .getByRole("navigation", { name: "School navigation" })
    .getByRole("link", { name: "Participation" })
    .click();
  await page.getByLabel("Ada sample attendance").selectOption("Absent");
  await visible("1 / 3 present");
  await page
    .getByRole("navigation", { name: "School navigation" })
    .getByRole("link", { name: "Materials" })
    .click();
  await visible("Anonymous-question guidance");
  await page
    .getByRole("navigation", { name: "School navigation" })
    .getByRole("link", { name: "Feedback" })
    .click();
  await visible("Results withheld");
  await page
    .getByLabel("Preview a small group with only 3 responses")
    .uncheck();
  await visible("12 / 15");
  await page.getByLabel("Simulate a feedback submission failure").check();
  await page
    .getByRole("button", { name: "Preview feedback submission" })
    .click();
  await visible("Demo feedback failed");
  await accessibility();
});

test("logout and revoked demo access clear marker and prevent reopening role space", async () => {
  await enter("girl");
  await page.getByRole("link", { name: "Account & Privacy" }).click();
  await page.getByLabel("Pause future sample sharing").check();
  await page
    .getByRole("link", { name: "Help Me Tell Someone", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Review exact message" })
      .isDisabled(),
    true,
  );
  await page.getByRole("button", { name: "Exit demo / Log out" }).click();
  await page.waitForURL(base + "/");
  assert.equal(
    await page.evaluate(() => sessionStorage.getItem("groomingher-demo-role")),
    null,
  );
  await visit("/demo/girl");
  await visible("This role space is not open.");
  await enter("school");
  await page.getByRole("link", { name: "Account & Privacy" }).click();
  await page
    .getByRole("button", { name: "Simulate staff access withdrawn" })
    .click();
  await visible("This role space is not open.");
});

test(
  "phone role homes/diary, narrow screen overflow, mobile menu and keyboard accessibility",
  { timeout: 90000 },
  async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const role of ["girl", "parent", "school"]) {
      await enter(role);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        role + " mobile overflow",
      );
      await shot(`stage-2-${role}-mobile`);
      await accessibility();
      await page.getByRole("button", { name: /Space menu/ }).click();
      await page.getByRole("button", { name: "Exit demo / Log out" }).click();
    }
    await enter("girl");
    await page.getByRole("button", { name: /Space menu/ }).click();
    await page
      .getByRole("navigation", { name: "Girl navigation" })
      .getByRole("link", { name: "My Diary", exact: true })
      .click();
    await page.getByRole("button", { name: "Try a fictional entry" }).click();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await shot("stage-2-diary-mobile");
    await accessibility();
    await visit("/onboarding/girl");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await accessibility();
    await shot("stage-2-onboarding-mobile");
  },
);
