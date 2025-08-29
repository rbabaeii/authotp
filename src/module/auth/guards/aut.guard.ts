import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const httpContext = context.switchToHttp()
        const request : Request = httpContext.getRequest<Request>()
        const {authorization} = request.headers
        if(!authorization || authorization.trim()== "")
            {throw new UnauthorizedException("first login to your account")}
        const [bearer , token] = authorization.split(" ")
        if (bearer.toLowerCase() !== "bearer" || !token || !isJWT(token))
            {throw new UnauthorizedException("first login to your account")}
        }
    
}