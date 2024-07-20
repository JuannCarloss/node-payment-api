import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import errorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware";
import '../src/consumers/index'


const app = express();


app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.use('/api', router)
app.use(errorHandlingMiddleware)

app.listen(8081, () => { console.log('servidor online') });