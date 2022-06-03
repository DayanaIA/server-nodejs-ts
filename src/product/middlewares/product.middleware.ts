import { ProductDTO } from './../dto/product.dto';
import { HttpResponse } from './../../shared/response/http.response';
import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';

export class ProductMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {

    }
    productValidator(req: Request, res: Response, next: NextFunction) {
        const { productName, description, price, category } = req.body
        const valid = new ProductDTO()
        valid.productName = productName
        valid.description = description
        valid.price = price
        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.Error(res)
            } else {
                next()
            }
        })
    }
}