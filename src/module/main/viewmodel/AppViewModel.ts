import WebAPI from "../../../api/WebAPI";
import AppConfig from "../../../AppConfig";
import { BaseModel } from "../../../models/BaseModel";
import { UserModel } from "../../authentication/model/UserModel";
import { CampaignData } from "../../home/model/UserData";
import RequestLogModel from '../model/LoginRequestModel'


export default class LoginViewModel {

    request = new RequestLogModel()

    loadAppTheme(callback: (data?: {
        logo: string,
        backgroundColor: string,
        nextEvent?: {
            detail: string,
            duration: string
        },
        count?: number
    }) => void, errorCallback: (status: number, msg: string) => void) {
        new WebAPI().request(AppConfig.useMockup ? 'https://dl.dropboxusercontent.com/s/0i13lv5oobll27c/data.json' : AppConfig.authenticationAPI || '',
            'Authentication',
            'Welcome',
            new BaseModel(),
            CampaignData,
            (obj, array) => {
                if (obj.currentCampaign != null) {
                    callback({
                        logo: obj.currentCampaign.icon || 'logo.png',
                        backgroundColor: obj.currentCampaign.bgColor || '#FFFFFF',
                        count: obj.currentCampaign.couponPerUser
                    })
                } else if (obj.nextCampaign != null) {

                    let nextDetail = 'กิจกรรมใหม่จะเริ่มในวันที่ ' + new Date((obj.nextCampaign.startDate || 0) * 1000).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })

                    const now = new Date()
                    const end = new Date((obj.nextCampaign.startDate || 0) * 1000)

                    let nextDuration = '(เหลืออีก ' + (end.getDate() - now.getDate()) + ' วัน)'
                    callback({
                        logo: obj.nextCampaign.icon || '',
                        backgroundColor: obj.nextCampaign.bgColor || '#FFFFFF',
                        count: obj.nextCampaign.couponPerUser,
                        nextEvent: {
                            detail: nextDetail,
                            duration: nextDuration
                        }
                    })
                } else if (obj.previousCampaign != null) {
                    callback({
                        logo: obj.previousCampaign.icon || '',
                        backgroundColor: obj.previousCampaign.bgColor || '#FFFFFF',
                        count: obj.previousCampaign.couponPerUser
                    })
                }
            },
            (errorStatus, errorMessage) => {
                errorCallback(errorStatus, errorMessage)
            })
    }

    login(callback: (msg?: string) => void, errorCallback: (status: number, msg: string) => void) {
        new WebAPI().request(AppConfig.authenticationAPI,
            'Authentication',
            'Login',
            this.request,
            UserModel,
            (obj, array) => {
                console.log(JSON.stringify(obj))
                window.localStorage.setItem("user", JSON.stringify(obj));
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
                Authorization: `Bearer ${accessToken}`
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