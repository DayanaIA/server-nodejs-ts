import { HttpResponse } from '../../shared/response/http.response';
import { UserDTO } from '../dto/user.dto';
import { NextFunction, Request, Response } from "express";
import { validate } from 'class-validator';

export class UserMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {

    }
    userValidator(req: Request, res: Response, next: NextFunction) {
        const { name, lastname, username, email, password, role } = req.body
        const valid = new UserDTO()
        valid.name = name
        valid.lastname = lastname
        valid.username = username
        valid.email = email
        valid.password = password
        valid.role = role

        validate(valid).then((error) => {
            if (error.length > 0) {
                return this.httpResponse.Error(res)
            } else {
                next()
            }
        })
    }
}