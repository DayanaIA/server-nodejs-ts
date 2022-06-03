import { CustomerDTO } from './../dto/customer.dto';
import { HttpResponse } from './../../shared/response/http.response';
import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';

export class CustomerMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {

    }
    customerValidator(req: Request, res: Response, next: NextFunction) {
        const { address, dni, user } = req.body
        const valid = new CustomerDTO()
        valid.address = address
        valid.dni = dni
        valid.user = user
        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.Error(res)
            } else {
                next()
            }
        })
    }
}