import { DetailDTO } from './../dto/detail.dto';
import { HttpResponse } from './../../shared/response/http.response';
import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';

export class DetailMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {

    }
    detailValidator(req: Request, res: Response, next: NextFunction) {
        const { quantityProduct, purchase, product } = req.body
        const valid = new DetailDTO()
        valid.quantityProduct = quantityProduct
        valid.purchase = purchase
        valid.product = product
        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.Error(res)
            } else {
                next()
            }
        })
    }
}