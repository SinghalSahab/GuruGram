import express from "express";
import { OAuth2Client } from "google-auth-library";
import { upload } from "../middlewares/multer.js";
import uploadImage from "../utils/uploadImage.js";
import { createMentee, findMentee, updateMentee, loginMentee, googleLogin, findMenteeByEmail } from "../controllers/mentee.controllers.js";
import Mentee from "../models/Mentee.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Mentee");
});

router.post("/addMentee", async (req, res) => {
  console.log(req.body);
  let result = await createMentee(req.body);
  if (result.success) 
    res.status(201).send(result);
  else
    res.status(400).send(result);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let result = await loginMentee(req.body);
  if (result.success) 
    res.status(200).send(result);
  else
    res.status(404).send({message: "Mentee not found"});
});

router.put("/updateMentee", async (req, res) => {
  let result = await updateMentee(req.body);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(400).send(result);
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  let foundMentee = await findMentee(req.params.id);
  res.send(foundMentee);
});

router.get("/email/:email", async (req, res) => {
  let foundMentee = await findMenteeByEmail(req.params.email);
  res.send(foundMentee);
});

router.post("/reading", async (req, res) => {
  let foundMentee = await Mentee.findById(req.body.menteeId);
  const articleId = req.body.articleId;
  foundMentee.readArticles = [...new Set([...foundMentee?.readArticles || [], articleId])];
  foundMentee.lastRead = articleId;
  await foundMentee.save();
  res.send({ success: true, message: "Article added to reading list" });
});

router.post("/:id/uploadAvatar", upload.single("image"), async (req, res) => {
  try {
    const menteeId = req.params.id;
    const foundMentee = await findMentee(menteeId);
    if (!foundMentee || !req.file) 
      return res.status(404).send({ success: false, message: "Not found" });
    foundMentee.avatar = await uploadImage(`uploads/${req.params.id}_${req.file.originalname}`, req.params.id);
    await updateMentee(foundMentee);
    res.status(200).send({success: true, message: "Avatar uploaded successfully", newAvatar: foundMentee.avatar});
  } 
  catch (error) {
    res.status(500).send({ success: false, message: `Internal server error${error}`, });
  }
});

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const googleResponse = await googleLogin(token);
    console.log("Google login response:", googleResponse);
    if (googleResponse.success)
      res.status(200).json(googleResponse); 
    else
      res.status(400).send({ message: `Invalid Google token. ${googleResponse}` });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(400).send("Invalid Google token.");
  }
});

export default router;
