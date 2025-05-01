import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component handles scrolling to top when navigating between routes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (like #section), let the browser handle the scrolling
    if (hash) {
      return;
    }

    // Delay the scroll to top to ensure the DOM has updated
    const timeoutId = setTimeout(() => {
      // Scroll to top with smooth behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'auto' or 'instant' to ensure immediate scrolling without animation
      });
      
      // For older browsers
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop; 