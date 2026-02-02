
import Link from 'next/link';
import { Terminal, Shield, Zap, Users, Trophy, Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-[#090912]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-[#00F0FF]" />
            <span className="text-xl font-bold tracking-tight">ScrimFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
          </div>
          <Link 
            href="https://discord.com"
            className="bg-[#00F0FF] text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#00c8d6] transition-all"
          >
            Add to Discord
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
          </span>
          Phase 2 Live Now
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Professional Scrims <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A3FF]">
            Zero Latency
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          The autonomous Discord bot for tier-1 esports communities. 
          Automate lobbies, track earnings, and manage check-ins with reliable real-time updates.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/docs"
            className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <Code className="h-4 w-4" />
            Read Documentation
          </Link>
          <Link 
            href="#" 
            className="w-full md:w-auto px-8 py-4 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0B0B16]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-[#00F0FF]" />}
              title="Real-Time Updates"
              desc="Lobby messages update instantly via our persistent WebSocket connection. No refresh needed."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-[#00FF88]" />}
              title="Secure Check-ins"
              desc="Prevent randoms from joining. Only registered, authenticated players receive codes."
            />
            <FeatureCard 
              icon={<Trophy className="h-6 w-6 text-[#FFAA00]" />}
              title="Earnings Tracker"
              desc="Built-in leaderboard tracks career earnings across all hosted events automatically."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
           <Terminal className="h-5 w-5 opacity-50" />
           <span className="font-semibold text-gray-300">ScrimFlow</span>
        </div>
        <p>© 2026 ScrimFlow Technologies. Built for Competitive Fortnite.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-[#12121F] border border-white/5 hover:border-[#00F0FF]/30 transition-all group">
      <div className="mb-4 p-3 rounded-lg bg-[#090912] w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
