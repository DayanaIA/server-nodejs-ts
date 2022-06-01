import { CustomerService } from './../service/customer.service';
import { Request, Response } from "express";

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService()
    ) {

    }
    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async getCustomerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.findCustomerById(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async updateCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.updateCustomer(id, req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.deleteCustomer(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}