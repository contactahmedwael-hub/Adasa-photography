import { Link } from "react-router-dom";
import { categoryColor, formatDate } from "../data/postsData";

export default function PostCard({ post, view = "grid", size = "md" }) {
  const color = categoryColor(post.category);
  const isList = view === "list";

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`card-post ${isList ? "list-layout" : ""} ${size === "lg" ? "card-post-lg" : ""} text-decoration-none`}
    >
      <div className="position-relative list-img-wrap">
        <img src={post.image} alt={post.title} className="post-img" loading="lazy" />
        {post.featured && (
          <span className="featured-ribbon">
            <i className="bi bi-star-fill"></i>
            مميز
          </span>
        )}
      </div>

      <div className={`p-3 ${size === "lg" ? "p-md-4" : "p-md-3"} d-flex flex-column flex-grow-1`}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span
            className="category-chip"
            style={{ color, borderColor: color, background: "transparent", border: "1px solid" }}
          >
            {post.category}
          </span>
          <span className="text-muted-custom d-flex align-items-center gap-1" style={{ fontSize: "0.78rem" }}>
            <i className="bi bi-clock"></i>
            {post.readTime}
          </span>
        </div>

        <h5 className={size === "lg" ? "fs-4 mb-2" : "mb-2"} style={{ lineHeight: 1.5 }}>
          {post.title}
        </h5>

        <p className="text-muted-custom mb-3" style={{ fontSize: "0.92rem", lineHeight: 1.8 }}>
          {post.excerpt}
        </p>

        <hr className="border-custom mt-auto mb-3 opacity-100" />

        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              width={30}
              height={30}
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
            <div style={{ fontSize: "0.8rem", lineHeight: 1.3 }}>
              <div className="text-white-50 fw-semibold">{post.author.name}</div>
              <div className="text-muted-custom">{formatDate(post.date)}</div>
            </div>
          </div>

          <span className="text-accent fw-semibold d-flex align-items-center gap-1" style={{ fontSize: "0.88rem" }}>
            <i className="bi bi-arrow-left"></i>
            اقرأ المقال
          </span>
        </div>
      </div>
    </Link>
  );
}