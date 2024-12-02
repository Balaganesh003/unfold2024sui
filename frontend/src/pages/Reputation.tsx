import Navbar from "../components/Navbar";
import { CircularProgress } from "../components/CircularProgress";
import { HighlightCard } from "../components/HighlightCard";
import { TokenRow } from "../components/TokenRow";
import { StatCard } from "../components/StatCard";
import {
  fetchAccountAge,
  fetchBalance,
  fetchNoOfTransactions,
  fetchNumberOfContracts,
  fetchTotalVolume,
  fetchUniqueCounterParties,
} from "../scripts/data";
import { useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import {
  useEnokiFlow,
  useZkLogin,
  useZkLoginSession,
} from "@mysten/enoki/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Transaction } from "@mysten/sui/transactions";
import {
  AlertCircle,
  Activity,
  DollarSign,
  TrendingDown,
  MinusCircle,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export default function ReputationPage({
  walletId,
  setWalletId,
}: {
  walletId: string;
  setWalletId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [statsData, setStatsData] = useState({
    accountAge: 0,
    balance: 0,
    noOfTransactions: 0,
    numberOfContracts: 0,
    totalVolume: 0,
    uniqueCounterParties: 0,
  });

  const [reputation, setReputation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const { address } = useZkLogin();

  useEffect(() => {
    if (!walletId && account) {
      setWalletId(account.address); // Update walletId asynchronously
    }
  }, [walletId, account, setWalletId]);

  useEffect(() => {
    if (walletId) {
      const fetchData = async () => {
        setLoading(true);
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
            accountAge,
            balance: Number(balance.totalBalance) / 1_000_000_000,
            noOfTransactions,
            numberOfContracts,
            totalVolume,
            uniqueCounterParties,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [walletId]);

  const testnet_reputation =
    "0x8bde90c7f3b2d139a44092afdbe4aa96b1f690976d6c2b25278daff51eb39e5e";

  const mintSuiReputation = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }
    console.log("Minting Reputation...");

    const tx = new Transaction();
    tx.moveCall({
      target: `${testnet_reputation}::reputation_card::mint_reputation`,
      arguments: [tx.pure.address(account.address), tx.pure.u64(Date.now())],
    });
    tx.setSender(address!);

    try {
      await signAndExecuteTransaction({
        transaction: tx as any,
        chain: "sui:testnet",
      });
      toast(
        <div
          onClick={() =>
            window.open(
              `https://suiscan.xyz/account/object/${account.address}`,
              "_blank",
            )
          }
        >
          Click to view Reputation on Suiscan
        </div>,
      );
      setIsMinted(true);
    } catch (error) {
      console.error("Error minting loyalty:", error);
    }
  };

  const getReputation = async () => {
    try {
      const response = await axios.post(
        "https://suicred.onrender.com/update_data",
        {
          account_data: statsData,
        },
      );

      const data = response.data;
      console.log(data.reputation_score);
      console.log(data.summary);
      setReputation(data.reputation_score);
    } catch (error) {
      console.error("Error fetching reputation:", error);
    }
  };

  useEffect(() => {
    if (statsData.balance > 0) {
      getReputation();
    }
  }, [statsData]);

  // Construct the stats array dynamically using statsData
  const stats = [
    {
      title: "Deployed contracts",
      description: "Amount of deployed smart-contracts",
      value: statsData.numberOfContracts,
      unit: "",
    },
    {
      title: "Native balance",
      description: "Wallet native token balance",
      value: statsData.balance,
      unit: "SUI",
    },

    {
      title: "Wallet turnover",
      description: "The movement of funds on the wallet",
      value: statsData.totalVolume,
      unit: "SUI",
    },
    {
      title: "Wallet turnover USD",
      description: "The movement of funds on the wallet",
      value: (statsData.totalVolume * 2000).toFixed(2), // Example USD conversion, adjust as needed
      unit: "USD",
    },

    {
      title: "Wallet age",
      description: "Wallet age (from the first transaction)",
      value: Math.floor(statsData.accountAge * 1000),
      unit: "days",
    },
    {
      title: "Total transactions",
      description: "Total transactions on wallet",
      value: statsData.noOfTransactions,
      unit: "",
    },
    {
      title: "Unique Counter Parties",
      description: "Unique Counter Parties on the wallet",
      value: statsData.uniqueCounterParties,
      unit: "",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white ">
      <Toaster />
      <Navbar />
      {!loading ? (
        <main className="container mx-auto px-4 pt-24 max-w-[1080px]">
          <section className="py-8">
            <h2 className="text-3xl font-bold mb-6">Highlights</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <HighlightCard
                title="Reputation Score"
                description="The overall Scroll score is 0.00/100"
                className="bg-red-900/20"
              >
                <CircularProgress value={reputation} maxValue={100} />
              </HighlightCard>
              <HighlightCard
                title="Little Activity"
                description="This wallet has total spendings of less than $1"
              >
                <div className="w-16 h-16 flex justify-center items-center rounded-full bg-gray-700">
                  <TrendingDown size={32} color="#e53e3e" />
                </div>
              </HighlightCard>

              <HighlightCard
                title="Mint Reputation"
                className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg"
              >
                <div className="h-16 flex items-center">
                  <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gray-200 rounded-full animate-pulse"
                      style={{ width: `${Math.round(Number(reputation))}%` }}
                    />
                  </div>
                  <div className="ml-4 text-sm text-white font-semibold">
                    <span>{reputation}% Active</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={mintSuiReputation}
                    className="text-gray-100 hover:text-white px-6 py-2 transition-all duration-200 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    Generate Reputation
                  </button>
                </div>
              </HighlightCard>
            </div>
          </section>

          <section className="py-8">
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-3xl font-bold">Tokens</h2>
              {/* <span className="text-green-400 text-2xl font-semibold">${statsData.balance * 2000}</span> */}
            </div>
            <div className="space-y-4">
              <TokenRow
                symbol="SUI"
                balance={statsData.balance}
                value={statsData.balance}
                iconUrl="/placeholder.svg"
              />
            </div>
          </section>

          <section className="py-8">
            <h2 className="text-3xl font-bold mb-6">Stats</h2>
            <div className="grid gap-6 md:grid-cols-2 ">
              {stats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  description={stat.description}
                  value={stat.value}
                  unit={stat.unit}
                />
              ))}
            </div>
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center h-full min-h-screen">
          <ThreeDots
            height="100"
            width="150"
            color="#ffffff"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
}
