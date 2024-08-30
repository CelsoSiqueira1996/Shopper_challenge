import 'dotenv/config';
import app from "./app";
import { env } from './env';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});