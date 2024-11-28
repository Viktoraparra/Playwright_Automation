import { test, expect, Page, Locator } from "@playwright/test";

export class APIUtils {

    apiContext:any;
    loginPayload:string;

    constructor(apiContext:any, loginPayload:string){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
     
    const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data:this.loginPayload
    })
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    const token = responseJson.token;

    return token;
    }

    async createOrder(payload:string){
        let response = {token: String, orderId:String};
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
            data:payload,
            headers: {
                'Authorization': response.token,
                'content-type':'application/json',
    
            }        
        })
        expect(orderResponse.ok()).toBeTruthy();
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}
