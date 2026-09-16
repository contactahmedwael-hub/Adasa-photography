import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="hero-glow container py-5 my-5 text-center">
      <span className="badge-soft mb-4">
        <span className="dot"></span>
        خطأ 404
      </span>
      <h1 className="mb-3 text-accent" style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}>
        404
      </h1>
      <h3 className="mb-3">هذه الصفحة غير موجودة</h3>
      <p className="text-muted-custom mx-auto mb-4" style={{ maxWidth: 460, lineHeight: 1.9 }}>
        يبدو أن الرابط الذي تبحث عنه غير متاح أو تم نقله. تأكد من الرابط أو ارجع لصفحاتنا الرئيسية.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/" className="btn-outline-custom">
          <i className="bi bi-house"></i>
          الرئيسية
        </Link>
        <Link to="/blog" className="btn-accent">
          <i className="bi bi-arrow-left"></i>
          تصفح المدونة
        </Link>
      </div>
    </div>
  );
}