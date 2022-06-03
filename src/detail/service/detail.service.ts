import { ProductService } from './../../product/service/product.service';
import { DetailDTO } from './../dto/detail.dto';
import { DetailEntity } from './../entities/detail.entity';
import { BaseService } from './../../config/base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
export class DetailService extends BaseService<DetailEntity> {
    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {
        super(DetailEntity);
    }

    async findAllDetails(): Promise<DetailEntity[]> {
        return (await this.execRepository).find();
    }
    async findDetailById(id: string): Promise<DetailEntity | null> {
        return (await this.execRepository).findOneBy({ id })
    }
    async createDetail(body: DetailDTO): Promise<DetailEntity> {
        const newDetail = (await this.execRepository).create(body);
        const product = await this.productService.findProductById(newDetail.product.id)
        newDetail.totalPrice = product!.price * newDetail.quantityProduct
        return (await this.execRepository).save(newDetail)
    }
    async deleteDetail(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id })
    }
    async updateDetail(id: string, infoUpdate: any): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
}