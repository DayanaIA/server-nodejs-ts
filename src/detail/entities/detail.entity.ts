import { ProductEntity } from './../../product/entities/product.entity';
import { PurchaseEntity } from './../../purchase/entities/purchase.entity';
import { CategoryEntity } from './../../category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: 'details' })
export class DetailEntity extends BaseEntity {
    @Column()
    quantityProduct!: string

    @Column()
    totalPrice!: number

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.details)
    @JoinColumn({ name: 'purchase_id' })
    purchase!: PurchaseEntity;

    @ManyToOne(() => ProductEntity, (product) => product.details)
    @JoinColumn({ name: 'product_id' })
    product!: ProductEntity;
}