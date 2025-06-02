import { test as base } from "@playwright/test"

import { HomePage } from "../pages/HomePage";
import { BasePage } from "../pages/BasePage";

import { loadJSONTestData } from "../utils/JSONHelper";
import { TestData } from "../interface/testData.interface";

export const test = base.extend<{
    saveLogs: void,
    homePage: HomePage
    basePage: BasePage
    testData: TestData
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running..');

        await use();

        console.log('Global after is running..');
    },
    { auto: true }],
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage)
    },
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage)
    },
    testData: async ({ }, use) => {
        const data = await loadJSONTestData();
        await use(data);
    }
})

export { expect } from '@playwright/test'