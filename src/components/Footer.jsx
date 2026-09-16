import { Link } from "react-router-dom";
import Logo from "./Logo";
import { categories, siteInfo } from "../data/postsData";

const socialIcons = {
  youtube: "bi-youtube",
  linkedin: "bi-linkedin",
  github: "bi-github",
  twitter: "bi-twitter-x",
};

export default function Footer() {
  return (
    <footer className="footer-custom mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <Logo />
            <p className="text-muted-custom mt-3" style={{ maxWidth: 280, lineHeight: 1.9 }}>
              {siteInfo.description}
            </p>
            <div className="d-flex gap-2 mt-3">
              {Object.entries(siteInfo.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="d-inline-flex align-items-center justify-content-center border border-custom rounded-circle"
                  style={{ width: 38, height: 38, color: "var(--text-muted)" }}
                >
                  <i className={`bi ${socialIcons[key] || "bi-link-45deg"}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="mb-3">استكشف</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-muted-custom">
              <li><Link to="/" className="pill-link p-0">الرئيسية</Link></li>
              <li><Link to="/blog" className="pill-link p-0">المدونة</Link></li>
              <li><Link to="/about" className="pill-link p-0">من نحن</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="mb-3">التصنيفات</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-muted-custom">
              {categories.map((c) => (
                <li key={c.name}>
                  <Link to={`/blog?category=${encodeURIComponent(c.name)}`} className="pill-link p-0">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="mb-3">ابقى على اطلاع</h6>
            <p className="text-muted-custom mb-3" style={{ fontSize: "0.9rem" }}>
              اشترك للحصول على أحدث المقالات والتحديثات.
            </p>
            <form
              className="d-flex flex-column flex-sm-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                e.target.reset();
                alert("تم الاشتراك بنجاح!");
              }}
            >
              <input
                type="email"
                required
                className="form-control form-control-custom py-2 px-3"
                placeholder="أدخل بريدك الإلكتروني"
                aria-label="البريد الإلكتروني"
              />
              <button type="submit" className="btn-accent">اشترك</button>
            </form>
          </div>
        </div>

        <hr className="border-custom mt-5 mb-3" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center">
          <p className="text-muted-custom mb-0" style={{ fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} {siteInfo.name}. صنع بكل ❤️. جميع الحقوق محفوظة.
          </p>
          <div className="d-flex gap-3 text-muted-custom" style={{ fontSize: "0.85rem" }}>
            <span style={{ cursor: "default" }}>سياسة الخصوصية</span>
            <span style={{ cursor: "default" }}>شروط الخدمة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}