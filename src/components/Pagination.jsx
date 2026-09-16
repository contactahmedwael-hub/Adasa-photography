export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Reference layout reads left-to-right as: prev, 5 4 3 2 1, next.
  // In RTL the first DOM child renders rightmost, so putting "next" first
  // and "prev" last in the DOM produces that visual order.
  return (
    <nav className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-5" aria-label="تصفح الصفحات">
      <button
        className="page-btn page-btn-round"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        aria-label="الصفحة التالية"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === currentPage ? "active" : ""}`}
          onClick={() => onChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn page-btn-round"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        aria-label="الصفحة السابقة"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </nav>
  );
}