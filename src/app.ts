import express, { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import connectDB from "./config/db.config";
import userModel from "./models/user.model";
import jwt from "jsonwebtoken";
import config from "./config";
import cors from "cors";

const app = express();
app.use(cors());
const port: Number = Number(process.env.PORT) || 8080;

// middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

/**
 * @POST /api/v1/register
 * @DESC Register new user account
 */
app.post("/api/v1/register", async (req: Request, res: Response) => {
  const { email, firstname, lastname, password } = req.body;

  try {
    const user = new userModel({
      firstname,
      lastname,
      email,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    const dbResponse = await user.save();

    res.json({
      status: "success",
      data: dbResponse,
      message: "Your account has been created successfully!",
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @POST /api/login
 * @DESC Authenticate a user and return token
 */
app.post("/api/v1/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid login details provided.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (!passwordMatch) {
      throw new Error("Invalid login details provided.");
    }

    const payload = {
      email,
      role: "user",
    };

    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      status: "success",
      data: token,
      message: "You've been logged in successfully!",
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log(`App listening on PORT:${port}`));
