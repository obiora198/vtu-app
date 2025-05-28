"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { ME, TRANSACTIONS } from "../../graphql/queries";
import { FUND_WALLET } from "../../graphql/mutations";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
};

export default function Dashboard() {
  const { data: meData } = useQuery(ME);
  const { data: txData } = useQuery(TRANSACTIONS);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [fundWallet] = useMutation(FUND_WALLET, {
    variables: { amount: parseFloat(amount) },
    refetchQueries: [{ query: ME }, { query: TRANSACTIONS }],
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
    setToken(token || "");
  }, [router]);

  if (!token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl mb-4">Welcome {meData?.me?.name}</h2>
        <p className="mb-4">
          Wallet Balance: ₦{meData?.me?.walletBalance.toFixed(2)}
        </p>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Amount to fund"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            className="bg-green-600 text-white px-4 py-2"
            onClick={() => fundWallet()}
          >
            Fund Wallet
          </button>
        </div>
        <h3 className="text-xl mb-2">Transactions</h3>
        <ul>
          {txData?.transactions.map((tx: Transaction) => (
            <li key={tx.id} className="border-b py-2">
              {tx.type} - ₦{tx.amount} -{" "}
              {new Date(tx.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
