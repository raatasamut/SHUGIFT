import { RequestModel } from './models/RequestModel';
import { BaseModel } from './../models/BaseModel';
import { ResponseModel } from './models/ResponseModel';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { isExpired } from "react-jwt";
import User from '../module/authentication/User';
import AppConfig from '../AppConfig';
import { LogD } from '../util/AppLog';

export default class WebAPI {

    request<T>(url: string, module: string, target: string, data: BaseModel, cls: ClassConstructor<T>, successCallback: ((cls: T, clsArray: T[]) => void), errorCallback: ((status: number, message: string) => void), skipJWT?: boolean) {

        //Check JWT token
        if (!skipJWT) {
            if (!AppConfig.useMockup) {
                const token = User.getUser()?.token
                if (token && isExpired(token)) {
                    errorCallback(401, 'โทเค็นหทดอายุ')
                    return
                }
            }
        }

        // Fetch
        this.fetcher(url, module, target, data, (response) => {

            const tmp = response.getEntries(cls)

            if (tmp instanceof Array) {
                successCallback(Object(), tmp);
            } else {
                successCallback(tmp, []);
            }
        }, errorCallback)
    }

    fetcher(url: string, module: string, target: string, data: BaseModel, successCallback: ((response: ResponseModel) => void), errorCallback: ((status: number, message: string) => void)) {

        try {

            LogD(`Request : ${url}`)
            LogD(`Data : ${JSON.stringify(new RequestModel(module, target, data))}`)

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new RequestModel(module, target, data))
            }).then((res: Response) => {
                if (res.status === 200) {
                    res.json().then((r => {
                        const response = plainToClass(ResponseModel, r);

                        LogD('API res')
                        LogD(response)

                        switch (response.status) {
                            case 200: {
                                successCallback(response);
                                break;
                            }
                            case 401: {
                                //Unauthen; 
                                errorCallback(response.status, response.message || '');
                                break;
                            }
                            default: {
                                errorCallback(response.status, response.message || '');
                                break;
                            }
                        }
                    }));
                } else {
                    try {
                        res.json().then(r => {
                            const response = plainToClass(ResponseModel, r);
                            errorCallback(response.status, response.message || '');
                        })
                    } catch (e) {
                        res.text().then(txt => {
                            LogD(`${res.status} : ${txt}`);
                            errorCallback(res.status, txt);
                        })
                    }
                }
            }).catch((error: string) => {
                LogD('Fetch error');
                errorCallback(0, `${error}`);
            });
        } catch (e) {
            LogD('exception error');
            errorCallback(0, `${e}`);
        }
    }

    getWorldTime(cb: ((date: Date) => void)) {
        fetch('http://worldtimeapi.org/api/timezone/Asia/Bangkok').then((res) => {
            try {
                if (res.status === 200) {
                    res.json().then(r => {
                        cb(new Date(r.unixtime * 1000))
                    })
                }
            } catch (e) {
                LogD('Fetch world time exception');
                cb(new Date())
            }
        }).catch((error: string) => {
            LogD('Fetch world time error');
            cb(new Date())
        })
    }
}
