import { Link } from "react-router-dom";
import { siteInfo, team } from "../data/postsData";

const miniStats = [
  { icon: "bi-people", label: "قارئ شهرياً" },
  { icon: "bi-journal-text", label: "مقالة منشورة" },
  { icon: "bi-pencil", label: "كاتب خبير" },
  { icon: "bi-book", label: "تصنيف" },
];

const values = [
  { icon: "bi-bullseye", title: "الجودة أولاً", desc: "محتوى مدروس ومكتوب بخبرة" },
  { icon: "bi-lightning-charge-fill", title: "تركيز عملي", desc: "أمثلة واقعية يمكنك تطبيقها اليوم" },
  { icon: "bi-people-fill", title: "المجتمع", desc: "تعلم مع آلاف المصورين" },
  { icon: "bi-arrow-repeat", title: "دائماً محدث", desc: "أحدث الاتجاهات وأفضل الممارسات" },
];

export default function About() {
  return (
    <>
      {/* Mission */}
      <section className="hero-glow container py-5 text-center">
        <span className="badge-soft mb-4">
          <span className="dot"></span>
          من نحن
        </span>
        <h1 className="mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
          مهمتنا هي
        </h1>
        <p className="text-muted-custom mx-auto mb-5" style={{ maxWidth: 640, fontSize: "1.05rem", lineHeight: 2 }}>
          {siteInfo.description} نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
        </p>

        <div className="row g-3 justify-content-center">
          {miniStats.map((s) => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className="stat-card">
                <div className="stat-icon"><i className={`bi ${s.icon}`}></i></div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container py-5">
        <hr className="border-custom mb-5" />
        <h2 className="fs-2 text-center mb-4">قيمنا</h2>
        <div className="row g-3">
          {values.map((v) => (
            <div className="col-12 col-md-6" key={v.title}>
              <div className="value-card">
                <span className="value-icon">
                  <i className={`bi ${v.icon}`}></i>
                </span>
                <h5 className="mb-1">{v.title}</h5>
                <p className="text-muted-custom mb-0">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container py-5">
        <hr className="border-custom mb-5" />
        <div className="text-center mb-5">
          <span className="badge-soft mb-3">
            <span className="dot"></span>
            فريقنا
          </span>
          <h2 className="fs-2 mb-2">تعرف على كتابنا</h2>
          <p className="text-muted-custom">
            فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.
          </p>
        </div>

        <div className="row g-3">
          {team.map((member) => (
            <div className="col-6 col-md-4 col-lg-3" key={member.name}>
              <div className="team-card">
                <div className="avatar-ring-wrap mb-3">
                  <img src={member.avatar} alt={member.name} className="team-avatar" />
                  <span className="avatar-ring-dot"></span>
                </div>
                <div className="fw-bold">{member.name}</div>
                <div className="text-accent mb-2" style={{ fontSize: "0.85rem" }}>
                  {member.role}
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <span className="social-icon-sm"><i className="bi bi-linkedin"></i></span>
                  <span className="social-icon-sm"><i className="bi bi-github"></i></span>
                  <span className="social-icon-sm"><i className="bi bi-twitter-x"></i></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA - Updated */}
<section className="container-fluid cta-banner py-5 text-center rounded-3">
  <div className="row justify-content-center">
    <div className="col-12 col-md-10 col-lg-8">
      
      {/* Heading */}
      <h2 className="cta-title mb-3" style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: '700' }}>
        لديك أسئلة؟ دعنا نتحدث!
      </h2>

      {/* Description */}
      <p className="cta-description mx-auto mb-5" style={{ maxWidth: 600, lineHeight: 1.9 }}>
        نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو تريد فقط إلقاء التحية، لا تتردد في التواصل.
      </p>

      {/* Buttons Wrapper - Centered within the content column */}
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        
        {/* Primary Button (Solid Orange) */}
        <a href={`mailto:${siteInfo.email}`} className="btn btn-cta-primary d-flex align-items-center gap-2">
          تواصل معنا
          {/* Simple SVG for the email icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>

        {/* Secondary Button (Orange Outline) */}
        <Link to="/blog" className="btn btn-cta-secondary">
          تصفح المقالات
        </Link>
      </div>

    </div>
  </div>
</section>
    </>
  );
}