import { NextFunction, Request, Response } from "express";
import userModel from "../models/user_model.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    // console.log(message);

    const user = await userModel.findById(res.locals.jwtData.id);
    // console.log(user, "he");

    if (!user)
      return res
        .status(401)
        .json({ message: "User not registerd or token expired" });
    //grab chats of the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    //send all chats with new one to the openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    //get the last response from API
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong", msg: error });
  }
};
