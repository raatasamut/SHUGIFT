import { RequestModel } from './models/RequestModel';
import { BaseModel } from './../models/BaseModel';
import { ResponseModel } from './models/ResponseModel';
import { ClassConstructor, plainToClass } from 'class-transformer';

export default class WebAPI {

    request<T>(url: string, module: string, target: string, data: BaseModel, cls: ClassConstructor<T>, successCallback: ((cls: T, clsArray: T[]) => void), errorCallback: ((status: number, message: string) => void)) {
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

        console.log(`Request : ${url}`);
        console.log(`Data : ${JSON.stringify(new RequestModel(module, target, data))}`);

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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
                res.text().then(txt => {
                    console.log(`${res.status} : ${txt}`);
                    errorCallback(res.status, txt);
                })

            }
        }).catch((error: string) => {
            console.log(error);
            errorCallback(0, error);
        });
    }
}
