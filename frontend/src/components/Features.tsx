import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Reputation',
    description: 'Your on-chain activity is securely analyzed and stored on the Sui network.'
  },
  {
    icon: Zap,
    title: 'Instant Scoring',
    description: 'Get your reputation score in real-time based on your latest blockchain interactions.'
  },
  {
    icon: Users,
    title: 'Community Trust',
    description: 'Build trust within the Sui ecosystem and unlock new opportunities.'
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Leverage your reputation to access exclusive features and partnerships.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container max-w-[1080px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

