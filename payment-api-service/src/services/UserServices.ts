import ValidationException from "../middleware/ValidationException";
import prismaClient from "../prisma";

interface Users {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    balance: number;
};


class UserServices {
    async post({ firstName, lastName, email, cpf, balance }: Users) {
        try {
            if (email == '' || !email.includes('@')) throw new ValidationException('email invalid');
            if (cpf == '') throw new ValidationException('please enter your cpf');

            const emailAlreadyRegistered = await prismaClient.users.findFirst({
                where: {
                    email: email
                }
            });

            const cpfAlreadyRegistered = await prismaClient.users.findFirst({
                where: {
                    cpf: cpf
                }
            });

            if (cpfAlreadyRegistered) throw new ValidationException('cpf already registered');
            if (emailAlreadyRegistered) throw new ValidationException('email already registered');

            const createUser = await prismaClient.users.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    cpf: cpf,
                    balance: balance
                },
                select: {
                    id: true,
                    firstName: true,
                    email: true,
                    balance: true
                }
            });

            return createUser;
        }
        catch (error) {
            if (error instanceof ValidationException) {
                throw error.message
            }
        }
    }

    async listUsers() {
        const list = await prismaClient.users.findMany({
            select: {
                firstName: true,
                lastName: true,
                cpf: true,
                balance: true
            }
        });

        return list;
    }
};

export { UserServices };