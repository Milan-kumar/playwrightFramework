

import test, { expect } from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from "fs"
import path from "path"

type TestRecords = {
    Skill1: string,
    Skill2: string
}
const records = parse(
    fs.readFileSync(path.join(__dirname, "../test-data/testData.csv")),
    {
        columns: true,
        // skipEmptyLines: true
        skip_empty_lines: true
    }
) as TestRecords[];

for (const record of records) {

    test(`CSV test ${record.Skill2}`, async ({ page }) => {
        await page.goto('https://www.google.com')
        expect(page).toHaveTitle('Google');
        console.log(record.Skill2);
    })
}