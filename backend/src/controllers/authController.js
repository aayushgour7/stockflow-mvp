const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  Organization,
  User,
  Setting,
} = require("../models");

const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      organizationName,
    } = req.body;

    if (!email || !password || !organizationName) {
      return res.status(400).json({
        message: "Email, password and organization name are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await Organization.create({
      name: organizationName,
    });

    const user = await User.create({
      email,
      password: hashedPassword,
      organizationId: organization.id,
    });

    await Setting.create({
      organizationId: organization.id,
      defaultLowStockThreshold: 5,
    });

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: organization.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        organizationId: organization.id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  signup,
};