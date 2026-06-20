/**
 * Utility functions for converting between category names and URL slugs
 */

/**
 * Converts a category name to a URL-friendly slug
 * Example: "Career Advice" -> "career-advice"
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Converts a slug back to its original category name
 * Example: "career-advice" -> "Career Advice"
 */
export function slugToCategory(slug: string): string {
  const categoryMap: Record<string, string> = {
    "career-advice": "Career Advice",
    "job-search-strategy": "Job Search Strategy",
    "success-stories": "Success Stories",
    "visa-and-immigration": "Visa & Immigration",
    "visa-immigration": "Visa & Immigration",
    "career-planning": "Career Planning",
    "finance-and-admissions": "Finance & Admissions",
    "international-students": "International Students",
    "interview-preparation": "Interview Preparation",
  };
  
  // Check if slug exists in map
  if (categoryMap[slug]) {
    return categoryMap[slug];
  }
  
  // Fallback: convert slug to title case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Returns all category slugs
 */
export function getAllCategorySlugs(): string[] {
  const categories = [
    "Career Advice",
    "Job Search Strategy",
    "Success Stories",
    "Visa & Immigration",
    "Career Planning",
    "Finance & Admissions",
    "International Students",
  ];
  return categories.map(categoryToSlug);
}

/**
 * Converts a tag name to a URL-friendly slug
 * Example: "Career Advice" -> "career-advice"
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Converts a tag slug back to its original tag name
 * Example: "career-advice" -> "Career Advice"
 */
export function slugToTag(slug: string): string {
  // Fallback: convert slug to title case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

