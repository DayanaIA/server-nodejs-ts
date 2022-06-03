import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository!: Promise<Repository<T>>;
    
    constructor(private entity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(entity);
    }

    async initRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.initConnect;
        return getConn.getRepository(entity);
    }
}