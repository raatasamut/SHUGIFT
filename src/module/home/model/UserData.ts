import { Type } from "class-transformer";
import { BaseModel } from "../../../models/BaseModel";

export class UserData extends BaseModel {
    campaign?: string;
    startDate?: number;
    endDate?: number;
    @Type(() => UserHistoryData)
    history?: UserHistoryData[];
}

export class UserHistoryData extends BaseModel {
    code?: string;
    code64?: string;
    couponTypeID?: string;
    detail?: string;
    created?: number;
}