
export default class AdminConvertViewModel {

    inputCode: string = ''

    setInputCode(txt: string) {
        this.inputCode = txt
    }

    shouldPass(callback: ((pass: boolean, code: string) => void)) {

        try { //U0hVR0lGVDIwJQ== //=0hVR0lGVDIwJQ=U

            let chars = this.swapStr(this.inputCode, 0, this.inputCode.length - 1)

            var base64 = require('base-64')
            var decodedData = base64.decode(chars)

            console.log(decodedData)

            if (this.check(decodedData)) {
                callback(true, decodedData)
            } else {
                callback(false, '')
            }
        } catch (e) {
            callback(false, '')
        }

    }

    swapStr(str: string, first: number, last: number) {
        return str.substr(0, first)
            + str[last]
            + str.substring(first + 1, last)
            + str[first]
            + str.substr(last + 1);
    }

    check(code: []) {
        let whietlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
        for (let c in code)
            if (!whietlist.includes(code[c]))
                return false
        return true
    }
}