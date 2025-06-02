import { test, expect } from "@playwright/test";
import testData from "../test-data/testData.json";
// import dotenv from "dotenv"

// dotenv.config()

test.describe('tutorial', async () => {
    test('drag and drop with iFrmae', { tag: ['@Smoke'] }, async ({ page }) => {
        await page.goto('https://jqueryui.com/droppable/')
        // const frame =  page.locator('.demo-frame').contentFrame(); //or below
        const frame = page.frameLocator('.demo-frame')

        const drag = frame.locator('#draggable')
        const drop = frame.locator('#droppable')
        await drag.dragTo(drop);

    })
    test('mouse clicks', { tag: ['@Smoke', '@Regression'] }, async ({ page }) => {
        await page.goto('https://jqueryui.com/tooltip/')
        // const frame =  page.locator('.demo-frame').contentFrame(); //or below
        const frame = page.frameLocator('.demo-frame')

        const el = frame.getByRole('link', { name: 'Tooltips' })
        // await el.click({ button: "left" })
        // await page.waitForTimeout(8000);
        // await el.click({ button: "middle" })
        // await page.waitForTimeout(8000);
        // await el.click({ button: "right" })
        // await page.waitForTimeout(8000);
        await el.hover();
        console.log(Date.now());
        // await page.waitForTimeout(8000);
        console.log(Date.now().toLocaleString());
        await page.keyboard.press('Enter')
        await expect.soft(el).toHaveCount(2);
    })

    // test.only('UI validation', async ({ page }) => {
    test('UI validation', { tag: ['@Smoke'] }, async ({ page }) => {
        test.setTimeout(10000)
        await page.goto('https://github.com/Milan-kumar');
        await expect(page).toHaveScreenshot('MilanGithub.png')
        // await page.getByLabel('Search or jump to…').click({timeout: 5000})
        await expect(page).toHaveScreenshot('MilanGithub.png')
    })

    test.only('validate git repo names', { tag: '@Regression' }, async ({ page }) => {
        await page.goto(`${process.env.GITHU_URL}`);
        // await page.goto('https://github.com/Milan-kumar')
        const repos = await page.locator('.repo').all();
        console.log(repos.length);
        let count = 0;
        console.log('PARALLEL', process.env.PARALLEL);

        repos.forEach(async (repo) => {
            const text = await repo.textContent();
            console.log('repo:', count++, text);
        });
        console.log('testdata',testData);

        testData.forEach(data=>{
            console.log(data.set1?.skill1)
        } )
        // console.log(testData.set1.skill1);

        // for (const repo of repos) {
        //     const text = await repo.textContent();
        //     console.log(`repo:  ${count++}`, text);

        // }
    })
})

