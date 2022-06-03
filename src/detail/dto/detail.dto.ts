import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from '../../product/entities/product.entity';
import { PurchaseEntity } from '../../purchase/entities/purchase.entity';
import { BaseDTO } from './../../config/base.dto';
export class DetailDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number

    @IsNotEmpty()
    purchase!: PurchaseEntity

    @IsNotEmpty()
    product!: ProductEntity
}