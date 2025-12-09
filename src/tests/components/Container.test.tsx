import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from '../../components/ui/Container';

describe('Container', () => {
    it('renders children correctly', () => {
        render(<Container><div>Test Child</div></Container>);
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Container className="custom-class">Content</Container>);
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
