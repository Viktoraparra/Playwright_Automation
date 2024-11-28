const { test, expect, request } = require("@playwright/test");

// test.beforeEach( async ()=>{})


    let apiContext;
    let token;
    const orderPayload = {orders:[{country:"India",productOrderedId:"6581ca979fd99c85e8ee7faf"}]}
    let orderId;

test.beforeAll( async ()=> {
    apiContext = await request.newContext();
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data:{
            userEmail:"viksparra@gmail.com",
            userPassword:"G34d26X99"
        }
    })
    // Validar la respuesta
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Extraer el token
    token = responseBody.token;
    console.log(`Token obtenido: ${token}`);

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data:orderPayload,
        headers: {
            'Authorization':token,
            'content-type':'application/json',

        }        
    })
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson)
    orderId = orderResponseJson.orders[0];
    console.log(orderId);
})



test("Login app by API and checking order by API", async ({ page }) => {

    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    const rows = page.locator('tbody tr');
    await page.locator('tbody').waitFor();
    for (let i = 0; i < await rows.count(); i++) {
        const textValidate = await rows.locator('th').nth(i).textContent();

        if(textValidate === orderId){
            rows.nth(i).locator('button[class="btn btn-primary"]').click();
            break;
        }
    }
    await page.locator('div[class="col-text -main"]').waitFor()
    await expect(page.locator('div[class="col-text -main"]')).toHaveText(orderId)

    await page.pause();
});



