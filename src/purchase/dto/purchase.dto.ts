import { IsNotEmpty } from 'class-validator';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { BaseDTO } from './../../config/base.dto';
export class PurchaseDTO extends BaseDTO {
    @IsNotEmpty()
    status!: string

    @IsNotEmpty()
    paymentMethod!: string

    @IsNotEmpty()
    customer!: CustomerEntity
}