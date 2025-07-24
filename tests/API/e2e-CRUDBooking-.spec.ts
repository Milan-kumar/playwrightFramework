import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";

test.use({ baseURL: process.env.API_BASE_URL })

test('Update booking details using PATCH', async ({ request }) => {
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

    //PATCH
    const PATCHResponse = await request.patch(`/booking/${bookingID}`,
        {
            headers: {
                Cookie: `token = ${token}`
            },
            data: { lastname: lname + " Update" }
        })
    const PATCHJSONResponse = await PATCHResponse.json();
    console.log(`PATCHResponse: ${JSON.stringify(PATCHJSONResponse, null, 2)}`);

    expect(PATCHResponse.status()).toBe(200);
    expect(PATCHResponse.statusText()).toBe("OK")
    expect(PATCHJSONResponse.lastname).toBe(lname + " Update")

    //DELETE
    const deleteResponse = await request.delete(`/booking/${bookingID}`,
        {
            headers: {
                Cookie: `token = ${token}`
            }
        })
    // const deleteJSONResponse = await deleteResponse.json();
    console.log(`deleteResponse: ${await deleteResponse.body()}`);

    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe("Created");
})