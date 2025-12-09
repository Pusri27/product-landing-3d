// Centralized Type Definitions

export type ConfiguratorSection = 'architecture' | 'core' | null;

export interface NavLink {
    name: string;
    href: string;
}

export interface FeatureItem {
    icon: React.ElementType;
    title: string;
    description: string;
}

export interface SpecItem {
    category: string;
    details: string[];
}
