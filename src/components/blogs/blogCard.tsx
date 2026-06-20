"use client";

import { FaRegClock } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CachedBlogImage from "./CachedBlogImage";

type Blog = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  category?: string;
  image?: string;
  categoryColor?: string;
  tags?: string[];
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const router = useRouter();

  // Ensure slug exists before rendering link
  if (!blog.slug) {
    return null;
  }

  const authorSlug = blog.author?.name ? blog.author.name.replace(/\s+/g, "-").toLowerCase() : "";

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authorSlug) {
      router.push(`/author/${authorSlug}`);
    }
  };

  return (
    <section className="border border-gray-200 rounded-[0.1rem] p-[0.3rem] bg-white transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_0.4rem_0.8rem_rgba(0,0,0,0.08)]">
      <Link
        href={`/blog/${blog.slug}`}
        className="block bg-white border border-gray-200 rounded-[0.1rem] overflow-hidden shadow-[0_0.2rem_0.5rem_rgba(0,0,0,0.05)] text-left transition-all duration-300 cursor-pointer max-[768px]:max-w-full"
      >
        {/* === Image === */}
        <div className="w-full aspect-video overflow-hidden relative bg-[#f9f9f9] max-[768px]:aspect-[16/10]">
          <CachedBlogImage
            src={blog.image || ""}
            alt={blog.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-300 block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* === Content === */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-[0.9rem] font-bold text-[#f78b5d] uppercase mb-2 bg-transparent">
            {(blog.category || "").toUpperCase()}
          </p>

          <h3 className="text-[1.2rem] font-bold text-[#111] mb-2.5 leading-[1.4] line-clamp-2">{blog.title}</h3>

          {/* Author */}
          <p className="text-[0.9rem] text-[#666] mb-2">
            {blog.author?.name ? (
              <>
                By{" "}
                <span
                  onClick={handleAuthorClick}
                  className="font-semibold text-[#111] hover:text-[#f97316] transition-colors cursor-pointer"
                >
                  {blog.author.name}
                </span>
              </>
            ) : (
              <>By <span className="font-semibold text-[#111]">Debashri Mandal</span></>
            )}
          </p>

          <p className="text-base text-[#555] mb-1 leading-[1.4] line-clamp-3">
            {blog.excerpt}
          </p>


          <div className="flex flex-row gap-5 text-[0.95rem] text-[#777] font-medium">
            <span>
              <div className="flex flex-row items-center">
                <BsCalendarEvent className="text-[#ff4c00] mr-1.5 align-middle text-[0.8rem]" />
                <p>{blog.date}</p>
              </div>
            </span>
            <span>
              <div className="flex flex-row items-center">
                <FaRegClock className="text-[#ff4c00] mr-1.5 align-middle text-[0.8rem]" />
                <p>{blog.readTime ? blog.readTime.toUpperCase() : ""} READ</p>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
