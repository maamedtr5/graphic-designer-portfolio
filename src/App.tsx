import { useState, useRef } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WorksGrid } from "./components/WorkGrid";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { UploadModal } from "./components/UploadModal";
import { useWorks } from "./hooks/Useworks";
import { SITE_CONFIG } from "./config";


export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    filteredWorks,
    categories,
    activeCategory,
    setActiveCategory,
    addWork,
    removeWork,
  } = useWorks();

  const isDesigner = userEmail === SITE_CONFIG.designerEmail;

  const handleLogin = () => {
    const val = emailRef.current?.value?.trim() ?? "";
    if (val) {
      setUserEmail(val);
      setLoginVisible(false);
    }
  };

  return (
    <>
      <Nav
        onUploadClick={() => setModalOpen(true)}
        userEmail={userEmail}
        onLoginClick={() => setLoginVisible(v => !v)}
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

    
      {loginVisible && !isDesigner && (
        <div className="login-panel">
          <p className="login-panel__label">Designer access</p>
          <input
            ref={emailRef}
            type="email"
            className="login-panel__input"
            placeholder="your@email.com"
            autoComplete="email"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          <button className="login-panel__btn" onClick={handleLogin}>
            Enter ✦
          </button>
        </div>
      )}

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