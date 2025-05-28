import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await User.findById(user.id);
    },
    transactions: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return Transaction.find({ user: user.id });
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already in use');
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed, walletBalance: 0 });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
    fundWallet: async (_, { amount }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const updated = await User.findByIdAndUpdate(
        user.id,
        { $inc: { walletBalance: amount } },
        { new: true }
      );
      await Transaction.create({ user: user.id, amount, type: 'funding' });
      return updated;
    },
  },
};

export default resolvers;