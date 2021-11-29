import { Type } from "class-transformer";
import { BaseModel } from "../../../models/BaseModel";

export class UserData extends BaseModel {
    name?: string;
    startDate?: number;
    endDate?: number;
    @Type(() => UserHistoryData)
    public history?: UserHistoryData[];

    public getExpired() {
        try {
            if(this.history){
                return new Date((this.history[0].expired || 0) * 1000).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            }
        } catch (e) {
            return ''
        }
    }

    public getDuration() {

        const start = new Date((this.startDate || 0) * 1000)
        const end = new Date((this.endDate || 0) * 1000)

        const resultStart = start.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        const resultEnd = end.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        if (start.getMonth() == end.getMonth()) {
            if (start.getDate() == end.getDate()) {
                return resultStart
            } else {
                return start.getDate() + ' - ' + resultEnd
            }
        } else {
            return resultStart + ' - ' + resultEnd
        }
    }
}

export class UserHistoryData extends BaseModel {
    code?: string;
    code64?: string;
    couponTypeID?: number;
    detail?: string;
    created?: number;
    expired?: number;

    constructor(couponTypeID: number, detail: string) {
        super()
        this.couponTypeID = couponTypeID
        this.detail = detail
    }
}