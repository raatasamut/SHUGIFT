import { BaseModel } from "../../../models/BaseModel";

class RequestLogin extends BaseModel {
    public email?: string;
    public name?: string;
    public userID?: string;
    public picture?: string;
    public channel?: string;
}

export default RequestLogin