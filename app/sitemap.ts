import { MetadataRoute } from 'next'
import { blogPosts } from '@/src/data/blogsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flashfirejobs.com'
  
  // Filter and map blog posts to sitemap entries
  const blogUrls: MetadataRoute.Sitemap = blogPosts
    .filter((post) => {
      // Ensure post has a valid slug
      return post?.slug && 
             typeof post.slug === 'string' && 
             post.slug.trim() !== '' && 
             post.slug !== 'undefined'
    })
    .map((post) => {
      const lastUpdated = post.lastUpdated || post.date || new Date().toISOString().split('T')[0]
      // Parse date safely - handle various formats
      let lastModified: Date
      try {
        lastModified = new Date(lastUpdated)
        // If date is invalid, use current date
        if (isNaN(lastModified.getTime())) {
          lastModified = new Date()
        }
      } catch {
        lastModified = new Date()
      }
      
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  
  // Log for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Sitemap] Generated ${blogUrls.length} blog URLs`)
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
   
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/image-testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/employers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/talk-to-an-expert`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/see-flashfire-in-action`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-my-demo-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/how-flashfire-ai-job-automation-platform-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sitemap-html`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }
  ]

  // Combine and return all routes
  return [...staticRoutes, ...blogUrls]
}
