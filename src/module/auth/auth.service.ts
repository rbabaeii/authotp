import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { checkOTPDto, sendOTPDto } from './dto/auth.dto';
import { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { paylodType } from './type/paylod.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity> ,
        @InjectRepository(OtpEntity) private otpRepository : Repository<OtpEntity> ,
        private jwtServise : JwtService ,
        private configServise : ConfigService ,
    ){}


    async sendOtp(otpdto : sendOTPDto){
        const {mobile} = otpdto
        let user = await this.userRepository.findOneBy({mobile})
        if(!user){
            user = this.userRepository.create({
                mobile
            }) 
            user = await this.userRepository.save(user)
        }
            await this.CreateOTPForUser(user)
            const otp = await this.otpRepository.findOneBy({userId : user.id})
             return {
                message : "otp sent successfully",
                otpCode : otp?.code ,
                phone : user.mobile
            }
    }
    async CreateOTPForUser(user : UserEntity){

        const code = randomInt(10000,99999).toString()
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)
        let otp = await this.otpRepository.findOneBy({userId : user.id})
        if (otp){
            if (otp.expired_code > new Date()) {
                throw new BadRequestException("otp code not expired")
            }
            otp.code = code 
            otp.expired_code = expiresIn
        }
        else {
            otp = this.otpRepository.create({
                code,
                expired_code : expiresIn,
                userId : user.id
            })
        }
        otp =await this.otpRepository.save(otp)
        user.otpId = otp.id
        await this.userRepository.save(user)
    }
    async checkOtp(checkdto : checkOTPDto){
        const {mobile , code} = checkdto
        const user = await this.userRepository.findOne({
            where : {mobile : mobile},
            relations : {
                 otp : true
                 }
        })
        const now = new Date()
        if (!user || !user?.otp) throw new UnauthorizedException("User not found")
        if (user.otp.code !==code)throw new UnauthorizedException("Code is incorrect")
        if (user.otp.expired_code < now) throw new UnauthorizedException("Otp code is expired")
        if (!user.mobile_verify){
            this.userRepository.update({id : user.id},{mobile_verify : true })
        }
        const {accessToken , refreshToken} = this.createTokenForUser({id:user.id , mobile})
        return {
            accessToken ,
            refreshToken,
            message : "You logged-in "
        }
    }
    createTokenForUser(paylod : paylodType){
        const accessToken = this.jwtServise.sign(paylod , {
            secret : this.configServise.get("JWT.accessTokenSecret"),
            expiresIn : "10d"
        })
        const refreshToken = this.jwtServise.sign(paylod , {
            secret : this.configServise.get("JWT.refreshTokenSecret"),
            expiresIn : "10d"
        })
        return {
            accessToken ,
            refreshToken
        }
    }
}
