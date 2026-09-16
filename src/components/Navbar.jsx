import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/blog", label: "المدونة" },
  { to: "/about", label: "من نحن" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close it automatically if the viewport grows back into desktop size.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar-custom sticky-top">
      <nav className="container d-flex align-items-center justify-content-between py-3 position-relative">
        <Link to="/">
          <Logo />
        </Link>

        <div className="d-none d-lg-flex align-items-center gap-1 position-absolute top-50 start-50 translate-middle">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                "pill-link" + (isActive ? " active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/blog" className="btn-accent d-none d-sm-inline-flex">
            ابدأ القراءة
          </Link>
          <Link to="/blog" className="icon-btn" aria-label="بحث">
            <i className="bi bi-search"></i>
          </Link>
          <button
            type="button"
            className="icon-btn d-lg-none"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu d-lg-none">
          <div className="container d-flex flex-column gap-1 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  "mobile-menu-link" + (isActive ? " active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/blog" className="btn-accent justify-content-center mt-2">
              ابدأ القراءة
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}