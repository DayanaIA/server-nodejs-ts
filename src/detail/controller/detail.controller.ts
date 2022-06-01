import { DetailService } from './../service/detail.service';
import { Request, Response } from "express";

export class DetailController {
    constructor(
        private readonly detailService: DetailService = new DetailService()
    ) {

    }
    async getDetails(req: Request, res: Response) {
        try {
            const data = await this.detailService.findAllDetails();
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async getDetailById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.detailService.findDetailById(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async createDetail(req: Request, res: Response) {
        try {
            const data = await this.detailService.createDetail(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async updateDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.detailService.updateDetail(id, req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.detailService.deleteDetail(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}