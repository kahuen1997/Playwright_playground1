import { test, expect, devices, chromium } from "@playwright/test";

let browser;
let context;
let page;

test.use({
  ...devices["iPhone 8"],
  timeout: 40000,
});

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 3000,
    args: ["--window-position=400,0"],
  });

  context = await browser.newContext();
  page = await context.newPage();

  context.setDefaultTimeout(10000);
  context.setDefaultNavigationTimeout(60000);

  page.setDefaultTimeout(50000);
});

test("test", async () => {
  test.setTimeout(120_000);
  await page.goto("https://www.burnaby.ca/");
  await page.getByRole("textbox", { name: "I am looking for…" }).click();
  await page.getByRole("main").getByRole("button", { name: "Search" }).click();
  await page.getByRole("searchbox", { name: "Enter your keywords:" }).click();
  await page
    .getByRole("searchbox", { name: "Enter your keywords:" })
    .fill("skating");
  await page.locator("#edit-submit").click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Skating Lessons | City of" }).click();
  const page1 = await page1Promise;
  await page1
    .getByRole("link", { name: "Rosemary Brown Recreation" })
    .first()
    .click();
  await page1.getByRole("link", { name: "Skating", exact: true }).click();
  await page1
    .getByRole("row", {
      name: "Hockey Drop-in 9:45-11 am 65+, Rink B Reserve Adult Figure Skating 9:15-10:45",
    })
    .getByRole("link")
    .first()
    .click();
  await page1
    .getByRole("button", { name: "Reserve In Advance: Hockey 65" })
    .click();
  await page1.getByRole("textbox", { name: "Email address Required" }).click();
  await page1
    .getByRole("textbox", { name: "Email address Required" })
    .fill("rosmary");
  await page1.getByRole("textbox", { name: "Password Required" }).click();
  await page1.getByRole("textbox", { name: "Password Required" }).fill("brown");
});
