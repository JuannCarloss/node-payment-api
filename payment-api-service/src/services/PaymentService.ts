import ValidationException from "../middleware/ValidationException";
import prismaClient from "../prisma"

interface Payments {
    amount: number,
    userEmail: string
}

class PaymentService {
    async post(data: Payments){
        try {const existingUser = await prismaClient.users.findFirst({
            where: {
                email: data.userEmail
            }
        });

        if (!existingUser) {
            throw new ValidationException('user doesnt exists')
        }

        if (existingUser.balance < data.amount ) {
            throw new ValidationException('user doesnt have enough balance for this payment')
        }

        const save = await prismaClient.payment.create({
            data: {
            amount: data.amount,
            userEmail: data.userEmail
            }
        });

        const updateUser = await prismaClient.users.update({
            where: {
                email: data.userEmail
            },
            data: {
                balance: {
                    decrement: data.amount
                }
            }
        });

        return save;}
        catch (e){
            if (e instanceof ValidationException){
               throw e.message
            }
        }
        
    }
}

export { PaymentService }