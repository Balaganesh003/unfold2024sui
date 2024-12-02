import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { FeatureButton } from '../components/FeatureButton';
import { Globe, Lock, Smile, HandshakeIcon, Link, Layers } from 'lucide-react';
import { useCurrentAccount } from '@mysten/dapp-kit';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  navigate: string;
}

export default function Dashboard({ walletId, setWalletId }: { walletId: string, setWalletId: React.Dispatch<React.SetStateAction<string>> }): JSX.Element {
  const account = useCurrentAccount();

  useEffect(() => {
    if (account) {
      setWalletId(account.address);
      console.log('Connected wallet:', walletId);
    }
  }, [account]);

  const features: Feature[] = [
    {
      icon: <Smile className="text-yellow-500" />,
      title: 'Verify Your Reputation',
      description:
        'Minting transforms your online success into a digital token, proving your reliability.',
    },
    {
      icon: <HandshakeIcon className="text-yellow-500" />,
      title: 'Build Trust',
      description:
        'This token will boost your online reputation, enhancing your appeal for collaborations.',
    },
    {
      icon: <Lock className="text-yellow-500" />,
      title: 'Unlock New Opportunities',
      description:
        'A verified reputation can give you access to exclusive offers and communities.',
    },
    {
      icon: <Globe className="text-blue-400" />,
      title: 'Become Part of Sui',
      description:
        "Engage in the decentralized internet's economy to leverage its opportunities.",
    },
  ];

  const services: Service[] = [
    {
      icon: <Link className="text-blue-500" />,
      title: 'On Chain Reputation',
      description:
        'Build and verify your reputation directly on the blockchain for ultimate transparency and trust.',
      navigate: '/dashboard/reputation',
    },
    {
      icon: <Layers className="text-purple-500" />,
      title: 'Wrapper Function',
      description:
        'Seamlessly integrate our reputation system into your existing smart contracts and dApps.',
      navigate: '/dashboard/wrapper',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full">
        <Navbar />
      </div>
      <main className="w-full max-w-[1080px] mx-auto px-4 md:px-4 pt-24">
        <header>
          <p className="text-gray-300 mt-2 text-xl">
            Connected Wallet: {walletId || 'No wallet connected'}
          </p>
        </header>
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">About</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <FeatureButton
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                navigate={service.navigate}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
