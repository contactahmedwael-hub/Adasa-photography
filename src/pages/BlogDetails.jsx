import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getPostBySlug, getRelatedPosts, categoryColor, formatDate } from "../data/postsData";
import PostCard from "../components/PostCard";

function renderContent(content) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.replace("## ", "")}</h2>;
    }
    return <p key={i}>{block}</p>;
  });
}

export default function BlogDetails() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/404" replace />;

  const color = categoryColor(post.category);
  const related = getRelatedPosts(post);

  return (
    <div className="container py-5">
      <div className="hero-glow pt-2 pb-3">
      <div className="mb-4">
        <Link to="/blog" className="text-muted-custom">
          <i className="bi bi-arrow-right ms-1"></i>
          الرجوع للمدونة
        </Link>
      </div>

      <div className="mx-auto" style={{ maxWidth: 760 }}>
        <span
          className="category-chip mb-3"
          style={{ color, background: `${color}22` }}
        >
          <span className="dot" style={{ background: color }}></span>
          {post.category}
        </span>

        <h1 className="mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.5 }}>
          {post.title}
        </h1>

        <div className="d-flex align-items-center gap-2 text-muted-custom mb-4 flex-wrap">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
          <div>
            <div className="text-white-50 fw-semibold">{post.author.name}</div>
            <div style={{ fontSize: "0.8rem" }}>{post.author.role}</div>
          </div>
          <span className="divider-dot ms-2"></span>
          <span>{formatDate(post.date)}</span>
          <span className="divider-dot"></span>
          <span>{post.readTime}</span>
        </div>
      </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 760 }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-100 mb-4"
          style={{ borderRadius: "var(--radius-md)", aspectRatio: "16/8", objectFit: "cover" }}
        />

        <div className="prose-content">{renderContent(post.content)}</div>

        <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-custom">
          {post.tags.map((tag) => (
            <span key={tag} className="category-chip" style={{ color: "var(--text-muted)" }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-5 pt-4">
          <h2 className="fs-4 mb-4 text-center">مقالات ذات صلة</h2>
          <div className="row g-4">
            {related.map((r) => (
              <div className="col-12 col-md-4" key={r.id}>
                <PostCard post={r} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}