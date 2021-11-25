import WebAPI from "../../api/WebAPI";
import { UserModel } from "../../authentication/model/UserModel";
import User from "../../authentication/User";
import RequestLogModel from '../model/LoginRequestModel'


export default class LoginViewModel{
    
    request = new RequestLogModel()

    login(callback: (msg?: string) => void){
        new WebAPI().request(User.authenticationAPI,
            'Authentication',
            'Login',
            this.request,
            UserModel,
            (obj, array) => {
                console.log(JSON.stringify(obj))
                window.sessionStorage.setItem("user", JSON.stringify(obj));
                callback()
            },
            (errorStatus, errorMessage) => {
                callback(errorMessage)
            })
    }
    
}