import { DetailEntity } from './../../detail/entities/detail.entity';
import { CustomerEntity } from './../../customer/entities/customer.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: 'purchases' })
export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string

    @Column()
    paymentMethod!: string

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer!: CustomerEntity;

    @OneToMany(() => DetailEntity, (detail) => detail.purchase)
    details!: DetailEntity[];
}