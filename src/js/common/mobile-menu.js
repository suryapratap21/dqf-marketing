/* =========================
 Mobile menu toggle for DQF
=========================== */

const mobileMenuToggle = {
  init() {
    const hamburgerButton = document.querySelector(".nav-hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeButton = mobileMenu?.querySelector(".mobile-menu-close");

    if (!hamburgerButton || !mobileMenu) {
      return;
    }

    hamburgerButton.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
      document.body.classList.add("overflow-hidden");
    });

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
        mobileMenu.classList.remove("translate-x-0");
        document.body.classList.remove("overflow-hidden");
      });
    }
  },
};

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      mobileMenuToggle.init(),
    );
  } else {
    mobileMenuToggle.init();
  }
}
