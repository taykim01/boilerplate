"use server";

import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import openai from "../infrastructures/open_ai";

export default class LLMRepository {
  async generateJSONResponse(
    messages: ChatCompletionMessageParam[]
  ): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      response_format: { type: "json_object" },
    });

    const response: string = chatCompletion.choices[0].message.content!;
    if (!response) throw new Error();

    return response;
  }

  async generateTextResponse(
    messages: ChatCompletionMessageParam[]
  ): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    const response: string = chatCompletion.choices[0].message.content!;
    if (!response) throw new Error();

    return response;
  }
}
