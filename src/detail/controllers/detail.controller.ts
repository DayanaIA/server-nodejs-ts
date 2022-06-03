import { DeleteResult, UpdateResult } from 'typeorm';
import { DetailService } from '../services/detail.service';
import { Request, Response } from "express";
import { HttpResponse } from '../../shared/response/http.response';
import { DetailMessage } from '../detail.message';

export class DetailController {
    constructor(
        private readonly detailService: DetailService = new DetailService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getDetails(req: Request, res: Response) {
        try {
            const data = await this.detailService.findAllDetails();
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getDetailById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.detailService.findDetailById(id);
            if (data) return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, DetailMessage.NOT_FOUND)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createDetail(req: Request, res: Response) {
        try {
            const data = await this.detailService.createDetail(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updateDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.detailService.updateDetail(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, DetailMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, DetailMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deleteDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.detailService.deleteDetail(id);
            if (!data.affected) return this.httpResponse.NotFound(res, DetailMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, DetailMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}