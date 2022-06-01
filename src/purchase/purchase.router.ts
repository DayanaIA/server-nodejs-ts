import { PurchaseController } from './controller/purchase.controller';
import { BaseRouter } from '../shared/router/router';
export class PurchaseRouter extends BaseRouter<PurchaseController>{
    constructor() {
        super(PurchaseController);
    }
    routes(): void {
        this.router.get('/purchases', (req, res) => this.controller.getPurchases(req, res))
        this.router.get('/purchase/:id', (req, res) => this.controller.getPurchaseById(req, res))
        this.router.post('/create-purchase', (req, res) => this.controller.createPurchase(req, res))
        this.router.put('/update-purchase/:id', (req, res) => this.controller.updatePurchase(req, res))
        this.router.delete('/delete-purchase/:id', (req, res) => this.controller.deletePurchase(req, res))
    }
}