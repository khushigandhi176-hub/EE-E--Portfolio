import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play, VolumeX, X } from 'lucide-react';
import { LAB_DEMONSTRATION_VIDEOS, type LabVideoDemo } from '../data/portfolioData';

export function VideoGallery() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);
  const [failedThumbs, setFailedThumbs] = useState<Record<string, boolean>>({});

  const activeVideo: LabVideoDemo | null =
    activeLightboxIndex !== null ? LAB_DEMONSTRATION_VIDEOS[activeLightboxIndex] : null;

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % LAB_DEMONSTRATION_VIDEOS.length
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + LAB_DEMONSTRATION_VIDEOS.length) % LAB_DEMONSTRATION_VIDEOS.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex]);

  const openLightbox = (index: number) => {
    setInlinePlayingId(null);
    setActiveLightboxIndex(index);
  };

  return (
    <div id="video-gallery" className="scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Practical Evidence · 5 Original Laboratory Recordings · Background Audio Removed
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Laboratory Demonstration Video Gallery
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 shrink-0">
          <VolumeX className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span>Silent Video Tracks · Uncropped Circuit Framing</span>
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Each recording below captures an original laboratory demonstration of the Arduino UNO LED
        interfacing activity. All background audio and ambient lab noise have been removed while
        preserving the complete breadboard, jumper wiring, LED blinking behavior, and board view.
      </p>

      {/* Responsive 3-column Bento grid: Row 1 has Demo 01 (2 cols, landscape) + Demo 02 (1 col); Row 2 has Demos 03, 04, 05 (1 col each) */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LAB_DEMONSTRATION_VIDEOS.map((video, index) => {
          const isFeaturedLandscape = index === 0;
          const isInlinePlaying = inlinePlayingId === video.id;
          const thumbFailed = failedThumbs[video.id];

          return (
            <article
              key={video.id}
              className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white ${
                isFeaturedLandscape ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Uncropped Media Stage: object-contain guarantees zero cropping of circuit or Arduino board */}
              <div
                className={`relative w-full overflow-hidden bg-[#0B1120] ${
                  isFeaturedLandscape ? 'aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[4/5]'
                }`}
              >
                {isInlinePlaying ? (
                  <video
                    key={video.videoSrc}
                    src={video.videoSrc}
                    poster={video.thumbnailSrc}
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain bg-[#0B1120]"
                  >
                    Your browser does not support embedded MP4 playback.
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    aria-label={`Open ${video.label} in full video player`}
                    className="group relative flex h-full w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1D4ED8]"
                  >
                    {!thumbFailed ? (
                      <img
                        src={video.thumbnailSrc}
                        alt={`${video.label} — Arduino UNO and four-LED breadboard hardware setup`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedThumbs((prev) => ({ ...prev, [video.id]: true }))
                        }
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-900 px-6 text-center text-slate-300">
                        <Play className="h-8 w-8 text-slate-400" />
                        <span className="text-sm font-medium">{video.label}</span>
                      </div>
                    )}

                    {/* Measured bottom scrim for clear contrast */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                    />

                    {/* Central play affordance */}
                    <span
                      aria-hidden="true"
                      className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-md transition-transform duration-150 group-hover:scale-105"
                    >
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>

                    {/* Quiet unboxed overlay metadata */}
                    <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-xs font-medium text-white/95">
                      <span className="font-mono tabular-nums">{video.duration} · Silent</span>
                      <span className="inline-flex items-center gap-1 text-white/90">
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Expand</span>
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                    <span className="font-mono font-medium text-[#1D4ED8] tabular-nums">
                      0{index + 1} / 05
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{video.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>Audio Removed</span>
                    {video.featuredNote && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-700 font-medium">{video.featuredNote}</span>
                      </>
                    )}
                  </div>

                  <h4 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                    {video.label}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{video.caption}</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setInlinePlayingId((prev) => (prev === video.id ? null : video.id))
                    }
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-[#1E40AF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{isInlinePlaying ? 'Show Thumbnail' : 'Play Inline'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Full Player</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Video Modal */}
      {activeVideo && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-video-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0B1120] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-xs text-slate-400 tabular-nums">
                  {activeVideo.label} · Recording 0{activeLightboxIndex + 1} of 05 ·{' '}
                  {activeVideo.duration} · Silent Original Footage
                </p>
                <h4
                  id="lightbox-video-title"
                  className="mt-0.5 truncate text-base font-semibold text-white"
                >
                  {activeVideo.label} — Arduino LED Interfacing
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close video player"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition-colors hover:bg-slate-800 hover:text-white shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Uncropped Video Viewport */}
            <div className="flex min-h-0 flex-1 items-center justify-center bg-black px-2 py-2">
              <video
                key={activeVideo.videoSrc}
                src={activeVideo.videoSrc}
                poster={activeVideo.thumbnailSrc}
                controls
                autoPlay
                muted
                playsInline
                className="max-h-[65vh] w-full object-contain"
              >
                Your browser does not support embedded MP4 playback.
              </video>
            </div>

            {/* Caption & Previous / Next Controls */}
            <div className="flex flex-col gap-4 border-t border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-slate-300">{activeVideo.caption}</p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveLightboxIndex(
                      (activeLightboxIndex - 1 + LAB_DEMONSTRATION_VIDEOS.length) %
                        LAB_DEMONSTRATION_VIDEOS.length
                    )
                  }
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLightboxIndex(
                      (activeLightboxIndex + 1) % LAB_DEMONSTRATION_VIDEOS.length
                    )
                  }
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
