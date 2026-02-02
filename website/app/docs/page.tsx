
import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Shield, Cpu } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#090912] text-white selection:bg-[#00F0FF] selection:text-black">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#090912]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Terminal className="h-5 w-5 text-[#00F0FF]" />
              <span className="font-bold tracking-tight">ScrimFlow Docs</span>
            </Link>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            <DocSection title="Getting Started">
              <DocLink href="#quick-start">Quick Start</DocLink>
              <DocLink href="#commands">Command Reference</DocLink>
            </DocSection>
            <DocSection title="Core Features">
              <DocLink href="#registration">Registration Flow</DocLink>
              <DocLink href="#scrims">Hosting Scrims</DocLink>
              <DocLink href="#ping">Ping Diagnostic</DocLink>
            </DocSection>
            <DocSection title="Security">
              <DocLink href="#permissions">Permissions</DocLink>
            </DocSection>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-16">
          <section id="quick-start">
             <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-8 w-8 text-[#00F0FF]" />
                <h1 className="text-4xl font-bold">Operator's Manual</h1>
             </div>
             <p className="text-xl text-gray-400 leading-relaxed mb-8">
               Complete guide to operating the ScrimFlow bot v1.1.0 (Phase 2).
             </p>
             
             <div className="p-6 rounded-xl bg-[#12121F] border border-white/10">
               <h3 className="font-bold text-white mb-4">Command Summary</h3>
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="col-span-1 text-[#00F0FF] font-mono">/register</div>
                 <div className="text-gray-400">Create player profile</div>
                 <div className="col-span-1 text-[#00F0FF] font-mono">/scrim open</div>
                 <div className="text-gray-400">Start new lobby (Admin)</div>
                 <div className="col-span-1 text-[#00F0FF] font-mono">/checkin</div>
                 <div className="text-gray-400">Join active lobby</div>
                 <div className="col-span-1 text-[#00F0FF] font-mono">/ping</div>
                 <div className="text-gray-400">Test connection</div>
               </div>
             </div>
          </section>

          <section id="scrims" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Cpu className="h-6 w-6 text-[#00FF88]" />
              Hosting a Scrim (Admin)
            </h2>
            <p className="text-gray-400">The core loop of ScrimFlow is designed for speed. Follow these steps to host a match.</p>

            <Step number={1} title="Open the Lobby">
              <p className="text-gray-400 mb-2">Run the following command to create a live dashboard embed:</p>
              <CodeBlock>/scrim open format:SOLO region:EU</CodeBlock>
            </Step>

            <Step number={2} title="Monitor Check-ins">
              <p className="text-gray-400">
                Players will run <code className="bg-white/10 rounded px-1">/checkin</code>. 
                Watch the embed counter update in real-time (e.g., <span className="text-[#00F0FF]">Players: 42/100</span>).
              </p>
            </Step>

            <Step number={3} title="Lock & Distribute">
              <p className="text-gray-400 mb-2">When you are ready to start, close the lobby and send the code:</p>
              <CodeBlock>/scrim close</CodeBlock>
              <CodeBlock>/scrim distribute code:X9Y-22B</CodeBlock>
              <p className="text-gray-400 mt-2 text-sm italic">
                *The bot will DM the code to all confirmed players instantly.*
              </p>
            </Step>
          </section>

          <section id="security" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#FFAA00]" />
              Security & Permissions
            </h2>
            <div className="space-y-4">
              <h3 className="font-bold text-white">Recommended Channel Setup</h3>
              <ul className="space-y-2 text-gray-400 list-disc pl-5">
                <li>
                  <strong className="text-white">#register-here:</strong> Allow 
                  <code className="mx-2 bg-white/10 rounded px-1 text-xs">/register</code>
                  <code className="bg-white/10 rounded px-1 text-xs">/unregister</code>
                </li>
                <li>
                  <strong className="text-white">#scrim-announcements:</strong> Allow
                  <code className="mx-2 bg-white/10 rounded px-1 text-xs">/scrim</code>
                  <code className="bg-white/10 rounded px-1 text-xs">/checkin</code>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function DocSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="font-bold text-white uppercase tracking-wider text-xs opacity-70">{title}</h4>
      <div className="flex flex-col space-y-2">
        {children}
      </div>
    </div>
  );
}

function DocLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a href={href} className="text-gray-400 hover:text-[#00F0FF] transition-colors text-sm">
      {children}
    </a>
  );
}

function Step({ number, title, children }: { number: number, title: string, children: React.ReactNode }) {
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black/50 border border-white/10 rounded p-3 font-mono text-sm text-[#00F0FF]">
      {children}
    </div>
  );
}
