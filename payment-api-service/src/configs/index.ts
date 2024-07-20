import { Kafka, KafkaConfig, logLevel } from "kafkajs";

const kafkaConfig: KafkaConfig = {
  clientId: "payment-service",
  brokers: ["localhost:9092"],
  connectionTimeout: 3000,
  requestTimeout: 25000,
};

const kafka = new Kafka(kafkaConfig);

export { kafka };