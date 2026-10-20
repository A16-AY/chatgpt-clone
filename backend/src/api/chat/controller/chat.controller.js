

import {
  createConversationService,
  getRecentConversationRows,
} from '../service/chat.service.js';


export async function createConversationController(req, res, next) {
  try {
    const { question } = req.body;
    const aiResponseText = await createConversationService(question);

    res.status(201).json({
      success: true, 
      data: {
        response: aiResponseText 
      },
    });
  } catch (error) {
    next(error);
  }
}


export async function getConversationsController(req, res, next) {
  try {
    const conversations = await getRecentConversationRows(100);

    res.status(200).json({
      success: true,
      data: {
        conversations: Array.isArray(conversations) ? conversations : [] 
      },
    });
  } catch (error) {
    next(error);
  }
}