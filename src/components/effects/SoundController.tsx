"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Howl } from "howler";

interface SoundContextType {
    playClick: () => void;
    playHover: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Short, subtle UI sounds (encapsulated as base64 or linked files)
// For simplicity, we'll placeholder them. In a real app, import local files.
const CLICK_SOUND = "/sounds/click.mp3";
const HOVER_SOUND = "/sounds/hover.mp3";

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);
    const [clickSound, setClickSound] = useState<Howl | null>(null);
    const [hoverSound, setHoverSound] = useState<Howl | null>(null);

    useEffect(() => {
        // Initialize standard UI sounds
        // Note: You would typically place .mp3 files in public/sounds/
        // We will just set up the structure. Without files, it won't crash but won't play.

        // const click = new Howl({ src: [CLICK_SOUND], volume: 0.5 });
        // const hover = new Howl({ src: [HOVER_SOUND], volume: 0.2 });

        // setClickSound(click);
        // setHoverSound(hover);

        // Minimal Web Audio generic beep for demo purposes if no file
        // Implementing a very basic synth fallback could be done here but let's stick to structure
    }, []);

    const playClick = () => {
        if (isMuted) return;
        // clickSound?.play();
        console.log("Play Click Sound");
    };

    const playHover = () => {
        if (isMuted) return;
        // hoverSound?.play();
        console.log("Play Hover Sound");
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <SoundContext.Provider value={{ playClick, playHover, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}
