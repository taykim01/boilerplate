import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import openai from "../infrastructures/open_ai";

export interface VisionMessageParam {
  role: "user" | "system" | "assistant";
  content: (
    | { type: "text"; text: string }
    | {
        type: "image_url";
        image_url: {
          url: string;
        };
      }
  )[];
}
[];

export default class LLMRepository {
  async generateResponse(
    messages: ChatCompletionMessageParam[],
    format: "json_object" | "text"
  ): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: messages,
      response_format: { type: format },
    });

    const response: string = chatCompletion.choices[0].message.content!;
    if (!response) throw new Error();

    return response;
  }

  async generateVisionResponse(
    messages: any[],
    format: "json_object" | "text"
  ): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      response_format: { type: format },
    });

    const response: string = chatCompletion.choices[0].message.content!;
    if (!response) throw new Error();

    return response;
  }
}
