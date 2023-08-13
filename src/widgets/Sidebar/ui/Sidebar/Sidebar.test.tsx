import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('render', () => {
        componentRender(<Sidebar />);
        // чтобы появился toBeInTheDocument установить "@testing-library/jest-dom": "^5.16.2", https://github.com/testing-library/jest-dom#installation
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    // test('toggle sidebar', () => {
    //     componentRender(<Sidebar />);
    //     const toggleButton = screen.getByTestId('sidebar-toggle');
    //     expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    //     fireEvent.click(toggleButton);
    //     expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    // });
});
