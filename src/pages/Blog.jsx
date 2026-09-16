import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { posts, categories } from "../data/postsData";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

const PER_PAGE = 6;

// Visual order (left→right) is: جميع المقالات, إضاءة, بورتريه, مناظر طبيعية, تقنيات, معدات
// In RTL the first DOM item renders rightmost, so the DOM order is the reverse.
const filterChips = [...categories].reverse();

export default function Blog() {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") || "";
  const category = params.get("category") || "";
  const view = params.get("view") || "grid";
  const page = parseInt(params.get("page") || "1", 10);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next);
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category ? post.category === category : true;
      const q = search.trim().toLowerCase();
      const matchesSearch = q
        ? post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q))
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) updateParam("page", String(safePage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div className="container py-5">
      <div className="hero-glow pt-2 pb-1 mb-3">
      <div className="text-center mb-4">
        <span className="badge-soft mb-3">
          <i className="bi bi-journal-bookmark"></i>
          مدونتنا
        </span>
        <h1 className="mb-2" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
          استكشف
        </h1>
        <p className="text-muted-custom">
          اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
        </p>
      </div>

      {/* Search */}
      <div className="position-relative mb-3 mx-auto" style={{ maxWidth: 720 }}>
        <i
          className="bi bi-search position-absolute top-50 translate-middle-y"
          style={{ left: "1.1rem", color: "var(--text-faint)" }}
        ></i>
        <input
          type="search"
          className="form-control form-control-custom py-2"
          style={{ paddingLeft: "2.5rem" }}
          placeholder="ابحث في المقالات..."
          value={search}
          onChange={(e) => updateParam("q", e.target.value)}
          aria-label="ابحث في المقالات"
        />
      </div>

      {/* Category chip filter (buttons, not a nav/tabs component) */}
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-4">
        <button
          className={`category-filter-all ${category === "" ? "active" : ""}`}
          onClick={() => updateParam("category", "")}
        >
          جميع المقالات
        </button>
        {filterChips.map((c) => (
          <button
            key={c.name}
            className={`category-filter-chip ${category === c.name ? "active" : ""}`}
            onClick={() => updateParam("category", c.name)}
          >
            {c.name}
          </button>
        ))}
      </div>
      </div>

      <hr className="border-custom mb-4" />

      {/* Count + view toggle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="text-muted-custom">
          عرض {filtered.length} {filtered.length === 1 ? "مقالة" : "مقالات"}
        </span>
        <div className="d-flex">
          <button
            className={`view-toggle-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => updateParam("view", "grid")}
            aria-label="عرض شبكي"
            aria-pressed={view === "grid"}
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button
            className={`view-toggle-btn ${view === "list" ? "active" : ""}`}
            onClick={() => updateParam("view", "list")}
            aria-label="عرض قائمة"
            aria-pressed={view === "list"}
          >
            <i className="bi bi-list-ul"></i>
          </button>
        </div>
      </div>

      {/* Results */}
      {paginated.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-camera text-accent" style={{ fontSize: "2.5rem" }}></i>
          <h4 className="mt-3">لا توجد نتائج</h4>
          <p className="text-muted-custom">جرّب كلمة بحث أخرى أو تصنيفاً مختلفاً.</p>
        </div>
      ) : view === "grid" ? (
        <div className="row g-4">
          {paginated.map((post) => (
            <div className="col-12 col-sm-6 col-lg-4" key={post.id}>
              <PostCard post={post} view="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {paginated.map((post) => (
            <PostCard key={post.id} post={post} view="list" />
          ))}
        </div>
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onChange={(p) => updateParam("page", String(p))}
      />
      {totalPages > 1 && (
        <p className="text-center text-muted-custom mt-3 mb-0" style={{ fontSize: "0.85rem" }}>
          صفحة {safePage} من {totalPages}
        </p>
      )}
    </div>
  );
}