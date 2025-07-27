import test, { expect } from "@playwright/test";

test('Mock API request', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async (route) => {
        const json = [
            { name: "fruit1", id: 12 },
            { name: "fruit2", id: 11 },
            { name: "fruit3", id: 10 },
            { name: "fruit4", id: 14 },
            { name: "fruit5", id: 15 },
            { name: "fruit6", id: 16 },
        ]

        await route.fulfill({ json })
    })

    await page.goto('https://demo.playwright.dev/api-mocking/');
    expect(await page.getByText("fruit5").isVisible()).toBeTruthy();
})

test('Mock API Response', async ({ page }) => {
    await page.route('*/*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'resFruit1', id: 23 })
        json.push({ name: 'resFruit2', id: 24 })
        json.push({ name: 'resFruit3', id: 25 })
        json.push({ name: 'resFruit4', id: 26 })

        await route.fulfill({ response, json })
    });

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await expect(page.getByText("resFruit3")).toBeVisible();
})

test('Mock API from HAR fileResponse', async ({ page }) => {
    await page.routeFromHAR('./har/fruits.har', {
        url: '*/*/**/api/v1/fruits',
        // update: true
        update: false
    })

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await expect(page.getByText("HAR-strawberry")).toBeVisible();
})