import { DetailDTO } from './../dto/detail.dto';
import { DetailEntity } from './../entities/detail.entity';
import { BaseService } from './../../config/base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
export class DetailService extends BaseService<DetailEntity> {
    constructor() {
        super(DetailEntity);
    }

    async findAllDetails(): Promise<DetailEntity[]> {
        return (await this.execRepository).find();
    }
    async findDetailById(id: string): Promise<DetailEntity | null> {
        return (await this.execRepository).findOne({ where: { id } })
    }
    async createDetail(body: DetailDTO): Promise<DetailEntity> {
        return (await this.execRepository).save(body)
    }
    async deleteDetail(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updateDetail(id: string, infoUpdate: any): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
}