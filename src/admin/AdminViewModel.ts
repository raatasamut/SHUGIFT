import WebAPI from "../api/WebAPI";
import AppConfig from "../AppConfig";
import { UserModel } from "../module/authentication/model/UserModel";
import MD5 from 'md5'
import AdminRequestLogin from "./module/authentication/model/AdminRequestLogin";
import { LogD } from "../util/AppLog";

export default class AdminViewModel {

    
    login(user: string, password: string, callback: (user?: UserModel) => void, errorCallback: (status: number, msg: string) => void) {
        new WebAPI().request(AppConfig.authenticationAPI,
            'Authentication',
            'AdminLogin',
            new AdminRequestLogin(user, MD5(password)),
            UserModel,
            (obj, array) => {
                LogD(JSON.stringify(obj))
                window.localStorage.setItem("admin", JSON.stringify(obj));
                callback(obj)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            },
            true)
    }

}