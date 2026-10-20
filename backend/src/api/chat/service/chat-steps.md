
# 🚀 AI Chat Request Flow (የስራ ሂደቶች ቅደም ተከተል)

በ `createConversationService` ውስጥ የሚከናወኑ 6 ዋና ዋና ደረጃዎች፡

1. **select history 100/50**
   - የቆዩ የውይይት ታሪኮችን ከ MySQL Database (`conversations` table) ማውጣት።

2. **save new question**
   - የተጠቃሚውን አዲስ ጥያቄ በ Database ውስጥ መመዝገብ (`role: 'user'`)።

3. **prompt + context**
   - የተጠቃሚውን አዲስ ጥያቄ እና ከ DB የወጣውን የቆየ ታሪክ አቀናጅቶ ለ Gemini በሚመች Format ማዘጋጀት።

4. **model request**
   - የተዘጋጀውን ታሪክና ጥያቄ ወደ Gemini API (`chat.sendMessage`) መላክ።

5. **Ai response db save**
   - ከ Gemini የተመለሰውን መልስ እና የ Token ብዛት በ Database ውስጥ መመዝገብ (`role: 'assistant'`)።

6. **response**
   - የገቡትን መልእክቶች ሙሉ መረጃ ከ DB አውጥቶ በ JSON መልስ መልክ ወደ Controller/Frontend መላክ።