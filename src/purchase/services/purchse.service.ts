import { PurchaseDTO } from '../dto/purchase.dto';
import { PurchaseEntity } from '../entities/purchase.entity';
import { BaseService } from '../../config/base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity);
    }

    async findAllPurchases(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find();
    }
    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }
    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity | undefined> {
        return (await this.execRepository).save(body)
    }
    async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updatePurchase(id: string, infoUpdate: any): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
}