import { Message } from "amqplib";

export const onMessage = (message: Message | null) => {
  if (!message) {
    return;
  }

  const event = message.content.toString();
  console.log(event);
};
