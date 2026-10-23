
document.addEventListener("DOMContentLoaded", () => {
  // Tombol promo
  const promoButton = document.querySelector("#promoButton");

  if (promoButton) {
    promoButton.addEventListener("click", () => {
      promoButton.textContent = "Promo: Beli 2 gratis tester!";
      console.log("Promo Kopi Kenangan berhasil ditampilkan.");
    });
  }

  // Hamburger menu
  const menuButton = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (menuButton && navMenu) {
    const menuIcon = menuButton.querySelector(".menu-icon");

    function closeMenu() {
      navMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Buka menu navigasi");

      if (menuIcon) {
        menuIcon.textContent = "☰";
      }
    }

    menuButton.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        navMenu.classList.add("is-open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Tutup menu navigasi");

        if (menuIcon) {
          menuIcon.textContent = "✕";
        }
      }
    });

    // Tutup menu setelah link dipilih
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Tutup menu menggunakan tombol Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Tutup menu saat kembali ke tampilan desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }
});
