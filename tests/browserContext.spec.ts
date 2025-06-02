import test from "@playwright/test";

test('multi tabs test', async ({ page, browser }) => {
    await page.goto('https://www.linkedin.com/in/milanyadav/')
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context1.newPage();
    await page1.goto('https://github.com/Milan-kumar')
    await page2.goto('https://www.linkedin.com/in/milanyadav/')
    await page1.waitForTimeout(5000);
})

test('multi tabs test1', async ({ page, context }) => {
    await page.goto('https://www.linkedin.com/in/milanyadav/')
    // const context1 = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://github.com/Milan-kumar')
})