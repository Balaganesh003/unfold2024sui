import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ThreeDots } from 'react-loader-spinner';

export function WrapperCard({
  statsData,
  isLoading,
}: {
  statsData: {
    accountAge: number;
    balance: number;
    noOfTransactions: number;
    numberOfContracts: number;
    totalVolume: number;
    uniqueCounterParties: number;
    summary: string;
  };
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl p-12 shadow-2xl max-w-4xl w-full mx-auto text-white overflow-hidden relative"
    >
      {/* Top-right icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        className="absolute top-6 right-6 text-yellow-300"
      >
        <Sparkles size={32} />
      </motion.div>

      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
        Your Sui Wrapped Summary
      </h2>

      {/* Loading or Data */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <ThreeDots height="70" width="70" color="#ffffff" ariaLabel="loading" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 text-lg"
        >
          <p>
            <strong className="text-l text-gray-300">Wallet Age:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.accountAge} days</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Native Balance:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.balance.toFixed(2)} SUI</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Total Transactions:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.noOfTransactions}</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Deployed Contracts:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.numberOfContracts}</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Total Volume:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.totalVolume.toFixed(2)} SUI</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Unique Counterparties:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.uniqueCounterParties}</span>
          </p>
          <p>
            <strong className="text-l text-gray-300">Summary:</strong>{' '}
            <span className="text-xl text-gray-100">{statsData.summary}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
