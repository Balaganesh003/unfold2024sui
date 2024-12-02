import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-20 bg-[radial-gradient(100%_100%_at_50%_0,rgba(0,122,255,.7)_0,transparent_100%)] bg-black">
      <div className="container max-w-[1080px] mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
        >
          Ready to Build Your Reputation on Sui?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          Join the Sui Reputation Layer and unlock new opportunities in the blockchain ecosystem.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold 
                     transform transition-all duration-300 
                     hover:shadow-lg hover:bg-blue-700 active:scale-95
                     flex items-center justify-center gap-3 mx-auto"
        >
          Get Started Now
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </section>
  );
}

