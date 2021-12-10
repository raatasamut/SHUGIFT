import { BaseModel } from "../../../../models/BaseModel";

class AdminRequestLogin extends BaseModel {
    public userID?: string;
    public password?: string;

    constructor(user: string, pass: string){
        super()
        this.userID = user
        this.password = pass
    }
}

export default AdminRequestLogin