import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

describe('Button', () => {
    test('render', () => {
        render(<Button>Test</Button>);
        // чтобы появился установить "@testing-library/jest-dom": "^5.16.2", https://github.com/testing-library/jest-dom#installation
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('theme clear', () => {
        render(<Button theme={ThemeButton.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
        // screen.debug();
    });
});
