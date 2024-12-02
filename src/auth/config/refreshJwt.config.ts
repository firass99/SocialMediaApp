import {  registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";



export default registerAs('refreshJwt',(): JwtSignOptions=> ({
                                //, ():jwt : returns jwtmodule object
    secret: process.env.REFRESH_JWT_KEY || '0628767c8245f858006850dbcf309e6a4b1cae017fd89563739334aba8d4ad46' , // Default value
    expiresIn: process.env.REFRESH_JWT_EXPIRE_IN || '7d' // Default value
    
    }));