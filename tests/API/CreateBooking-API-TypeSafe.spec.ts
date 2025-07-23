import test, { expect, request } from "@playwright/test";
import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";
import { faker } from "@faker-js/faker";

test.use({ baseURL: process.env.API_BASE_URL })

test('Create a booking with dynamic typesafe data ', async ({ request }) => {
    const fname = faker.person.firstName("male");
    const lname = faker.person.lastName("male");
    const price = faker.number.int({ min: 1000, max: 10000 });
    const additionalneeds = "breakfast"

    const postAPIBody = await getPOSTAPIRequestBody(fname, lname, price, true, additionalneeds, "2025-07-25", "2025-07-29");
    const response = await request.post("/booking", { data: postAPIBody });

    const jsonResponse = await response.json();


    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe("OK");
    expect(response.headers()['content-type']).toContain("application/json");
    const postResponseString = JSON.stringify(jsonResponse, null, 2)
    console.log(`postResponseString: ${postResponseString}`);


    expect(jsonResponse.booking).toHaveProperty('firstname')
    expect(jsonResponse.booking.firstname).toBe(fname);
    expect(jsonResponse.booking).toHaveProperty('depositpaid')
    expect(jsonResponse.booking.bookingdates).toHaveProperty('checkin')

    console.log(`BookingID: ${jsonResponse.bookingid}`);
    expect(jsonResponse.booking.additionalneeds).toEqual(additionalneeds)
    console.log(`postResponse.status(): ${response.status()}`);
    console.log(`postResponse.ok(): ${response.ok()}`);
    console.log(`response.ok(): ${response.statusText()}`);
    console.log(`Content Type: ${response.headers()['content-type']}`);
})