import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
    App = "App",
    Db = "Db"
}

const appConfig = registerAs(ConfigKeys.App , () => ({
    port : 3000
}))
const dbConfig = registerAs(ConfigKeys.Db , () => {
    console.log("Sda")
    
    return{
    port : 5432 ,
    host : "localhost" ,
    username : "postgres",
    password : "@Reza0918" ,
    databasee : "auth-otp"
}})

export const configuration = [appConfig , dbConfig] 
