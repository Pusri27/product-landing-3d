import { describe, it, expect, beforeEach } from 'vitest';
import { useConfiguratorStore } from '../store/useConfiguratorStore';

describe('useConfiguratorStore', () => {
    // Reset store before each test
    beforeEach(() => {
        useConfiguratorStore.setState({ activeSection: null, hoveredSection: null });
    });

    it('should have initial state null', () => {
        const { activeSection, hoveredSection } = useConfiguratorStore.getState();
        expect(activeSection).toBeNull();
        expect(hoveredSection).toBeNull();
    });

    it('should update activeSection', () => {
        useConfiguratorStore.getState().setActiveSection('architecture');
        expect(useConfiguratorStore.getState().activeSection).toBe('architecture');
    });

    it('should update hoveredSection', () => {
        useConfiguratorStore.getState().setHoveredSection('core');
        expect(useConfiguratorStore.getState().hoveredSection).toBe('core');
    });
});
