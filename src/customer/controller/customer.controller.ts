import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerService } from './../service/customer.service';
import { Request, Response } from "express";
import { HttpResponse } from '../../shared/response/http.response';
import { CustomerMessage } from '../customer.message';

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getCustomerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.findCustomerById(id);
            if (data) return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, CustomerMessage.NOT_FOUND)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updateCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.customerService.updateCustomer(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, CustomerMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, CustomerMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deleteCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.customerService.deleteCustomer(id);
            if (!data.affected) return this.httpResponse.NotFound(res, CustomerMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, CustomerMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}