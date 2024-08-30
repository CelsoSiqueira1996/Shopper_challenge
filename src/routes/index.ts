import bodyParser from 'body-parser';
import { Express } from 'express';
import readingRoutes from './readingRoutes';

const routes = (app: Express) => {
    app.route('/').get((req, res) => {
        res.status(200).send("API ShopperChallenge - Leitura consumo de água e gás.");
    })

    app.use(
        bodyParser.json(),
        readingRoutes
    );
}

export default routes;