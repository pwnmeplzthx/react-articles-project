import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode
    elem?: HTMLElement
}

// Перенос элемента в указанное место дом дерева
// https://legacy.reactjs.org/docs/portals.html
export const Portal = (props: PortalProps) => {
    const {
        children,
        elem = document.body,
    } = props;

    return createPortal(children, elem);
};
