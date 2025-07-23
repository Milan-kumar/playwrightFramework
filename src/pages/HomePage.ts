import { expect, Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly firstName: Locator
    
    constructor(page: Page) {
        this.page = page;

        // Elements
        this.firstName = page.getByPlaceholder('First Name');
    }

    // methods
    async enterUserDetails(firstName: string) {
        let consentBtn = this.page.locator('.fc-button-label').first();
        if (await consentBtn.isVisible()) await consentBtn.click()
        await this.firstName.fill(firstName);
        expect(await this.firstName.inputValue()).toBe(firstName)
    }
}