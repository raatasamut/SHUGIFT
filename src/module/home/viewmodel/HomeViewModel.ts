import WebAPI from "../../../api/WebAPI";
import AppConfig from "../../../AppConfig";
import { BaseModel } from "../../../models/BaseModel";
import { APIKey } from "../../authentication/model/UserModel";
import User from "../../authentication/User";
import { GiftData } from "../model/GiftData";
import { MCouponType } from "../model/MCouponType";
import { UserData, UserHistoryData } from "../model/UserData";

export default class HomeViewModel {

    loadMCouponType(callback: (list?: Array<MCouponType>) => void, errorCallback: (msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/xtd3nqx0bk2d9qr/data.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'CouponType',
            new BaseModel(),
            MCouponType,
            (obj, array) => {
                callback(array)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorMessage)
            })
    }

    loadUserData(callback: (data?: UserData) => void, errorCallback: (msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/ewajvtxporqf1rs/data.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'Data',
            new BaseModel(),
            UserData,
            (obj, array) => {
                callback(obj)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorMessage)
            })
    }

    loadGiftData(callback: (data?: UserHistoryData) => void, errorCallback: (msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/1i7dg4z7ikma5iq/data.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'Gift',
            new BaseModel(),
            GiftData,
            (obj, array) => {
                callback(obj.coupon)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorMessage)
            })
    }
}