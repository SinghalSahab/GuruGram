import express from "express";
import { OAuth2Client } from "google-auth-library";
import { upload } from "../middlewares/multer.js";
import uploadImage from "../utils/uploadImage.js";
import { createMentor,getMentorDetails, findMentor, updateMentor, loginMentor, googleLogin, findMentorByEmail, insertBulk, updateRating } from "../controllers/mentor.controllers.js";
import Mentor from "../models/Mentor.model.js";


const router = express.Router();

router.post("/addMentor", async (req, res) => {
  let result = await createMentor(req.body);
  if (result.success) 
    res.status(201).send(result);
  else
    res.status(400).send(result);
});

router.post("/addMentor/bulk", async (req, res) => {
  let result = await insertBulk(req.body);
  if (result.success) 
    res.status(201).send(result);
  else
    res.status(400).send(result);
});

router.post("/login", async (req, res) => {
  let result = await loginMentor(req.body);
  if (result.success) 
    res.status(200).send(result);
  else
    res.status(404).send({message: "Mentor not found"});
});

router.post("/updateMentor", async (req, res) => {
  console.log("Updating mentor:", req.body);
  let result = await updateMentor(req.body);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(400).send(result);
  }
});
router.post("/updateRating", async (req, res) => {
  console.log("Updating rating:", req.body);
  let result = await updateRating(req.body);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(400).send(result);
  }
});

router.get("/:id", async (req, res) => {
  let foundMentor = await findMentor(req.params.id);
  res.send(foundMentor);
});

router.get("/email/:email", async (req, res) => {
  let foundMentor = await findMentorByEmail(req.params.email);
  res.send(foundMentor);
});

router.post("/reading", async (req, res) => {
  let foundMentor = await Mentor.findById(req.body.mentorId);
  const articleId = req.body.articleId;
  foundMentor.readArticles = [...new Set([...foundMentor?.readArticles || [], articleId])];
  foundMentor.lastRead = articleId;
  await foundMentor.save();
  res.send({ success: true, message: "Article added to reading list" });
});

router.post("/:id/uploadAvatar", upload.single("image"), async (req, res) => {
  try {
    const mentorId = req.params.id;
    const foundMentor = await findMentor(mentorId);
    if (!foundMentor || !req.file) 
      return res.status(404).send({ success: false, message: "Not found" });
    foundMentor.avatar = await uploadImage(`uploads/${req.params.id}_${req.file.originalname}`, req.params.id);
    await updateMentor(foundMentor);
    res.status(200).send({success: true, message: "Avatar uploaded successfully", newAvatar: foundMentor.avatar});
  } 
  catch (error) {
    res.status(500).send({ success: false, message: `Internal server error${error}`, });
  }
});

router.post("/google-login", async (req, res) => {
  console.log("Google login request:", req.body);
  const { token } = req.body;
  try {
    const googleResponse = await googleLogin(token);
    if (googleResponse.success)
      res.status(200).json(googleResponse); 
    else
      res.status(400).send({ message: `Invalid Google token. ${googleResponse}` });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(400).send("Invalid Google token.");
  }
});

router.get("/", async (req, res) => {
  console.log("Getting all mentors");
  const mentors = await Mentor.find({});
  res.send(mentors);
});


router.get('/:id/details', getMentorDetails);


export default router;
