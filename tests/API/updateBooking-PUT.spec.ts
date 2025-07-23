import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";

test.use({ baseURL: process.env.API_BASE_URL })

test('Update booking details using PUT', async ({ request }) => {
    const fname = faker.person.firstName("male");
    const lname = faker.person.lastName("male");
    const price = faker.number.int({ min: 1000, max: 10000 });
    const additionalneeds = "breakfast"

    const postAPIBody = await getPOSTAPIRequestBody(fname, lname, price, true, additionalneeds, "2025-07-25", "2025-07-29");
    const response = await request.post("/booking", { data: postAPIBody });
    const jsonResponse = await response.json();
    const postResponseString = JSON.stringify(jsonResponse, null, 2)
    console.log(`postResponseString: ${postResponseString}`);
    const bookingID = jsonResponse.bookingid;


    console.log(`Booking ID: ${jsonResponse.bookingid}`);
    const getResponse = await request.get(`/booking`, {
        params: {
            firstname: fname,
            lastname: lname
        }
    });
    const getJsonResponse = await getResponse.json();
    console.log("RES: ", JSON.stringify(getJsonResponse, null, 2));

    expect(getResponse.status()).toBe(200);
    expect(getResponse.statusText()).toBe("OK")

    const tokenResponse = await request.post("/auth", {
        data: {
            "username": process.env.API_USERNAME,
            "password": process.env.API_PASSWORD
        }
    })
    const tokenJSONResponse = await tokenResponse.json();
    let token = tokenJSONResponse.token;
    console.log("TOKEN: ", token);

    //PUT
    const putAPIBody = await getPOSTAPIRequestBody(fname + " Update", lname, price, true, additionalneeds, "2025-07-25", "2025-07-29");
    const putResponse = await request.put(`/booking/${bookingID}`,
        {
            headers: {
                Cookie: `token = ${token}`
            },
            data: putAPIBody
        })
    const putJSONResponse = await putResponse.json();
    console.log(`putJSONResponse: ${JSON.stringify(putJSONResponse, null, 2)}`);

    expect(putResponse.status()).toBe(200);
    expect(putResponse.statusText()).toBe("OK")
    expect(putJSONResponse.firstname).toBe(fname + " Update")
})