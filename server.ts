import 'dotenv/config';
import app from "./src/app";
import { env } from './src/env';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});