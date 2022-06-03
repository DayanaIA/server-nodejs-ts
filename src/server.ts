import { DetailRouter } from './detail/detail.router';
import { PurchaseRouter } from './purchase/purchase.router';
import { ProductRouter } from './product/product.router';
import { CustomerRouter } from './customer/customer.router';
import { CategoryRouter } from './category/category.router';
import { UserRouter } from './user/user.router';
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { ConfigServer } from "./config/config";
import { DataSource } from 'typeorm';

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8084;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new PurchaseRouter().router,
            new DetailRouter().router,
        ];
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => console.log('DB connection sucess.'))
            .catch(() => console.log('DB connection error.'))
    }

    public listen() {
        this.app.listen(this.port, () => console.log('Server listening on port ' + this.port))
    }
}

new ServerBootstrap();