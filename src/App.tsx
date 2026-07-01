import { useState, useRef, useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WorksGrid } from "./components/WorkGrid";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { UploadModal } from "./components/UploadModal";
import { useWorks } from "./hooks/Useworks";
import { SITE_CONFIG } from "./config";

// ── Set your designer password here ─────────────────────────────────────────
const DESIGNER_PASSWORD = "kelvin2024";
// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    filteredWorks,
    categories,
    activeCategory,
    setActiveCategory,
    addWork,
    removeWork,
  } = useWorks();

  const isDesigner = userEmail === SITE_CONFIG.designerEmail;

  // Auto-close login panel when clicking outside of it
  useEffect(() => {
    if (!loginVisible) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setLoginVisible(false);
        setLoginError("");
      }
    };
    // Slight delay so the toggle click doesn't immediately close it
    const t = setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginVisible]);

  const handleLogin = () => {
    const email = emailRef.current?.value?.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!email) {
      setLoginError("Please enter your email.");
      return;
    }

    const emailMatch = email === SITE_CONFIG.designerEmail;
    const passwordMatch = password === DESIGNER_PASSWORD;

    if (!emailMatch || !passwordMatch) {
      setLoginError("Incorrect email or password.");
      // Clear password field on failure
      if (passwordRef.current) passwordRef.current.value = "";
      return;
    }

    setUserEmail(email);
    setLoginVisible(false);
    setLoginError("");
  };

  return (
    <>
      <Nav
        onUploadClick={() => setModalOpen(true)}
        userEmail={userEmail}
        onLoginClick={() => {
          setLoginVisible(v => !v);
          setLoginError("");
        }}
      />

      <main>
        <Hero
          userEmail={userEmail}
          onUploadClick={() => setModalOpen(true)}
        />

        <WorksGrid
          works={filteredWorks}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onRemove={removeWork}
          isDesigner={isDesigner}
          onUploadClick={() => isDesigner && setModalOpen(true)}
        />

        <About />
        <Contact />
      </main>

      <UploadModal
        open={modalOpen && isDesigner}
        onClose={() => setModalOpen(false)}
        onAdd={addWork}
      />

      {/* Login panel — only shown when not yet authenticated */}
      {loginVisible && !isDesigner && (
        <div className="login-panel" ref={panelRef}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="login-panel__label">Designer access</p>
            <button
              className="login-panel__dismiss"
              onClick={() => { setLoginVisible(false); setLoginError(""); }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <input
            ref={emailRef}
            type="email"
            className="login-panel__input"
            placeholder="your@email.com"
            autoComplete="email"
            onKeyDown={e => e.key === "Enter" && passwordRef.current?.focus()}
          />
          <input
            ref={passwordRef}
            type="password"
            className="login-panel__input"
            placeholder="password"
            autoComplete="current-password"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />

          {loginError && (
            <p style={{ fontSize: "0.75rem", color: "var(--coral)", marginTop: "-0.25rem" }}>
              {loginError}
            </p>
          )}

          <button className="login-panel__btn" onClick={handleLogin}>
            Enter
          </button>
        </div>
      )}

      {/* Designer mode indicator */}
      {isDesigner && (
        <div className="login-panel login-panel--active">
          <p className="login-panel__label">✦ Designer mode on</p>
          <button
            className="login-panel__btn"
            onClick={() => setUserEmail(null)}
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
}