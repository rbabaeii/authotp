import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
    App = "App",
    Db = "Db" ,
    JWT = "JWT"
}

const appConfig = registerAs(ConfigKeys.App , () => ({
    port : 3000
}))


const JwtConfig = registerAs(ConfigKeys.JWT , () => ({
    accessTokenSecret : "sasdfasfdssdsdffaxlkw",
    refreshTokenSecret : "sasdfasfdssdsdffasfsd"
}))

const dbConfig = registerAs(ConfigKeys.Db , () => {
    console.log("Sda")
    
    return{
    port : 5432 ,
    host : "localhost" ,
    username : "postgres",
    password : "@Reza0918" ,
    database : "auth-otp"
}})

export const configuration = [appConfig , dbConfig , JwtConfig] 
