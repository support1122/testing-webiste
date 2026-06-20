import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/src/data/blogsData";

export const metadata: Metadata = {
  title: "HTML Sitemap - All Pages | Flashfire",
  description: "Complete list of all pages and blog posts on Flashfire",
  robots: {
    index: true,
    follow: true,
  },
};

export default function HTMLSitemapPage() {
  const staticPages = [
    { url: "/", title: "Home" },
    { url: "/pricing", title: "Pricing" },
    { url: "/blog", title: "Blog" },
    { url: "/blogs", title: "Blogs" },
    { url: "/features", title: "Features" },
    { url: "/feature", title: "Feature" },
    { url: "/faq", title: "FAQ" },
    { url: "/testimonials", title: "Testimonials" },
    { url: "/image-testimonials", title: "Image Testimonials" },
    { url: "/employers", title: "Employers" },
    { url: "/about-us", title: "About Us" },
    { url: "/contact-us", title: "Contact Us" },
    { url: "/how-it-works", title: "How It Works" },
    { url: "/how-flashfire-ai-job-automation-platform-works", title: "How Flashfire's AI Job Automation Platform Works" },
    { url: "/talk-to-an-expert", title: "Talk to an Expert" },
    { url: "/see-flashfire-in-action", title: "See Flashfire in Action" },
    { url: "/book-my-demo-call", title: "Book My Demo Call" },
    { url: "/privacy-policy", title: "Privacy Policy" },
    { url: "/terms-of-service", title: "Terms of Service" },
    { url: "/refund-policy", title: "Refund Policy" },
    { url: "/payment-policy", title: "Payment Policy" },
  ];

  const validBlogPosts = blogPosts.filter(
    (post) => post?.slug && typeof post.slug === "string" && post.slug.trim() !== "" && post.slug !== "undefined"
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>HTML Sitemap</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Complete list of all pages and blog posts on Flashfire. This page helps search engines discover all content.
      </p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", borderBottom: "2px solid #f97316", paddingBottom: "0.5rem" }}>
          Static Pages ({staticPages.length})
        </h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.5rem" }}>
          {staticPages.map((page) => (
            <li key={page.url}>
              <Link
                href={page.url}
                style={{
                  display: "block",
                  padding: "0.5rem",
                  color: "#2563eb",
                  textDecoration: "none",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", borderBottom: "2px solid #f97316", paddingBottom: "0.5rem" }}>
          Blog Posts ({validBlogPosts.length})
        </h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.75rem" }}>
          {validBlogPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  padding: "0.75rem",
                  color: "#2563eb",
                  textDecoration: "none",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "0.25rem", color: "#111" }}>{post.title}</strong>
                <span style={{ fontSize: "0.875rem", color: "#666" }}>{post.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb", textAlign: "center", color: "#666" }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p style={{ marginTop: "0.5rem" }}>
          <Link href="/sitemap.xml" style={{ color: "#2563eb", textDecoration: "none" }}>
            View XML Sitemap
          </Link>
        </p>
      </footer>
    </div>
  );
}

