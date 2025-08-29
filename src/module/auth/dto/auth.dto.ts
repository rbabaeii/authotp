import { IsMobilePhone, IsString, Length } from "class-validator";

export class sendOTPDto {
    @IsMobilePhone("fa-IR")
    mobile : string 
}
export class checkOTPDto {
    @IsMobilePhone("fa-IR")
    mobile : string
    @IsString()
    @Length(5 ,5,{message:"incorrect code"}) 
    code : string
}