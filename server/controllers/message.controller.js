import Mentor from "../models/Mentor.model.js";
import Mentee from "../models/Mentee.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../middlewares/socket.js";
//import cloudinary from "../lib/cloudinary";

// Fetch users excluding the logged-in user
export const getUsersForSidebar = async (req, res) => {
  console.log("here");
  try {
    console.log(req.headers);
    const loggedInUserId = req.headers["id"];
    const role = req.headers["role"];
    if (!loggedInUserId || !role) {
      console.log("Missing user ID or role in the request");
      return res.status(400).json({ error: "Missing user ID or role in the request" });
    }
    let filteredUsers;

    if (role === "mentor") {
      filteredUsers = await Mentee.find({ _id: { $ne: loggedInUserId } }).select("-password");
    } else if (role === "mentee") {
      filteredUsers = await Mentor.find({ _id: { $ne: loggedInUserId } }).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch messages between the logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    console.log("getMessages controller");
    const loggedInUserId = req.headers["id"];
    const role = req.headers["role"];
    if (!loggedInUserId || !role) {
      console.log("Missing user ID or role in the request");
      return res.status(400).json({ error: "Missing user ID or role in the request" });
    }
    const userToChatId = req.params.id; 
    const myId = loggedInUserId;
    
console.log("myId", myId, "userToChatId", userToChatId);
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const loggedInUserId = req.headers["id"];
    const role = req.headers["role"];

    if (!loggedInUserId || !role) {
      console.log("Missing user ID or role in the request");
      return res.status(400).json({ error: "Missing user ID or role in the request" });
    }

    console.log("sendMessage controller", receiverId, loggedInUserId, text);
    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      // const uploadResponse = await cloudinary.uploader.upload(image);
      // imageUrl = uploadResponse.secure_url;
      console.log("image");
    }

    const newMessage = new Message({
      senderId: loggedInUserId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
