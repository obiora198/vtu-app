// webhooks/paystack.js
import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// raw body parser to verify signature
router.use(express.json({ verify: rawBodySaver }));

router.post('/', async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = req.headers['x-paystack-signature'];

  const hash = crypto
    .createHmac('sha512', secret)
    .update(req.rawBody)
    .digest('hex');

  if (hash !== signature) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body.event;
  if (event !== 'charge.success') return res.sendStatus(200);

  const data = req.body.data;
  const reference = data.reference;
  const email = data.customer.email;
  const amount = data.amount / 100;

  try {
    const existing = await Transaction.findOne({ reference });
    if (existing) return res.sendStatus(200); // already processed

    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(404);

    user.walletBalance += amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      amount,
      type: 'funding',
      reference,
      createdAt: new Date(),
    });

    return res.sendStatus(200);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.sendStatus(500);
  }
});

function rawBodySaver(req, res, buf) {
  req.rawBody = buf.toString();
}

export default router;
