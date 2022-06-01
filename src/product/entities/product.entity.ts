import { DetailEntity } from './../../detail/entities/detail.entity';
import { CategoryEntity } from './../../category/entities/category.entity';
import { Column, Double, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string

    @Column()
    description!: string

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    price!: number

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryEntity;

    @OneToMany(() => DetailEntity, (detail) => detail.product)
    details!: DetailEntity[];
}