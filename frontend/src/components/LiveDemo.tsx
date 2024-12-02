import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LiveDemo() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Live Demo
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold mb-4">Reputation Score</h3>
            <div className="text-6xl font-bold text-blue-500 mb-4">85</div>
            <p className="text-gray-400">
              This user has a strong reputation based on consistent positive interactions and transactions on the Sui network.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-64 md:h-full"
          >
            <Image
              src="/placeholder.svg"
              alt="Example NFT"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

