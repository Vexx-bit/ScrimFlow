import Link from "next/link";
import { BookOpen, Terminal, Shield, Cpu, Bot, Wrench } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#090912] text-white selection:bg-[#00F0FF] selection:text-black">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-28 space-y-8">
            <DocSection title="Getting Started">
              <DocLink href="#overview">Overview</DocLink>
              <DocLink href="#adding-a-bot">Adding a Bot</DocLink>
            </DocSection>
            <DocSection title="Bot Templates">
              <DocLink href="#scrimflow-bot">ScrimFlow Bot</DocLink>
              <DocLink href="#guardian-bot">Guardian (Moderation)</DocLink>
              <DocLink href="#ticketflow-bot">TicketFlow (Tickets)</DocLink>
            </DocSection>
            <DocSection title="Custom Bots">
              <DocLink href="#commissioning">Commissioning</DocLink>
              <DocLink href="#what-we-need">What We Need From You</DocLink>
            </DocSection>
            <DocSection title="Policies">
              <DocLink href="/privacy">Privacy Policy</DocLink>
              <DocLink href="/terms">Terms of Service</DocLink>
            </DocSection>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-16">
          {/* Overview */}
          <section id="overview">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-[#00F0FF]" />
              <h1 className="text-4xl font-bold">Documentation</h1>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Everything you need to know about ScrimFlow&apos;s Discord bot platform — from adding a template bot to commissioning a fully custom solution.
            </p>

            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10">
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Link href="/bots" className="text-[#00F0FF] font-mono hover:underline">
                  /bots
                </Link>
                <span className="text-gray-400">Browse & add bots</span>
                <Link href="/bots#custom" className="text-[#00F0FF] font-mono hover:underline">
                  /bots#custom
                </Link>
                <span className="text-gray-400">Commission a custom bot</span>
                <Link href="/privacy" className="text-[#00F0FF] font-mono hover:underline">
                  /privacy
                </Link>
                <span className="text-gray-400">Privacy Policy</span>
                <Link href="/terms" className="text-[#00F0FF] font-mono hover:underline">
                  /terms
                </Link>
                <span className="text-gray-400">Terms of Service</span>
              </div>
            </div>
          </section>

          {/* Adding a Bot */}
          <section id="adding-a-bot" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="h-6 w-6 text-[#00F0FF]" />
              Adding a Bot to Your Server
            </h2>
            <p className="text-gray-400">
              Every template bot on our platform can be added to your server in seconds. Here&apos;s the flow:
            </p>

            <Step number={1} title="Browse the Collection">
              <p className="text-gray-400 mb-2">
                Head to <Link href="/bots" className="text-[#00F0FF] hover:underline">/bots</Link> and click on any bot card to see its full feature list and pricing.
              </p>
            </Step>

            <Step number={2} title='Click "Add to Discord"'>
              <p className="text-gray-400">
                This opens the standard Discord OAuth2 authorization screen. Select the server where you want the bot, review permissions, and click <strong className="text-white">Authorize</strong>.
              </p>
            </Step>

            <Step number={3} title="Configure & Go">
              <p className="text-gray-400">
                Most bots work out of the box. Use the bot&apos;s <code className="bg-white/10 rounded px-1">/setup</code> command for initial configuration (setting channels, roles, etc.).
              </p>
            </Step>
          </section>

          {/* ScrimFlow Bot */}
          <section id="scrimflow-bot" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cpu className="h-6 w-6 text-[#00FF88]" />
              ScrimFlow Bot — Competitive Scrims
            </h2>
            <p className="text-gray-400">
              Our flagship bot for esports communities. Automate lobby management, check-ins, and match-code distribution.
            </p>

            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10">
              <h3 className="font-bold text-white mb-4">Command Reference</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-[#00F0FF] font-mono">/register</div>
                <div className="text-gray-400">Create player profile</div>
                <div className="text-[#00F0FF] font-mono">/scrim open</div>
                <div className="text-gray-400">Start new lobby (Admin)</div>
                <div className="text-[#00F0FF] font-mono">/scrim close</div>
                <div className="text-gray-400">Lock lobby</div>
                <div className="text-[#00F0FF] font-mono">/scrim distribute</div>
                <div className="text-gray-400">DM match code to players</div>
                <div className="text-[#00F0FF] font-mono">/checkin</div>
                <div className="text-gray-400">Join active lobby</div>
                <div className="text-[#00F0FF] font-mono">/ping</div>
                <div className="text-gray-400">Test connection</div>
              </div>
            </div>
          </section>

          {/* Guardian Bot */}
          <section id="guardian-bot" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#FFAA00]" />
              Guardian — Moderation Suite
            </h2>
            <p className="text-gray-400">
              AI-powered moderation with raid protection, custom warning systems, and detailed audit logs.
            </p>
            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10">
              <h3 className="font-bold text-white mb-4">Key Commands</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-[#00F0FF] font-mono">/warn @user</div>
                <div className="text-gray-400">Issue a warning</div>
                <div className="text-[#00F0FF] font-mono">/mute @user 10m</div>
                <div className="text-gray-400">Timed mute</div>
                <div className="text-[#00F0FF] font-mono">/audit @user</div>
                <div className="text-gray-400">View moderation history</div>
                <div className="text-[#00F0FF] font-mono">/automod setup</div>
                <div className="text-gray-400">Configure auto-moderation</div>
              </div>
            </div>
          </section>

          {/* TicketFlow Bot */}
          <section id="ticketflow-bot" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-[#C084FC]" />
              TicketFlow — Support Tickets
            </h2>
            <p className="text-gray-400">
              Thread-based support tickets with staff assignment, priority levels, and transcript exports.
            </p>
            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10">
              <h3 className="font-bold text-white mb-4">Key Commands</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-[#00F0FF] font-mono">/ticket new</div>
                <div className="text-gray-400">Create a ticket</div>
                <div className="text-[#00F0FF] font-mono">/ticket close</div>
                <div className="text-gray-400">Close & transcript</div>
                <div className="text-[#00F0FF] font-mono">/ticket assign @staff</div>
                <div className="text-gray-400">Assign to staff member</div>
                <div className="text-[#00F0FF] font-mono">/ticket panel</div>
                <div className="text-gray-400">Post a ticket button panel</div>
              </div>
            </div>
          </section>

          {/* Commissioning */}
          <section id="commissioning" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Wrench className="h-6 w-6 text-[#FF6B6B]" />
              Custom Bot Commissions
            </h2>
            <p className="text-gray-400">
              Need something our templates don&apos;t cover? We build fully custom, branded Discord bots to your exact specifications.
            </p>

            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10 space-y-4">
              <h3 className="font-bold text-white">Pricing</h3>
              <p className="text-gray-400 text-sm">Custom bots use a <strong className="text-white">one-time build fee</strong> + an <strong className="text-white">optional monthly hosting fee</strong>:</p>
              <ul className="list-disc pl-5 text-gray-400 space-y-1 text-sm">
                <li><strong className="text-white">Starter</strong> (under 50 members) — <strong className="text-[#34D399]">$49</strong> build + $5/mo hosting</li>
                <li><strong className="text-white">Growth</strong> (50–500 members) — <strong className="text-[#00F0FF]">$99</strong> build + $12/mo hosting</li>
                <li><strong className="text-white">Enterprise</strong> (500+ members) — <strong className="text-[#C084FC]">From $199</strong> build + $25/mo hosting</li>
              </ul>
              <p className="text-gray-500 text-xs">Hosting is optional — you pay once for the build, then only pay monthly if you want us to host &amp; maintain it.</p>
            </div>

            <div className="p-6 rounded-xl bg-[#12121F] border border-white/10 space-y-4">
              <h3 className="font-bold text-white">Ownership &amp; Control</h3>
              <ul className="list-disc pl-5 text-gray-400 space-y-1 text-sm">
                <li><strong className="text-white">You get:</strong> Full admin control — config, commands, data, branding, and the right to use the bot on any server</li>
                <li><strong className="text-white">We retain:</strong> Source code ownership (so we can maintain &amp; update it for you)</li>
                <li><strong className="text-white">Code buyout:</strong> Available if you need full source code ownership for self-hosting</li>
              </ul>
            </div>
          </section>

          {/* What We Need */}
          <section id="what-we-need" className="space-y-6">
            <h2 className="text-2xl font-bold">What We Need From You</h2>
            <p className="text-gray-400">
              To kick off a commission, email{" "}
              <Link href="mailto:commissions@scrimflow.gg" className="text-[#00F0FF] hover:underline">
                commissions@scrimflow.gg
              </Link>{" "}
              with:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-2 text-sm">
              <li>A description of the bot&apos;s purpose and target audience</li>
              <li>A list of desired features / commands</li>
              <li>Branding assets (name, avatar, color scheme)</li>
              <li>Any third-party integrations (APIs, databases, etc.)</li>
              <li>Your budget range and desired timeline</li>
            </ul>
            <p className="text-gray-400 text-sm">
              We&apos;ll respond within 24 hours with a detailed scope and quote.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

/* ---- Helper components ---- */

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="font-bold text-white uppercase tracking-wider text-xs opacity-70">
        {title}
      </h4>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
}

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-400 hover:text-[#00F0FF] transition-colors text-sm">
      {children}
    </Link>
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
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center font-bold border border-[#00F0FF]/20">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
