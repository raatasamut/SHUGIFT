import { BaseModel } from "../../../models/BaseModel";

export class UpdateCouponChannel extends BaseModel {
    usingAdminChannel?: boolean;

    constructor(usingAdminChannel: boolean){
        super()
        this.usingAdminChannel = usingAdminChannel
    }
}