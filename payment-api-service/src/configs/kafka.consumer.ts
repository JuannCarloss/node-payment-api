import { kafka } from ".";

export const kafkaConsumer = async (topic: string) => {
    const consumer = kafka.consumer({ groupId: "payment-app", readUncommitted: false});

    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning: true });

    return consumer;
};