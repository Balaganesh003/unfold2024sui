import { motion } from 'framer-motion'

export default function WhyItMatters() {
  return (
    <section className="py-20 sm:py-32 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why It Matters
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Empowering Trust in the Decentralized World</h3>
            <p className="text-gray-400 mb-4">
              On-chain reputation is crucial for the growth and adoption of DeFi, DAOs, and blockchain gaming. It provides a
              transparent and immutable record of a user's interactions, fostering trust and enabling new possibilities in the
              decentralized ecosystem.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
              "Blockchain-based reputation systems are the missing link in creating a truly trustless and efficient decentralized economy."
              <footer className="text-gray-400 mt-2">- Vitalik Buterin, Ethereum Co-founder</footer>
            </blockquote>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Key Statistics</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-4xl font-bold text-blue-500 mr-4">78%</span>
                <span className="text-gray-400">of DeFi users believe on-chain reputation will be crucial for future protocols</span>
              </li>
              <li className="flex items-center">
                <span className="text-4xl font-bold text-blue-500 mr-4">$2.5B</span>
                <span className="text-gray-400">Estimated market size for blockchain identity and reputation solutions by 2025</span>
              </li>
              <li className="flex items-center">
                <span className="text-4xl font-bold text-blue-500 mr-4">92%</span>
                <span className="text-gray-400">of DAO members want reputation-based voting systems</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

