import WebAPI from "../../../api/WebAPI";
import { UserModel } from "../../authentication/model/UserModel";
import User from "../../authentication/User";
import RequestLogModel from '../model/LoginRequestModel'


export default class LoginViewModel {

    request = new RequestLogModel()

    login(callback: (msg?: string) => void, errorCallback: (status: number, msg: string) => void) {
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
                errorCallback(errorStatus, errorMessage)
            })
    }

    checkAddedOA(accessToken: string | null, callback: (added: boolean) => void) {
        fetch('https://api.line.me/friendship/v1/status', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${{accessToken}}`
            }
        }).then((res: Response) => {
            res.json().then((r => {
                callback(r.friendFlag === true)
            }));
        }).catch((error: string) => {
            console.log(error);
        });
    }
}