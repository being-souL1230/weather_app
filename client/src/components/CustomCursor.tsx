import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.addEventListener('mousemove', updateMousePosition);

      // Add hover effects to interactive elements
      const addHoverEffects = () => {
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select, .cursor-pointer');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
        });
      };

      // Initial setup
      addHoverEffects();

      // Re-run after DOM updates
      const observer = new MutationObserver(addHoverEffects);
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Hide default cursor
      document.body.style.cursor = 'none';

      return () => {
        document.removeEventListener('mousemove', updateMousePosition);
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-150 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
        }}
      >
        {/* Outer ring */}
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>

          {/* Inner dot */}
          <div className="absolute inset-1 rounded-full bg-primary animate-pulse"></div>

          {/* Hover effect ring */}
          {isHovering && (
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
          )}

          {/* Rotation animation */}
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>

      {/* Children content */}
      {children}
    </>
  );
}
