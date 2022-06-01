import { DetailController } from './controller/detail.controller';
import { BaseRouter } from '../shared/router/router';
export class DetailRouter extends BaseRouter<DetailController>{
    constructor() {
        super(DetailController);
    }
    routes(): void {
        this.router.get('/details', (req, res) => this.controller.getDetails(req, res))
        this.router.get('/detail/:id', (req, res) => this.controller.getDetailById(req, res))
        this.router.post('/create-detail', (req, res) => this.controller.createDetail(req, res))
        this.router.put('/update-detail/:id', (req, res) => this.controller.updateDetail(req, res))
        this.router.delete('/delete-detail/:id', (req, res) => this.controller.deleteDetail(req, res))
    }
}