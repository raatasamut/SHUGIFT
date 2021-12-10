import { plainToClass } from 'class-transformer';
import AppConfig from '../../AppConfig';
import RequestLogin from '../main/model/LoginRequestModel';
import { UserModel } from './model/UserModel';

export default class User{

    static getUser() {
        try {
            let tmp = window.localStorage.getItem('user')
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