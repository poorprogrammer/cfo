import { Given, When } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";
import { LoginPage } from "../../tests/web/pages/LoginPage";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";

let loginPage: LoginPage;
let invoiceArchivePage: BillingArchivePage;
let page: Page;
let browser: Browser;

Given("I am logged in", async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
  invoiceArchivePage = await loginPage.login();
});
