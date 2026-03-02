import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#090912] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      <Navbar />

      <article className="pt-36 pb-24 container mx-auto px-6 max-w-3xl prose prose-invert prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400 prose-strong:text-white prose-a:text-[#00F0FF]">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: March 2, 2026</p>

        <h2 className="text-xl font-bold mt-10 mb-4">1. Introduction</h2>
        <p>
          ScrimFlow (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates Discord bots and related web services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with any ScrimFlow bot or visit our website.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">2. Information We Collect</h2>
        <p>We may collect the following data through our bots and services:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Discord User Data:</strong> Your Discord user ID, username, discriminator, and avatar — provided automatically by the Discord API when you interact with a bot.</li>
          <li><strong>Server (Guild) Data:</strong> Server ID, server name, channel IDs, and role information necessary for the bot to function.</li>
          <li><strong>Command Data:</strong> The commands and inputs you send to a ScrimFlow bot, used to provide the requested features.</li>
          <li><strong>Contact Information:</strong> Your email address if you contact us directly (e.g., for commissions or support).</li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">3. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To operate and provide the features of our bots.</li>
          <li>To respond to support requests and commission inquiries.</li>
          <li>To improve and maintain our services.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">4. Data Storage & Retention</h2>
        <p>
          Bot data (such as server configuration, user profiles, and ticket transcripts) is stored in encrypted databases. We retain data only as long as is necessary to provide the service. When a bot is removed from a server, associated data is deleted within 30 days.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">5. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal information to third parties. Data may be shared with:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Hosting providers</strong> (e.g., cloud infrastructure) solely to operate the service.</li>
          <li><strong>Law enforcement</strong> if required by applicable law.</li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data at any time by contacting us at{" "}
          <Link href="mailto:privacy@scrimflow.gg" className="text-[#00F0FF] hover:underline">
            privacy@scrimflow.gg
          </Link>
          . If a bot stores per-user data, you can also use the bot&apos;s built-in unregister or data-deletion commands.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">7. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed at individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such data, please contact us immediately.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
        </p>

        <h2 className="text-xl font-bold mt-10 mb-4">9. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <Link href="mailto:privacy@scrimflow.gg" className="text-[#00F0FF] hover:underline">
            privacy@scrimflow.gg
          </Link>.
        </p>
      </article>

      <Footer />
    </div>
  );
}
