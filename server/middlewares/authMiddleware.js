import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  
  //const token = req.header("Authorization")?.split(" ")[1] || req.header("x-auth-token") || req.cookies.token;
  console.log("Protect middleware");
  // console.log("Token:", token);
  // //if (!token) {
  //   return res.status(401).json({ message: "No token, authorization denied" });
  // }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET is not defined" });
  
  }

  try {
    const decoded = 1
    //jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

export { protect };
