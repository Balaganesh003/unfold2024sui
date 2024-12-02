import { BadgeCheckIcon, SparklesIcon } from 'lucide-react';

export default function Hero() {

  return (
    <section className="min-h-screen overflow-hidden bg-[radial-gradient(100%_100%_at_50%_0,rgba(0,122,255,.7)_0,transparent_100%)] bg-black text-white flex items-center">
      <div className="container max-w-[1080px] mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Reputation Layer
              <br />
              for Sui
            </h1>
          </div>

          <div className="space-y-8">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300">
              Designed for users to access and take advantage of their wallet history
            </p>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300">
              Utilized by BUIDLers to grow faster by engaging and incentivizing genuine contributors and early adopters
            </p>

            <a
              href="/dashboard"
              className="group relative overflow-hidden border-2 border-gray-400 text-white
                 px-6 py-3 rounded-xl text-lg font-semibold 
                 transform transition-all duration-300 
                 hover:shadow-lg 
                 flex items-center justify-center gap-3
                 hover:bg-gray-600 active:scale-95"
            >
              {/* Sparkle effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 animate-ping w-3 h-3 bg-white rounded-full opacity-75"></div>
                <div className="absolute bottom-0 right-0 animate-ping w-4 h-4 bg-white rounded-full opacity-75"></div>
              </div>

              {/* Icon and Text */}
              <SparklesIcon className="text-white group-hover:rotate-12 transition-transform duration-300" />
              Check Your Reputation Score
              <BadgeCheckIcon className="text-white group-hover:-rotate-12 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

