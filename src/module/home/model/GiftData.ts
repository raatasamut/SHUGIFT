import { BaseModel } from "../../../models/BaseModel";
import { Type } from "class-transformer";
import { UserHistoryData } from "./UserData";

export class GiftData extends BaseModel {

    @Type(() => UserHistoryData)
    coupon?: UserHistoryData;
}