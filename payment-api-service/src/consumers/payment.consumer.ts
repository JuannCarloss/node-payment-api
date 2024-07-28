import { kafkaConsumer } from "../configs/kafka.consumer";
import { KafkaSendMessage } from "../configs/kafka.producer";
import ValidationException from "../middleware/ValidationException";
import { PaymentService } from "../services/PaymentService";

interface Payment {
    userEmail: string;
    amount: number;
};

type Message = {
    email: string;
    date: string;
    amount: number;
}

interface PaymentResponse {
    email: string;
    status: string;
    date: string;
    total: number;
}

function NewResponse(email: string, status: string, date: string, amount: number): PaymentResponse {
    var response: PaymentResponse = {
        email: email,
        status: status,
        date: date,
        total: amount
    };
    return response;
}

export async function paymentConsumer() {
    const consumer = await kafkaConsumer("payment");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const toString = message.value!.toString();
            const messages = JSON.parse(toString) as Message;

            var payment: Payment = {
                userEmail: messages.email,
                amount: messages.amount
            }

            const paymentService = new PaymentService();
            const response = new KafkaSendMessage();
            try {
                await paymentService.post(payment);
                await response.execute(NewResponse(messages.email, "SUCCESSFUL_PAYMENT", messages.date, payment.amount))
            }catch(e){
                if (e){
                    await response.execute(NewResponse(messages.email, "UNSUCCESSFUL_PAYMENT", messages.date, payment.amount))
                }
            }
            
        }
    });
}

paymentConsumer();