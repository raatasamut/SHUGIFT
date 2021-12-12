export default class AdminLoginViewModel {
    
    username: string = ''
    password: string = ''

    setUsername(user: string){
        this.username = user
    }
    
    setPassword(pass: string){
        this.password = pass
    }
}
