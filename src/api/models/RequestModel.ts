import { BaseModel } from './../../models/BaseModel';
import User from '../../authentication/User';

export class RequestModel {
    module?: string;
    target?: string;
    token?: string;
    data?: BaseModel;

    constructor(module?: string, target?: string, data?: BaseModel){
        this.module = module;
        this.target = target;
        this.data = data;
        this.token = User.getUser()?.token || ""
    }
    
}