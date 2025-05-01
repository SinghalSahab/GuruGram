import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./db/Connect.js";
import mentorRoutes from "./routes/mentor.routes.js";
import menteeRoutes from "./routes/mentee.routes.js";
import articleRoutes from "./routes/article.routes.js";
import { KJUR } from 'jsrsasign';
import { app, server } from "./middlewares/socket.js";

import messageRoutes from "./routes/message.routes.js";
import { inNumberArray, isBetween, isRequiredAllOrNone, validateRequest } from './validations.js';

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const propValidations = {
  role: inNumberArray([0, 1]),
  expirationSeconds: isBetween(1800, 172800)
};

const schemaValidations = [isRequiredAllOrNone(['meetingNumber', 'role'])];

const coerceRequestBody = (body) => ({
  ...body,
  ...['role', 'expirationSeconds'].reduce(
    (acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }),
    {}
  )
});

app.post('/generateSignature', (req, res) => {
  const requestBody = coerceRequestBody(req.body);
  const validationErrors = validateRequest(requestBody, propValidations, schemaValidations);

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const { meetingNumber, role, expirationSeconds } = requestBody;
  const iat = Math.floor(Date.now() / 1000);
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2;
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    appKey: process.env.ZOOM_MEETING_SDK_KEY,
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
    mn: meetingNumber,
    role,
    iat,
    exp,
    tokenExp: exp
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_MEETING_SDK_SECRET);
  return res.json({ signature: sdkJWT });
});

app.use("/api/mentor", mentorRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/messages", messageRoutes);


connect()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error.message));

export { app, server };
