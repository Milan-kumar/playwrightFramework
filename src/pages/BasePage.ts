import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async goToURL(){
        console.log(`ENV: ${process.env.EXEC_ENV}`);
        
        if(process.env.EXEC_ENV === 'qa'){
            console.log(`URL: ${process.env.APP_URL_QA}`);            
            await this.page.goto(`${process.env.APP_URL_QA}`);
            console.log(`Test running in ${process.env.EXEC_ENV} environment `);            
        } else if(process.env.EXEC_ENV === 'dev'){
            await this.page.goto(`${process.env.APP_URL_DEV}`);
            console.log(`Test running in ${process.env.EXEC_ENV} environment `);            
        }
    }   

}