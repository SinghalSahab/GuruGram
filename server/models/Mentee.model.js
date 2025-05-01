import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const menteeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Dr. Emily Chen" },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    dob: { type: Date },
    avatar: { type: String, default: "https://avatar.iran.liara.run/public/boy" }, // For profile picture
    bio: { type: String, default: "Experienced software engineer with a passion for mentoring. Specialized in distributed systems and machine learning. Committed to helping the next generation of developers excel in their careers." },
    socialLinks: { type: [String], default: [] },
    interests: { type: [String], default: ["Reading"] },
    readArticles: { type: [mongoose.Schema.Types.ObjectId], ref: "Article", default: [] },
    lastRead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
    location: { type: String, default: "New York, NY" },
    occupation: { type: String, default: "Senior Software Engineer" },
    education: { type: String, default: "Ph.D. in Computer Science" },
    skills: {
      type: [
        {
          name: { type: String },
          level: { type: Number }
        }
      ],
      default: [
        { name: "Python", level: 95 },
        { name: "Machine Learning", level: 90 },
        { name: "Distributed Systems", level: 85 },
        { name: "System Design", level: 88 },
      ]
    },
    goals: { type: [String], default: ["Engeeering"] }
  },
  { timestamps: true }
);

menteeSchema.pre("save", async function (next) 
{
  if(this.password === undefined || this.password.length==0) this.password= "GooGleAuthAccount";
  if (!this.isModified("password"))
    next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

menteeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Mentee", menteeSchema);