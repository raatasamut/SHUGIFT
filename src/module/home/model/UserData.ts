import { Type } from "class-transformer";
import { BaseModel } from "../../../models/BaseModel";

export class CampaignData extends BaseModel {
    @Type(() => UserData)
    previousCampaign?: UserData;
    @Type(() => UserData)
    currentCampaign?: UserData;
    @Type(() => UserData)
    nextCampaign?: UserData;
}

export class UserData extends BaseModel {
    name?: string;
    startDate?: number;
    endDate?: number;
    couponPerUser?: number;
    usingAdminChannel?: boolean;
    @Type(() => UserHistoryData)
    public history?: UserHistoryData[];

    icon?: string;
    bgColor?: string;

    public getExpired() {
        try {
            if (this.history != null && this.history[0].couponTypeID != -1) {
                return 'คูปองหมดอายุวันที่ ' + new Date((this.history[0].expired || 0) * 1000).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            } else return ''
        } catch (e) {
            return ''
        }
    }

    public getDayLeft() {
        try {
            const now = new Date()
            const end = new Date((this.endDate || 0) * 1000)

            if (now.getDate() === end.getDate()) {
                return 'วันสุดท้าย'
            } else if (now.getDate() > end.getDate()) {
                return 'สิ้นสุดระยะเวลากิจกรรม'
            } else {
                return (end.getDate() - now.getDate()) + ' วันสุดท้าย'
            }

        } catch (e) {
            return ''
        }
    }

    public getDayLeftMoreThan(days: number) {
        try {
            const now = new Date().getTime()
            const end = new Date((this.endDate || 0) * 1000).getTime() + (days * 24 * 60 * 60 * 1000)
            return end < now
        } catch (e) {
            return false
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

        if (start.getMonth() === end.getMonth()) {
            if (start.getDate() === end.getDate()) {
                return resultStart
            } else {
                return start.getDate() + ' - ' + resultEnd
            }
        } else {
            return resultStart + ' - ' + resultEnd
        }
    }

    public isEventEnd() {
        const now = new Date()
        const end = new Date((this.endDate || 0) * 1000)

        return now.getDate() > end.getDate()
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

    public getExpired() {
        try {
            return new Date((this.expired || 0) * 1000).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        } catch (e) {
            return ''
        }
    }
}