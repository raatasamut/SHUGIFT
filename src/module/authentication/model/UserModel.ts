import { Type } from 'class-transformer';
import 'reflect-metadata'
import { BaseModel } from '../../../models/BaseModel';

export enum APIKey {
    SELECT = 'SELECT', INSERT = 'INSERT', UPDATE = 'UPDATE', DELETE = 'DELETE'
}

export class UserModel extends BaseModel {

    token?: string;
    allowModule?: string[];

    @Type(() => UserInfoModel)
    user?: UserInfoModel;

    @Type(() => WebServiceModel)
    webService?: WebServiceModel[];

    getService(key: APIKey) {
        return this.webService?.find(obj => obj.key === key.toString())?.url || key;
    }
}

export class UserInfoModel extends BaseModel {
    name?: string;
    email?: string;
    userID?: string;
    picture?: string;
    channel?: string;
}

export class WebServiceModel extends BaseModel {
    key?: string;
    url?: string;
}