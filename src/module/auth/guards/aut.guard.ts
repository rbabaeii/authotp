import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { endWith, Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authServise: AuthService) { }
    async canActivate(context: ExecutionContext){
        const httpContext = context.switchToHttp()
        const request: Request = httpContext.getRequest<Request>()
        console.log(request,'this is req1');

        const token = this.checktoken(request)
        request.user = await this.authServise.validateAccessToken(token)
        // console.log(request.user);
        return true
    }
    protected checktoken(request: Request) {
        console.log("this is req2");
        const { authorization } = request.headers
        if (!authorization || authorization.trim() == "") { throw new UnauthorizedException("first login to your account") }
        const [bearer, token] = authorization.split(" ")
        if (bearer.toLowerCase() !== "bearer" || !token || !isJWT(token)) { throw new UnauthorizedException("first login to your account") }
        return token
    }
}