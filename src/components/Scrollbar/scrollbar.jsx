import { useRef, useEffect } from "react";

export default function ScrollArea({ children }) {
  const containerRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const thumb = thumbRef.current;

    const updateThumb = () => {
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        40
      );

      const scrollTop = el.scrollTop;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbMove = clientHeight - thumbHeight;

      const top = (scrollTop / maxScroll) * maxThumbMove;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };

    updateThumb();
    el.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* CONTEÚDO SCROLL */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto pr-4 scroll-hidden"
      >
        {children}
      </div>

      {/* SCROLLBAR CUSTOM */}
      <div className="absolute top-0 right-2 h-full w-[10px]">
        <div
          ref={thumbRef}
          className="w-full rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition-all duration-200"
        />
      </div>
    </div>
  );
}