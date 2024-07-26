import { kafkaConsumer } from "../configs/kafka.consumer";
import { PaymentService } from "../services/PaymentService";

type PaymentMessage = {
    userEmail: string;
    amount: number;
};

export async function paymentConsumer() {
    const consumer = await kafkaConsumer("payment");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const toString = message.value!.toString();
            const payment = JSON.parse(toString) as PaymentMessage;

            console.log(payment);
            

            const paymentService = new PaymentService();

            await paymentService.post(payment);
    }});
}

paymentConsumer();