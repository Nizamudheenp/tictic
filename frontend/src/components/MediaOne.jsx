import { useEffect, useRef } from "react";

function MediaOne() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[80vh]  overflow-hidden mb-10">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={import.meta.env.VITE_MEDIA_ONE}
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default MediaOne;
