import { test } from "../src/fixtures/TestFixture"


test('Register user', async ({ page, basePage, homePage, testData }) => {
    console.log('Spec is running...', process.env.EXEC_ENV);
    basePage.goToURL()
    homePage.enterUserDetails(String(testData.Module1TestData?.firstName))
    console.log(testData.Module1TestData?.firstName);
    await page.waitForTimeout(2000);
})