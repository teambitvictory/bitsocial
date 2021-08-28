import { Kafka } from 'kafkajs';
import { createUser } from '../lib/services/UserService.mjs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: ['localhost:29092'],
});

const initKafkaConsumers = async () => {
  const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: 'USER_UPDATE', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const body = JSON.parse(message.value.toString());
      if (topic === 'USER_UPDATE' && body.updateType === 'USER_CREATED') {
        const userId = body.user.id;
        createUser(userId);
      }
    },
  });
};

export default initKafkaConsumers;
