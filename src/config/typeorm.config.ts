import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
    constructor ( private configServise : ConfigService){}
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type : "postgres",
            port : this.configServise.get("Db.port"),
            host : this.configServise.get("Db.host"),
            username : this.configServise.get("Db.username"),
            password : this.configServise.get("Db.password"),
            database : this.configServise.get("Db.database"),
            synchronize : true ,
            autoLoadEntities : false , 
            entities : [
                "dist/**/**/**/*.entity.{js,ts}"
            ]
        }
    }
}