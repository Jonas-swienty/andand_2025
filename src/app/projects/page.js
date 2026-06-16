"use client";

import Link from "next/link";

export default function ProjectsPage() {
    // Static placeholder data until Sanity is connected
    const projects = [
        { id: 1, title: "Copenhagen Office", subtitle: "Workspace Design", images: ["/images/left-1.jpg", "/images/right-1.jpg", "/images/left-2.jpg"] },
        { id: 2, title: "New York Retail", subtitle: "Commercial Interior", images: ["/images/right-2.jpg", "/images/left-4.jpg", "/images/right-3.jpg"] },
        { id: 3, title: "Tokyo Installation", subtitle: "Spatial Design", images: ["/images/left-5.jpg", "/images/Right-6.png", "/images/left-1.jpg"] },
    ];

    return (
        <div className="min-h-screen bg-transparent w-full">
            {/* Top Navbar elements */}
            <Link href="/" className="nav-text projects-text nav-link fixed top-4 right-[9rem] z-50 text-white font-bold mix-blend-exclusion">
                home
            </Link>

            {/* Main scrolling container - will be converted to infinite scroll later */}
            <main className="pt-32 pb-32 px-4 md:px-16 max-w-7xl mx-auto flex flex-col gap-32">
                {projects.map((project) => (
                    <div key={project.id} className="flex flex-col gap-4">
                        <div className="flex flex-col text-white mix-blend-exclusion z-10 mb-4 px-4 border-l-2 border-white">
                            <h2 className="text-3xl font-bold font-['AkkuratPro']">{project.title}</h2>
                            <p className="text-xl opacity-80 font-['AkkuratPro']">{project.subtitle}</p>
                            <button className="mt-2 text-left underline w-max hover:opacity-70 transition-opacity">
                                Read project story
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
                            {project.images.map((img, idx) => (
                                <div key={idx} className="min-w-[80vw] md:min-w-[60vw] lg:min-w-[40vw] h-[50vh] flex-shrink-0 snap-center relative">
                                    <img
                                        src={img}
                                        alt={`${project.title} - ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Logo */}
            <div className="logo mix-blend-exclusion fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-white pointer-events-none opacity-10">
                &amp;&amp;
            </div>
        </div>
    );
}
