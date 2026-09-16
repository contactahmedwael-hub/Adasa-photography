export default function Logo({ withTagline = true, size = 30 }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="text-end">
        <div className="fw-bold fs-4 lh-1">عدسة</div>
        {withTagline && (
          <div className="text-muted-custom" style={{ fontSize: "0.7rem" }}>
            عالم التصوير الفوتوغرافي
          </div>
        )}
      </div>
      <img src="/imgi_1_logo-GdqARQRt.png" alt="عدسة" width={size} height={size} style={{ objectFit: "contain" }} />
    </div>
  );
}