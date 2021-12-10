export default class AppConfig {
    static useMockup: boolean = true

    static authenticationAPI = AppConfig.useMockup ?
        'https://dl.dropboxusercontent.com/s/wffnqh0wxm9zyxk/data.json' :
        'https://gift.shu.global:81/api/authen'
}