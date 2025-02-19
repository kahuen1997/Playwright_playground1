import { test, expect, chromium, devices } from "@playwright/test";

let browser;
let context;
let page;

// test.use({
//   ...devices["iPhone 14 Pro"],
// });

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
    args: ["--window-position=400,0"],
  });
  context = await browser.newContext();
  page = await context.newPage();
  // await page.setViewportSize({ width: 800, height: 600 });

  // context.setDefaultTimeout(10000);
});

test.afterAll(async () => {
  await context.close();
});

test.skip("Wiki Page", async ({ page }) => {
  await page.goto("https://en.wikipedia.org/wiki/Burnaby");
  await page.getByLabel("Main menu", { exact: true }).click();

  await Promise.all([
    page.waitForURL("https://en.wikipedia.org/wiki/Main_Page"),
    page.getByRole("link", { name: "Main page" }).click(),
  ]);

  await Promise.all([
    page.waitForURL("https://en.wikipedia.org/wiki/Talk:Main_Page"),
    page.getByRole("link", { name: "Talk" }).click(),
  ]);

  await expect(
    page.getByRole("button", { name: "Search this talk page and its archives" })
  ).toBeVisible();

  //   await page.getByPlaceholder("", { exact: true }).fill("53 Thieves");
  await page.pause();
  //   await expect(
  //     page.getByText("Main Page toolbox", { exact: true })
  //   ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "main-page-toolbox-label" })
      .locator("div#main-page-toolbox-label")
  ).toBeVisible();
});

test.skip("Burnaby Page", async () => {
  // await page.setViewportSize({ width: 600, height: 800 });
  await page.goto("https://www.burnaby.ca/");

  // await expect(page.getByAltText("Home")).toBeVisible();
  // await page.getByAltText("Home").click();

  // await page.getByLabel("Main Menu").getByText("Services & Payments").click();
  await page.locator("#ctrly-control-2").click();
  await expect.soft(page.locator("#ctrly-control-13")).toBeVisible();
  await expect
    .soft(page.locator("#ctrly-control-4"))
    .toHaveText("Services & Payments");
  await page.locator("#ctrly-control-4").click();
  await page.locator("div").filter({ hasText: "Back to Top" }).nth(1).click();
  await page.pause();
});

test.only("bed chem", async () => {
  await page.goto("https://www.facebook.com/r.php?locale=zh_TW&display=page");
  await page.waitForURL(
    "https://www.facebook.com/r.php?locale=zh_TW&display=page"
  );
  await expect.soft(page.getByRole("img", { name: "Facebook" })).toBeVisible();
  await page.getByLabel("姓氏").fill("Bed");
  await page.getByLabel("年", { exact: true }).selectOption("1996");
  await page.getByLabel("月", { exact: true }).selectOption("12");
  await page.getByLabel("日", { exact: true }).selectOption("28");

  await page.getByText("男性").check();
  await page
    .getByRole("textbox", { name: "手機號碼或電子郵件地址" })
    .fill("gmail");

  await test.step(
    "a step",
    async () => {
      await page
        .getByRole("textbox", { name: "手機號碼或電子郵件地址" })
        .press("Backspace");
    },
    { timeout: 5000 }
  );

  await page
    .getByRole("textbox", { name: "手機號碼或電子郵件地址" })
    .press("Backspace");
  await page.getByRole("button", { name: "註冊" }).click();

  await page.getByText("《服務條款》").hover();
  await page.pause();
});
