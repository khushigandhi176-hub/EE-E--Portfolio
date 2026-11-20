import { useEffect, useState } from 'react';
import { Image as ImageIcon, Play, X } from 'lucide-react';
import { COURSE_PROJECTS, type CourseProject } from '../data/portfolioData';

interface LightboxMedia {
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  poster?: string;
}

export function CourseProjectsSection() {
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<Record<string, number>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activeMedia) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveMedia(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeMedia]);

  const getProjectDisplayImage = (project: CourseProject) => {
    if (project.secondaryImages && project.secondaryImages.length > 0) {
      const idx = selectedGalleryImage[project.id] ?? 0;
      return project.secondaryImages[idx] ?? project.secondaryImages[0];
    }
    return {
      src: project.primaryImage,
      alt: project.primaryAlt,
      label: project.title,
    };
  };

  return (
    <section
      id="course-projects"
      aria-labelledby="course-projects-heading"
      className="scroll-mt-20 border-t border-slate-200 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-slate-500">
            Existing Portfolio Archive · Additional Hardware &amp; Software Prototypes
          </p>
          <h2
            id="course-projects-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Course Projects &amp; Prototypes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Earlier coursework documented in this e-portfolio spanning sensor interfacing, wireless
            serial communication, mobile app design, and physical prototyping. All included project
            recordings are presented silently.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COURSE_PROJECTS.map((project, index) => {
            const currentImg = getProjectDisplayImage(project);
            const imgFailed = failedImages[`${project.id}-${currentImg.src}`];
            const isFeatured = index === 0;

            return (
              <article
                key={project.id}
                className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#F8F9FA] ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Uncropped visual frame */}
                <div
                  className={`relative w-full overflow-hidden bg-[#0F172A] ${
                    isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  {!imgFailed ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMedia({
                          type: 'image',
                          src: currentImg.src,
                          title: project.title,
                          subtitle: currentImg.label,
                        })
                      }
                      aria-label={`Inspect ${project.title} image`}
                      className="group relative flex h-full w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1D4ED8]"
                    >
                      <img
                        src={currentImg.src}
                        alt={currentImg.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [`${project.id}-${currentImg.src}`]: true,
                          }))
                        }
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </button>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-900 p-6 text-slate-300">
                      <ImageIcon className="h-7 w-7 text-slate-400" />
                      <span className="text-xs font-medium">{project.title}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs text-slate-500">{project.category}</p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.summary}</p>
                  </div>

                  {/* Interactive image switcher / silent video launchers */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-4">
                    {project.secondaryImages && project.secondaryImages.length > 1 && (
                      <div
                        role="tablist"
                        aria-label={`Switch views for ${project.title}`}
                        className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1"
                      >
                        {project.secondaryImages.map((img, idx) => {
                          const active = (selectedGalleryImage[project.id] ?? 0) === idx;
                          return (
                            <button
                              key={img.label}
                              type="button"
                              role="tab"
                              aria-selected={active}
                              onClick={() =>
                                setSelectedGalleryImage((prev) => ({
                                  ...prev,
                                  [project.id]: idx,
                                }))
                              }
                              className={`min-h-[34px] rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                                active
                                  ? 'bg-white text-slate-900 shadow-xs'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {img.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {project.videoSrc && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMedia({
                            type: 'video',
                            src: project.videoSrc!,
                            title: project.title,
                            subtitle: project.videoLabel ?? 'Silent Project Clip',
                            poster: project.primaryImage,
                          })
                        }
                        className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                      >
                        <Play className="h-3.5 w-3.5 fill-current text-[#1D4ED8]" />
                        <span>{project.videoLabel ?? 'Watch Silent Clip'}</span>
                      </button>
                    )}

                    {project.extraVideos &&
                      project.extraVideos.map((vid) => (
                        <button
                          key={vid.src}
                          type="button"
                          onClick={() =>
                            setActiveMedia({
                              type: 'video',
                              src: vid.src,
                              title: project.title,
                              subtitle: `${vid.label} · Silent Recording`,
                              poster: vid.thumbnail,
                            })
                          }
                          className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                        >
                          <Play className="h-3.5 w-3.5 fill-current text-[#1D4ED8]" />
                          <span>{vid.label}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Viewer for Course Project Media */}
      {activeMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-6"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0B1120] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">{activeMedia.subtitle}</p>
                <h4
                  id="project-lightbox-title"
                  className="mt-0.5 truncate text-base font-semibold text-white"
                >
                  {activeMedia.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                aria-label="Close media viewer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black p-3">
              {activeMedia.type === 'video' ? (
                <video
                  key={activeMedia.src}
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="max-h-[72vh] w-full object-contain"
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[74vh] w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
