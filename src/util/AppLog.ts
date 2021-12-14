import AppConfig from "../AppConfig";

export function LogD(log?: any){
    if(log && AppConfig.showLog){
        console.log(log)
    }
}