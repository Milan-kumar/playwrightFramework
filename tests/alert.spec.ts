import test from "@playwright/test";

test('alert test', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    // await page.getByRole('link', { name: 'See an example alert' }).click()
    page.once('dialog', alert => {
        alert.accept();
        console.log(`Alert ${alert.message()}`);

    })
    await page.getByText('See an example alert', { exact: true }).click()
})

test('alert confirm', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    // await page.getByRole('link', { name: 'See an example alert' }).click()
    page.once('dialog', alert => {
        alert.dismiss();
        console.log(`Alert ${alert.message()}`);

    })
    await page.getByText('See a sample confirm', { exact: true }).click()
})
test.only('alert prompt', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    // await page.getByRole('link', { name: 'See an example alert' }).click()
    page.once('dialog', async(alert) => {
        const text = alert.message();
        await alert.accept('Test')
        // await alert.accept('Test')
        console.log(`Alert ${alert.message()}`);
        console.log(`Alert ${alert.type()}`);
        
    })
    await page.getByText('See a sample prompt', { exact: true }).click()
    // await page.waitForTimeout(5000);
})