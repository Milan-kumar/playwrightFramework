npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test


#Allure Report
    allure serve allure-results

Allure Report with Playwright [Screenshots, Videos & Traces]
Step1: Install Allure Report command-line tool

npm install -g --save-dev allure-commandline
Step2: Install the Allure Playwright adapter.

npm install --save-dev allure-playwright
Step3: Add below config in playwright.config.js file.

reporter:[
['html'],
['allure-playwright']
],

Step4: Run Playwright tests.

npx playwright test
Step5: Generate Allure Report

npx allure serve allure-results
or

allure generate allure-results --clean
allure open
