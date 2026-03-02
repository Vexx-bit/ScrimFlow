import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/10 text-center text-gray-500 text-sm bg-[#05050A]">
      <div className="flex flex-col items-center justify-center gap-6 mb-8">
        <div className="relative h-16 w-64 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <Image
            src="/brand-logo-horizontal.png"
            alt="ScrimFlow Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 max-w-md">
          We build premium Discord bots that power communities worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          <Link href="/bots" className="hover:text-[#00F0FF] transition-colors">
            Bots
          </Link>
          <Link href="/docs" className="hover:text-[#00F0FF] transition-colors">
            Docs
          </Link>
          <Link href="/terms" className="hover:text-[#00F0FF] transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-[#00F0FF] transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="mailto:support@scrimflow.gg"
            className="hover:text-[#00F0FF] transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
      <p>© {new Date().getFullYear()} ScrimFlow. All rights reserved.</p>
    </footer>
  );
}
