import raw from "./posts.json";

export const posts = raw.posts;
export const categories = raw.categories;
export const siteInfo = raw.siteInfo;

// Map the JSON's semantic color names to real hex values from our theme.
export const CATEGORY_COLORS = {
  emerald: "#3FA772",
  purple: "#9B7EDE",
  blue: "#5B9BD9",
  orange: "#E2924A",
};

export function categoryColor(categoryName) {
  const found = categories.find((c) => c.name === categoryName);
  return found ? CATEGORY_COLORS[found.color] || "#D9A441" : "#D9A441";
}

export const CATEGORY_ICONS = {
  "إضاءة": "bi-lightbulb",
  "بورتريه": "bi-person",
  "مناظر طبيعية": "bi-tree",
  "تقنيات": "bi-sliders",
  "معدات": "bi-camera2",
};

export function categoryIcon(categoryName) {
  return CATEGORY_ICONS[categoryName] || "bi-tag";
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post, count = 3) {
  return posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, count);
}

export function formatDate(dateStr) {
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

// The "team" is just the set of unique post authors, each already carrying
// a name, role and real avatar in posts.json — no separate/fabricated data.
export const team = Array.from(
  new Map(posts.map((p) => [p.author.name, p.author])).values()
);