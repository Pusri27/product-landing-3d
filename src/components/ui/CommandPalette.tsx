"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Monitor, Box, Smartphone, Settings, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <Command className="w-full">
                            <div className="flex items-center border-b border-zinc-800 px-4">
                                <Search className="w-5 h-5 text-zinc-500 mr-3" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="w-full h-14 bg-transparent text-white outline-none placeholder:text-zinc-600"
                                />
                            </div>

                            <Command.List className="p-2 max-h-[300px] overflow-y-auto">
                                <Command.Empty className="py-6 text-center text-zinc-500 text-sm">
                                    No results found.
                                </Command.Empty>

                                <Command.Group heading="Navigation" className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 px-2">
                                    <CommandItem icon={Monitor} text="Features" shortcut="F" />
                                    <CommandItem icon={Box} text="Products" shortcut="P" />
                                    <CommandItem icon={Smartphone} text="Specs" shortcut="S" />
                                </Command.Group>

                                <Command.Group heading="Actions" className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2 px-2 mt-4">
                                    <CommandItem icon={ArrowRight} text="Pre-order Now" shortcut="⏎" active />
                                    <CommandItem icon={Settings} text="Configure" />
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function CommandItem({ icon: Icon, text, shortcut, active = false }: { icon: any; text: string; shortcut?: string; active?: boolean }) {
    return (
        <Command.Item className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors group ${active ? 'bg-white/10 text-white' : ''}`}>
            <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span>{text}</span>
            </div>
            {shortcut && (
                <span className="text-xs text-zinc-600 border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 rounded group-hover:border-zinc-500 group-hover:text-zinc-400">
                    {shortcut}
                </span>
            )}
        </Command.Item>
    );
}
