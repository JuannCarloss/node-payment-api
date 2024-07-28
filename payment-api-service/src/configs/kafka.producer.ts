import { kafka } from ".";


export class KafkaSendMessage {
    async execute(payload: any): Promise<void> {
        const producer = kafka.producer({
            allowAutoTopicCreation: true
        });

        await producer.connect();
        console.log("producer connected");
        
        
        await producer.send({
            topic: "order",
            messages: [{
                value: JSON.stringify(payload)
            }]
        });

        await producer.disconnect();
    }
}

export default KafkaSendMessage;