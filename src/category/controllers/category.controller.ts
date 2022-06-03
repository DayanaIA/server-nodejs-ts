import { CategoryMessage } from '../category.message';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryService } from '../services/category.service';
import { Request, Response } from "express";

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {

    }
    async getCategories(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategories();
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryById(id);
            if (data) return this.httpResponse.Ok(res, data);
            return this.httpResponse.NotFound(res, CategoryMessage.NOT_FOUND);
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async createCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, CategoryMessage.NOT_UPDATE)
            return this.httpResponse.Ok(res, CategoryMessage.UPDATED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            if (!data.affected) return this.httpResponse.NotFound(res, CategoryMessage.NOT_DELETE)
            return this.httpResponse.Ok(res, CategoryMessage.DELETED)
        } catch (error) {
            console.log(error)
            return this.httpResponse.Error(res)
        }
    }
}