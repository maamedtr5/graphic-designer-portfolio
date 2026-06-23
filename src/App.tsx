import { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WorksGrid } from "./components/WorkGrid";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { useWorks } from "./hooks/useWorks";
import { SITE_CONFIG } from "./config";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const {
    filteredWorks,
    categories,
    activeCategory,
    setActiveCategory,
    addWork,
    removeWork,
  } = useWorks();

  // Designer-only guard
  const isDesigner = userEmail === SITE_CONFIG.designerEmail;

  return (
    <>
      {/* Navbar hides Upload unless designer */}
      <Nav
        onUploadClick={() => setModalOpen(true)}
        userEmail={userEmail}
      />

      <main>
        {/* Hero can show designer-only upload shortcut */}
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
          // Only allow upload if designer
          onUploadClick={() => isDesigner && setModalOpen(true)}
        />

        <About />
        <Contact />
      </main>

      {/* Simple login form to set userEmail */}
      <form
  onSubmit={(e) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    setUserEmail(email);
  }}
>
  <input
    type="email"
    name="email"
    id="email"
    placeholder="Enter your email"
    autoComplete="email"
  />
  <button type="submit" className="login-btn">Login</button>
</form>

    </>
  );
}
