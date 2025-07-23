import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";

test.use({ baseURL: process.env.API_BASE_URL })

test('Get booking details', async ({ request }) => {
    const fname = faker.person.firstName("male");
    const lname = faker.person.lastName("male");
    const price = faker.number.int({ min: 1000, max: 10000 });
    const additionalneeds = "breakfast"

    const postAPIBody = await getPOSTAPIRequestBody(fname, lname, price, true, additionalneeds, "2025-07-25", "2025-07-29");
    const response = await request.post("/booking", { data: postAPIBody });
    const jsonResponse = await response.json();
    const postResponseString = JSON.stringify(jsonResponse, null, 2)
    console.log(`postResponseString: ${postResponseString}`);
    console.log(`/booking/${jsonResponse.bookingid}`);

    const getResponse = await request.get(`/booking/${jsonResponse.bookingid}`);
    const getJsonResponse = await getResponse.json();
    console.log("RES: ", JSON.stringify(getJsonResponse, null, 2));

    expect(getResponse.status()).toBe(200);
    expect(getResponse.statusText()).toBe("OK")
})