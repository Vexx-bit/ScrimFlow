import Link from "next/link";
import Image from "next/image";
import { Bot, Sparkles, Shield, Rocket, Users, Code2, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-52 md:pb-40 container mx-auto px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[140px] -z-10" />

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-sm font-medium mb-10 animate-fade-in cursor-default">
          <Image src="/brand-icon.png" alt="Icon" width={24} height={24} className="rounded-sm" />
          <span>Now accepting custom bot commissions</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Discord Bots <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] drop-shadow-[0_0_40px_rgba(0,240,255,0.25)]">
            Built&nbsp;to&nbsp;Perform
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-light">
          We design, build, and deploy premium Discord bots — from ready-made templates you can add today, to fully custom branded solutions for your community.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          <Link
            href="/bots"
            className="w-full md:w-auto px-10 py-5 bg-[#00F0FF] text-black rounded-lg font-bold hover:bg-[#00c8d6] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] text-lg"
          >
            <Bot className="h-5 w-5" />
            Browse Bots
          </Link>
          <Link
            href="/bots#custom"
            className="w-full md:w-auto px-10 py-5 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-all text-lg"
          >
            Commission a Custom Bot
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-white/5 bg-[#0B0B16] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat value="50+" label="Bots Deployed" />
            <Stat value="500K+" label="Users Served" />
            <Stat value="99.9%" label="Uptime" />
            <Stat value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* Why ScrimFlow */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#090912]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Communities Choose ScrimFlow
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you pick a ready-made template or go fully custom, every bot ships with enterprise-grade quality.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code2 className="h-8 w-8 text-[#00F0FF]" />}
              title="Clean Architecture"
              desc="Every bot is built with TypeScript, proper error handling, and modular slash commands — no spaghetti code."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-[#00FF88]" />}
              title="Security First"
              desc="Role-based permissions, rate limiting, input validation, and data encryption baked into every deployment."
            />
            <FeatureCard
              icon={<Rocket className="h-8 w-8 text-[#FFAA00]" />}
              title="Instant Deployment"
              desc="We handle hosting, monitoring, and updates. Your bot is live 24/7 with 99.9% uptime — guaranteed."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-[#FF6B6B]" />}
              title="Community Focused"
              desc="Moderation, engagement, ticketing, analytics — we build exactly what your server needs to thrive."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-[#C084FC]" />}
              title="Your Brand, Your Bot"
              desc="Custom name, avatar, status, and embed colors. It looks and feels like YOUR bot, not ours."
            />
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-[#34D399]" />}
              title="Ongoing Support"
              desc="Bug fixes, feature requests, and Discord API updates handled for you. We're always one message away."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-white/5 bg-[#0B0B16]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">From idea to live bot in three simple steps.</p>
          </div>
          <div className="space-y-12">
            <Step number={1} title="Pick a Template or Describe Your Vision">
              Browse our ready-made bots or tell us exactly what you need. We&apos;ll scope it out and send you a quote within 24 hours.
            </Step>
            <Step number={2} title="We Build & You Preview">
              Our team develops and tests your bot in a staging server. You get to try every feature before it goes live.
            </Step>
            <Step number={3} title="Deploy & Enjoy">
              One click to add it to your server. We handle hosting, monitoring, and updates so you can focus on your community.
            </Step>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5 bg-[#090912] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to Power Up Your Server?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Browse our collection of battle-tested bots, or let us craft a custom solution tailored to your community.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <Link
              href="/bots"
              className="px-10 py-5 bg-[#00F0FF] text-black rounded-lg font-bold hover:bg-[#00c8d6] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] text-lg"
            >
              Browse Bots <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:commissions@scrimflow.gg?subject=Custom Bot Inquiry"
              className="px-10 py-5 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-all text-lg"
            >
              Contact for Custom Bot
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---- Subcomponents ---- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-extrabold text-white">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
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

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center font-bold text-lg border border-[#00F0FF]/20">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
        <p className="text-gray-400 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
