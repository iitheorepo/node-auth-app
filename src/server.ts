import { AppDataSource } from "./config/data-source";
import app from './app';

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch((error) => console.error(error));