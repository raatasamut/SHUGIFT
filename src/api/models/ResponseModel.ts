import { plainToClass, ClassConstructor } from 'class-transformer';

export class ResponseModel {
    status: number = 0;
    message?: string;
    entries?: any;

    getEntries<T>(cls: ClassConstructor<T>){
        return plainToClass(cls, this.entries)
    }
}