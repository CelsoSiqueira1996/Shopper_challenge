import express from 'express';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import error404 from './middlewares/error404';

const app = express();

routes(app);
app.use(error404);
app.use(errorHandler);

export default app;