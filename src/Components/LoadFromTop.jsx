import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadFromTop = () => {
    const { pathname } = useLocation(); // Get the current route pathname

    useEffect(() => {
        // Scroll to the top of the page whenever the route changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // This component doesn't render anything visually
};

export default LoadFromTop;
