import ValidationException from "../middleware/ValidationException";
import prismaClient from "../prisma"

interface Payments {
    amount: number,
    user_cpf: string
}

class PaymentService {
    async post({ amount, user_cpf }: Payments){
        try {const existingUser = await prismaClient.users.findUnique({
            where: {
                cpf: user_cpf
            }
        });

        if (!existingUser) {
            throw new ValidationException('user dosnt exists')
        }

        if (existingUser.balance < amount ) {
            throw new ValidationException('user dosnt have enough balance for this payment')
        }

        const save = await prismaClient.payment.create({
            data: {
            amount: amount,
            user_cpf: user_cpf
            }
        });

        const updateUser = await prismaClient.users.update({
            where: {
                cpf: user_cpf
            },
            data: {
                balance: {
                    decrement: amount
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