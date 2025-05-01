import Mentor from "../models/Mentor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { sendMail } from "../utils/mail.util.js";

async function createMentor(data) {
  try {
    const newMentor = new Mentor({
      name: data.name,
      email: data.email,
      password: data.password,
      dob: data.dob,
      avatar: data.avatar || "https://avatar.iran.liara.run/public/boy",
      bio: data.bio,
      socialLinks: data.socialLinks,
      points: data.points || 100,
      badges: data.badges,
      interests: data.interests || ["Reading"],
      articles: data.articles,
      readArticles: data.readArticles || [],
      lastRead: data.lastRead,
      location: data.location,
      occupation: data.occupation,
      education: data.education,
      skills: data.skills,
      specialties: data.specialties,
      rating: 4.9,
      totalMentees: data.totalMentees,
    });

    await newMentor.save();
    await sendMail(data.name, data.email, 'CreateAccount');
    return { success: true, message: "Mentor created successfully" };
  } 
  catch (error) 
  {
    return { success: false, message: `Error while creating mentor ${error}` };
  }
}

async function findMentor(id) {
  try{
  const mentor = await Mentor.findById(id)
  .populate('articles')
  .populate('readArticles')
  .populate('lastRead')
  .populate('socialLinks')
  .populate('skills')
  .populate('specialties');
    return mentor;
  } catch (error) {
    return null;
  }
}

async function updateMentor(data) 
{
  console.log(data);
  try 
  {
    let result = await Mentor.findByIdAndUpdate(data._id, data);
    console.log(result);
    return { success: true, message: "Mentor updated successfully" };
  } 
  catch (error) 
  {
    return { success: false, message: `Error while updating mentor ${error}` };
  }
}
async function updateRating(data) {
  console.log("Received data for updating rating:", data);
  try {
    const mentor = await Mentor.findById(data._id);
    if (!mentor) {
      console.log("Mentor not found");
      return { success: false, message: "Mentor not found" };
    }

    mentor.rating = (mentor.rating+data.rating)/ 2;
    await mentor.save();
    console.log("Mentor rating updated successfully:", mentor);
    return { success: true, message: "Mentor rating updated successfully" };
  } catch (error) {
    console.log("Error while updating mentor rating:", error);
    return { success: false, message: `Error while updating mentor rating ${error}` };
  }
}

async function loginMentor(data) {
  try 
  {
    const { email, password } = data;
    const mentor = await Mentor.findOne({ email }).select("+password");
    if (!mentor) 
    {
      return { success: false, message: "Mentor not found" };
    }
    const isRight = await bcrypt.compare(password, mentor.password);
    if (!isRight) 
    {
      return { success: false, message: "Invalid credentials" };
    }
    const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = mentor;
    
    await sendMail(data.name, data.email, 'Login');
    return { success: true, token, rest};
  }
  catch (error) 
  {
    return { success: false, message: `Error while logging in ${error}` };
  }
}

const client = new OAuth2Client(process.env.client_id);

async function googleLogin(token) 
{
  try 
  {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.client_id,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;

    let mentor = await Mentor.findOne({ email });
    if (!mentor) 
    {
      mentor = new Mentor({
        name,
        email,
        avatar,
        password: "GooGleAuthAccount",
      });
      await sendMail(name, email, 'CreateAccount');   
      await mentor.save();
    }

    const jwtToken = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    const { ...mentorWithoutPassword } = mentor.toObject();
    await sendMail(name, email, 'Login');
    return { success: true, token: jwtToken, mentor: mentorWithoutPassword };
  } catch (error) {
    return { success: false, message: "Error during Google login" };
  }
}

function findMentorByEmail(email) 
{
  return Mentor.findOne({ email});
}

async function insertBulk(data)
{
  const results = [];
  for (const mentorData of data) {
    const result = await createMentor(mentorData);
    results.push(result);
  }
  return results;
}

 async function getMentorDetails(req, res){
  try {
    const mentorId = req.params.id;
    const mentor = await Mentor.findById(mentorId).populate('articles').populate('skills').populate('specialties');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const articlesCount = mentor.articles.length;
    const skillsCount = mentor.skills.length;
    const specialtiesCount = mentor.specialties.length;

    res.json({ articlesCount, skillsCount, specialtiesCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { createMentor,getMentorDetails, findMentor, updateMentor, loginMentor, googleLogin, findMentorByEmail, insertBulk, updateRating };