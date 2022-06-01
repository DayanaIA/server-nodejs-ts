import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './../../config/base.dto';
export class DetailDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number

    @IsNotEmpty()
    totalPrice!: number
}