import { DetailMiddleware } from './middlewares/detail.middleware';
import { DetailController } from './controllers/detail.controller';
import { BaseRouter } from '../shared/router/router';
export class DetailRouter extends BaseRouter<DetailController, DetailMiddleware>{
    constructor() {
        super(DetailController, DetailMiddleware);
    }
    routes(): void {
        this.router.get('/details', (req, res) => this.controller.getDetails(req, res))
        this.router.get('/detail/:id', (req, res) => this.controller.getDetailById(req, res))
        this.router.post('/create-detail',
            (req, res, next) => [this.middleware.detailValidator(req, res, next)],
            (req, res) => this.controller.createDetail(req, res)
        )
        this.router.put('/update-detail/:id', (req, res) => this.controller.updateDetail(req, res))
        this.router.delete('/delete-detail/:id', (req, res) => this.controller.deleteDetail(req, res))
    }
}