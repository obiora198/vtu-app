import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await User.findById(user.id);
    },
    transactions: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return Transaction.find({ user: user.id });
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error("Email already in use");
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashed,
        walletBalance: 0,
      });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
    // fundWallet: async (_, { amount }, { user }) => {
    //   if (!user) throw new Error("Unauthorized");
    //   const updated = await User.findByIdAndUpdate(
    //     user.id,
    //     { $inc: { walletBalance: amount } },
    //     { new: true }
    //   );
    //   await Transaction.create({ user: user.id, amount, type: "funding" });
    //   return updated;
    // },
    verifyPayment: async (_, { reference }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      // 1. Check if the reference already exists
      const existingTx = await Transaction.findOne({ reference });
      if (existingTx) {
        throw new Error("This payment has already been processed.");
      }

      // 2. Verify with Paystack
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const paymentData = response.data.data;

      if (paymentData.status !== "success") {
        throw new Error("Payment verification failed");
      }

      const amount = paymentData.amount / 100;

      // 3. Credit wallet
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { $inc: { walletBalance: amount } },
        { new: true }
      );

      // 4. Save transaction with reference
      await Transaction.create({
        user: user.id,
        amount,
        type: "funding",
        reference,
        createdAt: new Date(),
      });

      return updatedUser;
    },
  },
};

export default resolvers;
