import { useEffect, useState } from 'react';

export const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.matchMedia('(pointer:coarse)').matches);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize); // удаляем обработчик
    }, []);

    return isMobile;
};

// function detectDevice() {
//     const isMobile = window.matchMedia;
//     if (!isMobile) return false;

//     const device = isMobile('(pointer:coarse)');
//     return device.matches;
// }
