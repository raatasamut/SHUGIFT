import { RequestModel } from './models/RequestModel';
import { BaseModel } from './../models/BaseModel';
import { ResponseModel } from './models/ResponseModel';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { isExpired } from "react-jwt";
import User from '../module/authentication/User';
import AppConfig from '../AppConfig';

export default class WebAPI {

    request<T>(url: string, module: string, target: string, data: BaseModel, cls: ClassConstructor<T>, successCallback: ((cls: T, clsArray: T[]) => void), errorCallback: ((status: number, message: string) => void)) {

        //Check JWT token
        if (!AppConfig.useMockup) {
            const token = User.getUser()?.token
            if (token && isExpired(token)) {
                errorCallback(401, 'โทเค็นหทดอายุ')
                return
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

            console.log(`Request : ${url}`);
            console.log(`Data : ${JSON.stringify(new RequestModel(module, target, data))}`);

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

                        console.log('API res')
                        console.log(response)

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
                            console.log(`${res.status} : ${txt}`);
                            errorCallback(res.status, txt);
                        })
                    }
                }
            }).catch((error: string) => {
                console.log('Fetch error');
                errorCallback(0, `${error}`);
            });
        } catch (e) {
            console.log('exception error');
            errorCallback(0, `${e}`);
        }
    }

    async getNTPTime() {

        // var dgram = require("dgram");

        // var server = dgram.createSocket("udp4");

        // let Sntp = require('sntp')

        // var options = {
        //     host: 'time.navy.mi.th',  // Defaults to pool.ntp.org
        //     port: 123,                      // Defaults to 123 (NTP)
        //     resolveReference: true,         // Default to false (not resolving)
        //     timeout: 4000                   // Defaults to zero (no timeout)
        // };

        // try {
        //     const time = await Sntp.time();
        //     console.log('Local clock is off by: ' + time.t + ' milliseconds');
        //     // process.exit(0);
        // }
        // catch (err) {
        //     console.log('Failed: ' + err);
        //     // process.exit(1);
        // }
    }
}
