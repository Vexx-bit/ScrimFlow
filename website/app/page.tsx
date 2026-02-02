
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-[#090912]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-12 w-48 md:w-64">
              <Image 
                src="/brand-logo-full.png" 
                alt="ScrimFlow Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
          </div>
          <Link 
            href="mailto:contact@scrimflow.gg"
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Request Access
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 container mx-auto px-6 text-center overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[140px] -z-10"></div>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-sm font-medium mb-10 animate-fade-in hover:bg-[#00F0FF]/10 transition-colors cursor-default">
          <Image src="/brand-icon.png" alt="Icon" width={24} height={24} className="rounded-sm" />
          <span>Enterprise Phase 2 Live</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Scrim Infrastructure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] drop-shadow-[0_0_40px_rgba(0,240,255,0.25)]">
            For Professionals
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-light">
          We don&apos;t just build bots. We provide autonomous competition infrastructure for the world&apos;s largest esports organizations.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          <Link 
            href="mailto:sales@scrimflow.gg?subject=Demo Request"
            className="w-full md:w-auto px-10 py-5 bg-[#00F0FF] text-black rounded-lg font-bold hover:bg-[#00c8d6] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] text-lg"
          >
            <Zap className="h-5 w-5 fill-current" />
            Book a Demo
          </Link>
          <Link 
            href="/docs" 
            className="w-full md:w-auto px-10 py-5 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-all text-lg"
          >
            Technical Docs
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0B0B16]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Top Orgs Choose ScrimFlow</h2>
            <p className="text-gray-400">Enterprise-grade reliability for high-stakes competition.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-[#00F0FF]" />}
              title="Zero-Latency Lobby"
              desc="Our proprietary WebSocket architecture ensures lobby counts update in real-time, handling 100k+ concurrent requests."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-[#00FF88]" />}
              title="Identity Verification"
              desc="Eliminate griefers. We enforce strict 1:1 Discord-to-Epic checks, preventing alt accounts and ban evasion."
            />
            <FeatureCard 
              icon={<Trophy className="h-8 w-8 text-[#FFAA00]" />}
              title="Automated payouts"
              desc="Seamlessly track accumulated earnings across seasons. Export financial reports for easy prize distribution."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 text-center text-gray-500 text-sm bg-[#05050A]">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
           <div className="relative h-16 w-64 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <Image src="/brand-logo-full.png" alt="Logo" fill className="object-contain" />
           </div>
           <div className="flex gap-6 text-gray-400">
             <Link href="#" className="hover:text-[#00F0FF]">Terms of Service</Link>
             <Link href="#" className="hover:text-[#00F0FF]">Privacy Policy</Link>
             <Link href="mailto:support@scrimflow.gg" className="hover:text-[#00F0FF]">Contact Support</Link>
           </div>
        </div>
        <p>© 2026 ScrimFlow Technologies. Enterprise Infrastructure.</p>
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
