import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import Mentor from '../models/Mentor.model.js'
const router = express.Router();

router.post("/users", getUsersForSidebar);
router.get("/:id", getMessages);

router.post("/send/:id", sendMessage);

const badgeCriteria = [
  { articles: 1, title: "First Article", description: "Congratulations on writing your first article!" },
  { articles: 2, title: "Second Article", description: "Great job on writing your second article!" },
  { articles: 5, title: "Five Articles", description: "You've written five articles!" },
  { articles: 10, title: "Ten Articles", description: "Ten articles written, keep it up!" },
  { articles: 20, title: "Twenty Articles", description: "Twenty articles, impressive!" },
  { articles: 50, title: "Fifty Articles", description: "Fifty articles, amazing work!" },
  { articles: 100, title: "Hundred Articles", description: "Hundred articles, you're a master!" }
]

router.post('/award-badges', async (req, res) => {
  const { authorId } = req.body
  try {
    const mentor = await Mentor.findById(authorId)
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" })
    }

    const articlesWritten = mentor.articles.length
    let badge = null

    for (let i = badgeCriteria.length - 1; i >= 0; i--) {
      if (articlesWritten >= badgeCriteria[i].articles) {
        badge = badgeCriteria[i]
        break
      }
    }

    if (badge) {
      const existingBadge = mentor.badges.find(b => b.name === badge.title);
      if (!existingBadge) {
        mentor.badges.push({
          name: badge.title,
          description: badge.description
        });
        await mentor.save()
        return res.json({ message: "Badge awarded", badge: mentor.badges })
      }
    }

    res.json({ message: "No new badge awarded" })
  } catch (error) {
    console.error("Error awarding badges:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

export default router;