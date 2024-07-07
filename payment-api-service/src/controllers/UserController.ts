import {Request, Response} from 'express';
import { UserServices } from '../services/UserServices';

class UserController {
    async post(req: Request, res: Response) {
        const { firstName, lastName, email, cpf, balance } = req.body;

        const userService = new UserServices();

        try{const save = await userService.post({
            firstName, 
            lastName, 
            email,
            cpf, 
            balance
        });
        res.status(201).json(save);}
        catch(e){
            res.status(422).json(e)
        }
    }

    async findAll(req: Request, res: Response) {
        const userSerice = new UserServices();

        const list = await userSerice.listUsers();

        if(list == null) {
            res.status(204)
        }

        res.status(200).json(list)
    }
}

export {UserController};