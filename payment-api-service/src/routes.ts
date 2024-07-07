import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PaymentController } from "./controllers/PaymentController";


const router = Router();

//user routes
router.post('/users', new UserController().post);
router.get('/users', new UserController().findAll);

//payment routes
router.post('/payments', new PaymentController().post)

export {router}