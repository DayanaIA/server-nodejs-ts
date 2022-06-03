import { CategoryDTO } from './../dto/category.dto';
import { HttpResponse } from './../../shared/response/http.response';
import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';

export class CategoryMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {

    }
    categoryValidator(req: Request, res: Response, next: NextFunction) {
        const { categoryName } = req.body
        const valid = new CategoryDTO()
        valid.categoryName = categoryName
        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.Error(res)
            } else {
                next()
            }
        })
    }
}