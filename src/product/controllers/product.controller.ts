import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductService } from '../services/product.service';
import { Request, Response } from "express";
import { HttpResponse } from '../../shared/response/http.response';
import { ProductMessage } from '../product.message';

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.productService.findProductById(id);
            if (data) return this.httpResponse.Ok(res, data)
            return this.httpResponse.NotFound(res, ProductMessage.NOT_FOUND)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.productService.updateProduct(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, ProductMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, ProductMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.productService.deleteProduct(id);
            if (!data.affected) return this.httpResponse.NotFound(res, ProductMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, ProductMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}