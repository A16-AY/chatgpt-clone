


import express from 'express';
import {
  createConversationController,
  getConversationsController,
} from './controller/chat.controller.js';

const router = express.Router();

//  (POST /api/chat)
router.post('/', createConversationController);

//  (GET /api/chat/conversations)
router.get('/conversations', getConversationsController);

export default router;