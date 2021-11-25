import { plainToClass } from 'class-transformer';
import AppConfig from '../AppConfig';
import { UserModel } from './model/UserModel';

export default class User{

    static authenticationAPI = AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/ytif6azmjxp8x8q/response.json' : ''

    static getUser() {
        try {
            let tmp = window.sessionStorage.getItem('user')
            if(tmp){
                return plainToClass(UserModel, JSON.parse(tmp))
            } else {
                return undefined
            }
        } catch (e) {
            return undefined
        }
    }
}