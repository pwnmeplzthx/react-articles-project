import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode
    element?: HTMLElement
}

// Перенос элемента в указанное место дом дерева
// https://legacy.reactjs.org/docs/portals.html
export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body,
    } = props;

    return createPortal(children, element);
};
