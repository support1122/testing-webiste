import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts } from "@/src/data/blogsData";
import AuthorProfile from "@/src/components/blogs/AuthorProfile";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";

type Props = {
  params: {
    name: string;
  };
};

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = new Map<string, { name: string; bio: string }>();

  blogPosts.forEach((post) => {
    if (post && post.author?.name) {
      if (!authors.has(post.author.name)) {
        authors.set(post.author.name, {
          name: post.author.name,
          bio: post.author.bio || "",
        });
      }
    }
  });

  return Array.from(authors.values()).map((author) => ({
    name: author.name.replace(/\s+/g, "-").toLowerCase(),
  }));
}

// Generate metadata for author page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decodedName = name.replace(/-/g, " ");

  // Find author by matching name (case-insensitive)
  const authorPosts = blogPosts.filter(
    (post): post is NonNullable<typeof post> => !!post && post.author?.name?.toLowerCase() === decodedName.toLowerCase()
  );

  if (authorPosts.length === 0) {
    return {
      title: "Author Not Found | Flashfire",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const firstPost = authorPosts[0];
  const author = firstPost!.author!;
  const authorName = author.name;

  return {
    title: `${authorName} - Author Profile | Flashfire Blog`,
    description: author.bio || `Read articles by ${authorName} on Flashfire Blog`,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.flashfirejobs.com/author/${name}`,
    },
    openGraph: {
      title: `${authorName} - Author Profile`,
      description: author.bio || `Read articles by ${authorName}`,
      url: `https://www.flashfirejobs.com/author/${name}`,
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { name } = await params;
  const decodedName = name.replace(/-/g, " ");

  // Find all posts by this author (case-insensitive match)
  const authorPosts = blogPosts.filter(
    (post): post is NonNullable<typeof post> => !!post && post.author?.name?.toLowerCase() === decodedName.toLowerCase()
  );

  if (authorPosts.length === 0) {
    return notFound();
  }

  const firstPost = authorPosts[0];
  const author = firstPost!.author!;

  return (
    <>
      <Navbar />
      <AuthorProfile author={author} posts={authorPosts} />
      <Footer />
    </>
  );
}
