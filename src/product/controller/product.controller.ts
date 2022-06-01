import { ProductService } from './../service/product.service';
import { Request, Response } from "express";

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService()
    ) {

    }
    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.productService.findProductById(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.productService.updateProduct(id, req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.productService.deleteProduct(id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}