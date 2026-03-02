"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  Shield,
  Trophy,
  Ticket,
  BarChart3,
  Music,
  Gamepad2,
  ArrowRight,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ------------------------------------------------------------------ */
/*  Bot Data                                                          */
/* ------------------------------------------------------------------ */

interface BotTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  price: string;
  priceNote?: string;
  features: string[];
  inviteUrl?: string;
}

const bots: BotTemplate[] = [
  {
    id: "scrimflow",
    name: "ScrimFlow",
    tagline: "Competitive Scrim Manager",
    description:
      "The original ScrimFlow bot — automated lobby management, real-time check-ins, match-code distribution, and player identity verification. Built for esports orgs running daily scrims.",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "#00F0FF",
    price: "$29/mo",
    priceNote: "Includes hosting & updates",
    features: [
      "Slash-command lobby creation (/scrim open)",
      "Real-time player check-in counter",
      "Automatic match-code DM distribution",
      "1:1 Discord-to-Epic identity verification",
      "Region & format filtering (Solo, Duo, Trio, Squad)",
      "Admin dashboard embed",
      "Season-based earnings tracking",
    ],
    inviteUrl: "#",
  },
  {
    id: "guardian",
    name: "Guardian",
    tagline: "Advanced Moderation Suite",
    description:
      "Keep your server clean with AI-powered automod, raid protection, detailed audit logs, and customizable warning systems. Trusted by servers with 100K+ members.",
    icon: <Shield className="h-8 w-8" />,
    color: "#00FF88",
    price: "$19/mo",
    priceNote: "Free tier available",
    features: [
      "AI-powered message filtering",
      "Anti-raid & anti-spam protection",
      "Customizable warning & strike system",
      "Detailed audit logs with search",
      "Auto-role & verification gates",
      "Timed mutes, bans & slowmode",
      "Mod action analytics dashboard",
    ],
    inviteUrl: "#",
  },
  {
    id: "ticketflow",
    name: "TicketFlow",
    tagline: "Support Ticket System",
    description:
      "Streamline community support with threaded tickets, staff assignments, priority levels, canned responses, and CSAT ratings. Perfect for product teams and creator communities.",
    icon: <Ticket className="h-8 w-8" />,
    color: "#C084FC",
    price: "$14/mo",
    features: [
      "Button & slash-command ticket creation",
      "Auto-category routing",
      "Staff assignment & claiming",
      "Priority levels (Low / Normal / Urgent)",
      "Canned response templates",
      "Transcript export (HTML & PDF)",
      "Customer satisfaction (CSAT) ratings",
    ],
    inviteUrl: "#",
  },
  {
    id: "rankup",
    name: "RankUp",
    tagline: "Leveling & Engagement",
    description:
      "Gamify your server with XP, levels, leaderboards, and role rewards. Boost engagement with daily streaks, voice XP, and seasonal events.",
    icon: <Trophy className="h-8 w-8" />,
    color: "#FFAA00",
    price: "$12/mo",
    features: [
      "Message & voice XP tracking",
      "Customizable level-up rewards",
      "Server & global leaderboards",
      "Daily login streaks",
      "Seasonal XP events & multipliers",
      "Role rewards at milestones",
      "Anti-spam XP cooldowns",
    ],
    inviteUrl: "#",
  },
  {
    id: "analytics",
    name: "Pulse",
    tagline: "Server Analytics & Insights",
    description:
      "Understand your community with real-time dashboards — member growth, message activity, channel heatmaps, and retention metrics all inside Discord.",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "#FF6B6B",
    price: "$16/mo",
    features: [
      "Real-time member growth tracking",
      "Message & voice activity charts",
      "Channel & category heatmaps",
      "Member retention & churn analytics",
      "Peak activity hour reports",
      "Weekly digest auto-posted to a channel",
      "CSV & JSON data exports",
    ],
    inviteUrl: "#",
  },
  {
    id: "vibes",
    name: "Vibes",
    tagline: "Music & Soundboard",
    description:
      "High-quality music playback from YouTube, Spotify, and SoundCloud — plus a customizable soundboard for memes and alerts. No lag, no ads.",
    icon: <Music className="h-8 w-8" />,
    color: "#34D399",
    price: "$9/mo",
    features: [
      "YouTube, Spotify & SoundCloud support",
      "Queue management with drag & drop",
      "Bass boost, nightcore & 8D filters",
      "Custom soundboard with up to 50 clips",
      "Playlist save & share",
      "24/7 mode (stays in voice channel)",
      "Lyrics display",
    ],
    inviteUrl: "#",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                    */
/* ------------------------------------------------------------------ */

export default function BotsPage() {
  const [selected, setSelected] = useState<BotTemplate | null>(null);

  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A3FF]">
            Bot Collection
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ready-made Discord bots you can deploy today. Click any card to see full details, features, and pricing.
        </p>
      </section>

      {/* Bot Grid */}
      <section className="pb-24 container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <button
              key={bot.id}
              onClick={() => setSelected(bot)}
              className="text-left p-6 rounded-2xl bg-[#12121F] border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
            >
              <div
                className="mb-4 p-3 rounded-lg w-fit transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${bot.color}15` }}
              >
                <span style={{ color: bot.color }}>{bot.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{bot.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{bot.tagline}</p>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                {bot.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold" style={{ color: bot.color }}>
                  {bot.price}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1 group-hover:text-white transition-colors">
                  View Details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#12121F] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${selected.color}15` }}
              >
                <span style={{ color: selected.color }}>{selected.icon}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <p className="text-sm text-gray-500">{selected.tagline}</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">{selected.description}</p>

            {/* Features */}
            <h3 className="font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2 mb-8">
              {selected.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: selected.color }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="p-6 rounded-xl bg-[#090912] border border-white/10 mb-8">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-3xl font-extrabold" style={{ color: selected.color }}>
                  {selected.price}
                </span>
              </div>
              {selected.priceNote && (
                <p className="text-gray-500 text-sm">{selected.priceNote}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {selected.inviteUrl && (
                <Link
                  href={selected.inviteUrl}
                  className="flex-1 text-center px-6 py-3 rounded-lg font-bold transition-all text-black"
                  style={{ backgroundColor: selected.color }}
                >
                  Add to Discord
                </Link>
              )}
              <Link
                href="mailto:commissions@scrimflow.gg?subject=Bot Inquiry"
                className="flex-1 text-center px-6 py-3 rounded-lg font-bold border border-white/20 hover:bg-white/5 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Custom Bot CTA */}
      <section id="custom" className="py-24 border-t border-white/5 bg-[#0B0B16] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C084FC]/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C084FC]/30 bg-[#C084FC]/5 text-[#C084FC] text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" /> Custom Commissions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Need Something Unique?
          </h2>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            Our templates are just the beginning. We build fully custom, branded Discord bots tailored to your exact needs — your name, your avatar, your features.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left mb-10">
            <CustomFeature title="Your Branding" desc="Custom name, avatar, status message, and embed theme." />
            <CustomFeature title="Your Features" desc="We build exactly what you describe — no compromises." />
            <CustomFeature title="Your Timeline" desc="Most custom bots delivered within 1–2 weeks." />
          </div>
          <p className="text-gray-500 text-sm mb-8">
            Pricing starts at <strong className="text-white">$149</strong> for a basic custom bot. Complex integrations quoted individually.
          </p>
          <Link
            href="mailto:commissions@scrimflow.gg?subject=Custom Bot Commission"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#C084FC] text-black rounded-lg font-bold hover:bg-[#a855f7] transition-all shadow-[0_0_20px_rgba(192,132,252,0.3)] text-lg"
          >
            Start Your Commission <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---- Sub-components ---- */

function CustomFeature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 rounded-xl bg-[#12121F] border border-white/5">
      <h4 className="font-bold text-white mb-1 text-sm">{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}
