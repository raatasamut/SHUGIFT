import { Type } from "class-transformer";
import { BaseModel } from "../../../models/BaseModel";

export class UserData extends BaseModel {
    campaign?: string;
    startDate?: number;
    endDate?: number;
    @Type(() => UserHistoryData)
    public history?: UserHistoryData[];
}

export class UserHistoryData extends BaseModel {
    code?: string;
    code64?: string;
    couponTypeID?: number;
    detail?: string;
    created?: number;

    constructor(couponTypeID: number, detail: string){
        super()
        this.couponTypeID = couponTypeID
        this.detail = detail
    }
}