import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from './../../shared/response/http.response';
import { UserService } from './../service/user.service';
import { Request, Response } from "express";
import { UserMessage } from '../user.message';

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUsers();
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id);
            if (data) return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, UserMessage.NOT_FOUND)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.userService.updateUser(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, UserMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, UserMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.userService.deleteUser(id);
            if (!data.affected) return this.httpResponse.NotFound(res, UserMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, UserMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}