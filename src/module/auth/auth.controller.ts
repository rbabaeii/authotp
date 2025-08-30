import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { checkOTPDto, sendOTPDto } from './dto/auth.dto';
import { AuthGuard } from './guards/aut.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/send-otp")
  sendOTP(@Body() otpDto : sendOTPDto){
    return this.authService.sendOtp(otpDto)
  }
  @Post("/check-otp")
  checkOTP(@Body() checkotp : checkOTPDto ){
    return this.authService.checkOtp(checkotp)
  }
}
