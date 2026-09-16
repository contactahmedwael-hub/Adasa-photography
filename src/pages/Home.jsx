import { useRef } from "react";
import { Link } from "react-router-dom";
import { posts, categories, siteInfo, categoryColor, categoryIcon } from "../data/postsData";
import PostCard from "../components/PostCard";

// DOM order = visually right-to-left in RTL, matching the reference's
// left-to-right reading: كاتب, تصنيفات, قارئ, مقالة
const stats = [
  { icon: "bi-journal-text", num: posts.length, label: "مقالة" },
  { icon: "bi-people", num: "10+ألف", label: "قارئ" },
  { icon: "bi-folder2", num: categories.length, label: "تصنيفات" },
  { icon: "bi-pencil", num: new Set(posts.map((p) => p.author.name)).size, label: "كاتب" },
];

const avatarSample = posts.slice(0, 3).map((p) => p.author.avatar);

function Carousel({ items }) {
  const trackRef = useRef(null);
  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return (
    <div>
      <div className="carousel-track" ref={trackRef}>
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className="carousel-nav-btn" onClick={() => scroll(1)} aria-label="التالي">
          <i className="bi bi-chevron-right"></i>
        </button>
        <button className="carousel-nav-btn" onClick={() => scroll(-1)} aria-label="السابق">
          <i className="bi bi-chevron-left"></i>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = posts.filter((p) => p.featured);
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="hero-glow pt-5 pb-4">
        <div className="container text-center py-4">
          <span className="badge-soft mb-4">
            <span className="dot"></span>
            <span className="dot" style={{ opacity: 0.5 }}></span>
            مرحباً بك في {siteInfo.name}
          </span>

          <h1 className="mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.3 }}>
            اكتشف <span className="text-accent">فن</span> التصوير الفوتوغرافي
          </h1>

          <p className="text-muted-custom mx-auto mb-4" style={{ maxWidth: 560, fontSize: "1.1rem", lineHeight: 1.9 }}>
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
            <Link to="/blog" className="btn-outline-custom">
              اعرف المزيد
            </Link>
            <Link to="/About" className="btn-accent">
              استكشف المقالات
              <i className="bi bi-arrow-left"></i>
            </Link>
          </div>

          <div className="row g-3 justify-content-center">
            {stats.map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="stat-card">
                  <div className="stat-icon"><i className={`bi ${s.icon}`}></i></div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container py-5">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <span className="badge-soft mb-3">
                <span className="dot"></span>
                <span className="dot" style={{ opacity: 0.5 }}></span>
                مميز
              </span>
              <h2 className="fs-2 mb-2">مقالات مختارة</h2>
              <p className="text-muted-custom mb-0">محتوى منتقى لبدء رحلة تعلمك</p>
            </div>
            <Link to="/blog" className="btn-outline-custom">
              عرض الكل
              <i className="bi bi-chevron-left"></i>
            </Link>
          </div>

          <div className="d-flex flex-column gap-3">
            {featured.map((post) => (
              <PostCard key={post.id} post={post} view="list" />
            ))}
          </div>
        </section>
      )}

      {/* Explore by topic */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <span className="badge-soft mb-3">
            <span className="dot"></span>
            التصنيفات
          </span>
          <h2 className="fs-2 mb-2">استكشف حسب الموضوع</h2>
          <p className="text-muted-custom">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>

        <div className="row g-3">
          {categories.map((c) => {
            const color = categoryColor(c.name);
            return (
              <div className="col-6 col-lg-3" key={c.name}>
                <Link to={`/blog?category=${encodeURIComponent(c.name)}`} className="explore-card d-block text-decoration-none">
                  <span className="explore-icon" style={{ color, background: `${color}22` }}>
                    <i className={`bi ${categoryIcon(c.name)}`}></i>
                  </span>
                  <div className="fw-semibold mb-1">{c.name}</div>
                  <div className="explore-count">{c.count} مقالة</div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest */}
      <section className="container py-5">
        <hr className="border-custom mb-5" />
        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
          <div>
            <span className="badge-soft mb-3">
              <span className="dot"></span>
              الأحدث
            </span>
            <h2 className="fs-2 mb-2">أحدث المقالات</h2>
            <p className="text-muted-custom mb-0">محتوى جديد طازج من المطبعة</p>
          </div>
          <Link to="/blog" className="text-accent fw-semibold d-flex align-items-center gap-1" style={{ fontSize: "0.9rem" }}>
            عرض جميع المقالات
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
{/* filtering here ascendingly by the date */}
        <Carousel items={[...latest].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())} />
      </section>

      {/* Newsletter */}
      <section className="container py-5">
        <div className="newsletter-box mx-auto" style={{ maxWidth: 480 }}>
          <div className="newsletter-icon-badge mx-auto mb-3">
            <i className="bi bi-envelope-fill"></i>
          </div>
          <h2 className="fs-3 mb-2">اشترك في نشرتنا الإخبارية</h2>
          <p className="text-muted-custom mb-4">
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
          </p>

          <form
            className="d-flex flex-column gap-3 mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              alert("تم الاشتراك بنجاح، شكراً لانضمامك إلينا!");
            }}
          >
            <input
              type="email"
              required
              className="form-control form-control-custom py-2 px-3"
              placeholder="أدخل بريدك الإلكتروني"
              aria-label="البريد الإلكتروني"
            />
            <button type="submit" className="btn-accent">اشترك الآن</button>
          </form>

          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap text-muted-custom mb-1" style={{ fontSize: "0.85rem" }}>
            <span>انضم لـ +10,000 مصور</span>
            <div className="avatar-stack">
              {avatarSample.map((src, i) => (
                <img key={i} src={src} alt="" />
              ))}
            </div>
            <span>بدون إزعاج</span>
          </div>
          <div className="text-center text-muted-custom" style={{ fontSize: "0.85rem" }}>
            إلغاء الاشتراك في أي وقت
          </div>
        </div>
      </section>
    </>
  );
}