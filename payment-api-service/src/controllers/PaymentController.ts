import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";


class PaymentController {
    async post(req: Request, res: Response) {
        try {
            const { amount, userEmail } = req.body;

            const paymentService = new PaymentService();

            const save = await paymentService.post({
                amount,
                userEmail
            });

            res.status(201).json(save);
        }
        catch (e) {
            res.status(422).json(e)
        }

    }
}

export { PaymentController }