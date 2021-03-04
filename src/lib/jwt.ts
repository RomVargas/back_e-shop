import { EXPIRETIME, MESSAGES, SECRET_KEY } from "../config/constants";
import jwt from 'jsonwebtoken';
import { IJwt } from "../interfaces/jwt.interface";

class JWT {

    private secretKey = SECRET_KEY as string;
    // Informacion del Payload
    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24){
        return jwt.sign(
            {user: data.user},
            this.secretKey,
            { expiresIn } // 24 hrs
        );
    }

    verify(token: string){
        try{
            return jwt.verify(token, this.secretKey);
        }catch(ex){
            return MESSAGES.TOKEN_VERIFICATION_FALIED;
        }
    }
}

export default JWT;