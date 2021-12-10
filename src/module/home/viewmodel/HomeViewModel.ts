import WebAPI from "../../../api/WebAPI";
import AppConfig from "../../../AppConfig";
import { BaseModel } from "../../../models/BaseModel";
import { APIKey } from "../../authentication/model/UserModel";
import User from "../../authentication/User";
import { GiftData } from "../model/GiftData";
import { MCouponType } from "../model/MCouponType";
import { UpdateCouponChannel } from "../model/UpdateCouponChannel";
import { CampaignData, UserData, UserHistoryData } from "../model/UserData";

export default class HomeViewModel {

    loadMCouponType(callback: (list?: Array<MCouponType>) => void, errorCallback: (status: number, msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/xtd3nqx0bk2d9qr/data.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'MCouponType',
            new BaseModel(),
            MCouponType,
            (obj, array) => {
                callback(array)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            })
    }

    loadUserData(callback: (data?: CampaignData) => void, errorCallback: (status: number, msg: string) => void) {
        //https://dl.dropboxusercontent.com/s/ewajvtxporqf1rs/data.json
        //https://dl.dropboxusercontent.com/s/5uolwblzs87hp8s/dataFuture.json
        //https://dl.dropboxusercontent.com/s/1mcrw9ulbvh8tis/dataPrevious.json

        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/ewajvtxporqf1rs/data.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'Data',
            new BaseModel(),
            CampaignData,
            (obj, array) => {
                callback(obj)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            })
    }

    loadGiftData(callback: (data?: UserHistoryData) => void, errorCallback: (status: number, msg: string) => void) {

        //https://dl.dropboxusercontent.com/s/1i7dg4z7ikma5iq/data.json
        //https://dl.dropboxusercontent.com/s/bc2c2prposyst6l/data404.json

        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/bc2c2prposyst6l/data404.json' : User.getUser()?.getService(APIKey.SELECT) || '',
            'Home',
            'Gift',
            new BaseModel(),
            GiftData,
            (obj, array) => {
                callback(obj.coupon)
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            })
    }


    updateCouponChannel(usingAdminChannel: boolean,callback: () => void, errorCallback: (status: number, msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/w23g8ovx9amyxsu/data.json' : User.getUser()?.getService(APIKey.UPDATE) || '',
            'Home',
            'UpdateCouponChannel',
            new UpdateCouponChannel(usingAdminChannel),
            BaseModel,
            (obj, array) => {
                callback()
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            })
    }
}