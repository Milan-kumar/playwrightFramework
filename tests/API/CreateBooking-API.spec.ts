import test, { expect } from "@playwright/test";
import creatBookingAPIReq from "../../test-data/api-requests/POST-API-REQUESTS.json"
test.use({ baseURL: process.env.API_BASE_URL })

test('Create Bookings', async ({ request }) => {
    const postResponse = await request.post("/booking", { data: creatBookingAPIReq })
    const postResponseJSON = await postResponse.json();

    expect(postResponse.status()).toBe(200);
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.statusText()).toBe("OK");
    expect(postResponse.headers()['content-type']).toContain("application/json");
    const postResponseString = JSON.stringify(postResponseJSON, null, 2)
    console.log(`postResponseString: ${postResponseString}`);


    expect(postResponseJSON.booking).toHaveProperty('firstname')
    expect(postResponseJSON.booking.firstname).toBe(creatBookingAPIReq.firstname);
    expect(postResponseJSON.booking).toHaveProperty('depositpaid')
    expect(postResponseJSON.booking.bookingdates).toHaveProperty('checkin')

    console.log(`BookingID: ${postResponseJSON.bookingid}`);
    expect(postResponseJSON.booking.additionalneeds).toEqual("super bowls")
    console.log(`postResponse.status(): ${postResponse.status()}`);
    console.log(`postResponse.ok(): ${postResponse.ok()}`);
    console.log(`postResponse.ok(): ${postResponse.statusText()}`);
    console.log(`Content Type: ${postResponse.headers()['content-type']}`);
})