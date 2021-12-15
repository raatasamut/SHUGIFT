export default class AppConfig {
    static useMockup: boolean = false

    static showLog: boolean = false

    static SHOW_LOADING: number = 950
    static HIDE_LOADING: number = 951

    static authenticationAPI = AppConfig.useMockup ?
        'https://dl.dropboxusercontent.com/s/wffnqh0wxm9zyxk/data.json' :
        'https://gift.shu.global:81/api/authen'
}