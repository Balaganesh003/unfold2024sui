import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "The Sui Reputation Layer has been a game-changer for our DApp. It's helped us identify and reward our most valuable users.",
    author: "Alex Chen",
    role: "DApp Developer",
    avatar: "/src/next/image.jpg"
  },
  {
    quote: "As an early adopter, I've seen my reputation score grow alongside my contributions to the Sui ecosystem. It's incredibly rewarding.",
    author: "Sarah Johnson",
    role: "Sui Community Member",
    avatar: "/src/next/image.jpg"
  },
  {
    quote: "This reputation system has made it easier for us to find reliable partners and collaborators within the Sui network.",
    author: "Michael Lee",
    role: "Blockchain Entrepreneur",
    avatar: "/src/next/image.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container max-w-[1080px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <p className="text-gray-300 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full mr-4 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

