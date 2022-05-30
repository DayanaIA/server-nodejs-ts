import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        })
    }

    public getEnvironment(key: string): string | undefined {
        return process.env[key]; //ex. process.env['PORT]
    }

    public getNumberEnv(key: string): number {
        return Number(this.getEnvironment(key));
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ['env'];
        if (path.length > 0) {
            const strtoArr = path.split('.')
            arrEnv.unshift(...strtoArr)
        }
        return '.' + arrEnv.join('.')
    }

    public get typeORMConfig(): DataSourceOptions {
        return {
            type: 'postgres',
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnvironment('DB_USER'),
            password: this.getEnvironment('DB_PASSWORD'),
            database: this.getEnvironment('DB_DATABASE'),
            entities: ['dist/**/*.entity{.ts,.js}'],// [__dirname + "/../**/*.entity{.ts, .js}"],
            migrations: [__dirname+"/../../migrations/*{.ts, .js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        }
    }
}