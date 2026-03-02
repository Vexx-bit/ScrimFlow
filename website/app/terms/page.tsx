import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      <Navbar />

      <article className="pt-36 pb-24 container mx-auto px-6 max-w-3xl prose prose-invert prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400 prose-strong:text-white prose-a:text-[#00F0FF]">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: March 2, 2026</p>

        <h2 className="text-xl font-bold mt-10 mb-4">1. Acceptance of Terms</h2>
        <p>
          By using any ScrimFlow bot, visiting our website, or purchasing our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">2. Description of Services</h2>
        <p>
          ScrimFlow provides Discord bot development, hosting, and management services. This includes both ready-made bot templates (available via subscription) and custom bot commissions built to client specifications.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">3. Subscriptions & Payments</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Template bots are offered on a monthly subscription basis. Prices are listed on the <Link href="/bots" className="text-[#00F0FF] hover:underline">Bots page</Link>.</li>
          <li>Custom bot commissions require a one-time payment (or milestone-based payments for larger projects), quoted before work begins.</li>
          <li>All prices are in USD unless stated otherwise.</li>
          <li>Subscriptions auto-renew unless cancelled before the next billing date.</li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">4. Refund Policy</h2>
        <p>
          Subscription fees for the current billing period are non-refundable. For custom commissions, refunds are handled on a case-by-case basis — partial refunds may be issued if work has not yet begun.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">5. Acceptable Use</h2>
        <p>You agree not to use ScrimFlow bots or services to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Violate Discord&apos;s <Link href="https://discord.com/terms" className="text-[#00F0FF] hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</Link> or Community Guidelines.</li>
          <li>Engage in harassment, hate speech, or illegal activity.</li>
          <li>Attempt to exploit, reverse-engineer, or resell bot functionality.</li>
          <li>Overload our infrastructure (e.g., deliberate API abuse).</li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">6. Intellectual Property</h2>
        <p>
          All ScrimFlow bots, code, branding, and website content are the intellectual property of ScrimFlow. Custom bot commissions grant the client a license to use the delivered bot, but the underlying codebase and framework remain ScrimFlow&apos;s property unless otherwise agreed in writing.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">7. Uptime & Liability</h2>
        <p>
          We strive for 99.9% uptime but do not guarantee uninterrupted service. ScrimFlow is not liable for any damages arising from bot downtime, data loss, or service interruptions. Our maximum liability is limited to the amount you have paid us in the preceding 12 months.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to our services for violations of these terms. You may cancel your subscription at any time. Upon cancellation, the bot will stop functioning at the end of the current billing period.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">9. Changes to Terms</h2>
        <p>
          We may modify these terms at any time. Material changes will be communicated via our website or Discord. Continued use of our services constitutes acceptance of updated terms.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">10. Contact</h2>
        <p>
          For questions about these Terms, contact us at{" "}
          <Link href="mailto:legal@scrimflow.gg" className="text-[#00F0FF] hover:underline">
            legal@scrimflow.gg
          </Link>.
        </p>
      </article>

      <Footer />
    </div>
  );
}
