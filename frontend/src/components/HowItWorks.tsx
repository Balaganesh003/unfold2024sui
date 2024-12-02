import { motion } from 'framer-motion';
import { Wallet, BarChart2, Award } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Securely link your Sui wallet to our platform.'
  },
  {
    icon: BarChart2,
    title: 'Analyze Your Activity',
    description: 'We analyze your on-chain transactions and interactions.'
  },
  {
    icon: Award,
    title: 'Get Your Score',
    description: 'Receive your reputation score and start leveraging it.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="container max-w-[1080px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

