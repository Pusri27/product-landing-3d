import { create } from 'zustand';

export type ConfiguratorSection = 'architecture' | 'core' | null;

interface ConfiguratorState {
    activeSection: ConfiguratorSection;
    hoveredSection: ConfiguratorSection;
    setActiveSection: (section: ConfiguratorSection) => void;
    setHoveredSection: (section: ConfiguratorSection) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
    activeSection: null,
    hoveredSection: null,
    setActiveSection: (section) => set({ activeSection: section }),
    setHoveredSection: (section) => set({ hoveredSection: section }),
}));
