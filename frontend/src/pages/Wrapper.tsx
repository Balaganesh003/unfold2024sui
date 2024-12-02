import Navbar from "../components/Navbar";
import { WrapperCard } from "../components/WrapperCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  fetchAccountAge,
  fetchBalance,
  fetchNoOfTransactions,
  fetchNumberOfContracts,
  fetchTotalVolume,
  fetchUniqueCounterParties,
} from "../scripts/data";

export default function WrapperPage({ walletId, setWalletId }) {
  const [statsData, setStatsData] = useState({
    accountAge: 0,
    balance: 0,
    noOfTransactions: 0,
    numberOfContracts: 0,
    totalVolume: 0,
    uniqueCounterParties: 0,
    summary: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const account = useCurrentAccount();

  useEffect(() => {
    if (!walletId && account) {
      setWalletId(account.address); // Set walletId asynchronously
    }
  }, [walletId, account, setWalletId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!walletId) return;

      setIsLoading(true); // Start loading animation

      try {
        const [
          accountAge,
          balance,
          noOfTransactions,
          numberOfContracts,
          totalVolume,
          uniqueCounterParties,
        ] = await Promise.all([
          fetchAccountAge(walletId),
          fetchBalance(walletId),
          fetchNoOfTransactions(walletId),
          fetchNumberOfContracts(walletId),
          fetchTotalVolume(walletId),
          fetchUniqueCounterParties(walletId),
        ]);

        setStatsData({
          accountAge: Math.floor(accountAge * 1000),
          balance: Number(balance.totalBalance) / 1_000_000_000,
          noOfTransactions,
          numberOfContracts,
          totalVolume,
          uniqueCounterParties,
          summary: "", // Initialize summary
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading animation
      }
    };

    fetchData();
  }, [walletId]);

  const getReputation = async () => {
    try {
      const response = await axios.post(
        "https://suicred.onrender.com/update_data",
        {
          account_data: statsData, // Properly nest the data
        },
      );

      const data = response.data;

      setStatsData((prev) => ({
        ...prev,
        summary: data.summary, // Update summary
      }));
    } catch (error) {
      console.error("Error fetching reputation:", error);
    }
  };

  useEffect(() => {
    if (statsData.balance > 0) {
      getReputation();
    }
  }, [statsData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800">
      <Navbar />
      <main className="container mx-auto px-6 pt-24">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-center mb-14 text-gray-200"
          >
            Your Web3 Wrapped
          </motion.h1>
        </div>
        <WrapperCard statsData={statsData} isLoading={isLoading} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 text-gray-400"
        >
          Discover your impact on the Sui network over the past year.
        </motion.p>
      </main>
    </div>
  );
}
