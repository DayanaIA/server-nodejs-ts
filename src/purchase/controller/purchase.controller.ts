import { DeleteResult, UpdateResult } from 'typeorm';
import { PurchaseService } from './../service/purchse.service';
import { Request, Response } from "express";
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseMessage } from '../purchase.message';

export class PurchaseController {
    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchases();
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getPurchaseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.purchaseService.findPurchaseById(id);
            if (data) return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, PurchaseMessage.NOT_FOUND)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updatePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.purchaseService.updatePurchase(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, PurchaseMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, PurchaseMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deletePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseService.deletePurchase(id);
            if (!data.affected) return this.httpResponse.NotFound(res, PurchaseMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, PurchaseMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}