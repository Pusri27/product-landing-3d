import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 py-16 border-t border-white/10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h3 className="text-2xl font-bold text-white">Lumina Prime</h3>
                        <p className="text-zinc-400 max-w-xs">
                            Redefining the boundaries of sensory perception through advanced audio engineering.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Specs</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="#" className="hover:text-white transition-colors">About Direct</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Lumina Prime. All rights reserved.
                    </p>

                    <div className="flex gap-6  text-zinc-400">
                        <Link href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
