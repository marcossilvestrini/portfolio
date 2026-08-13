// Profile filtering functionality for portfolio website
document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.querySelector(".nav-filters");
  if (!filterContainer) return;

  // Cache DOM elements for better performance
  const filterButtons = filterContainer.querySelectorAll("[data-perfil]");
  const filterableItems = document.querySelectorAll(".exp-item, .skill-item");

  // Centralized function to handle all filtering logic
  function handleFilter(profile) {
    // Update active button state
    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.perfil === profile);
    });

    // Filter content items by toggling a CSS class
    filterableItems.forEach((item) => {
      const itemProfiles = item.dataset.perfis?.split(",") || [];
      const isVisible = profile === "todos" || itemProfiles.includes(profile);
      item.classList.toggle("hidden", !isVisible);
    });
  }

  // Use event delegation for button clicks
  filterContainer.addEventListener("click", function (e) {
    const button = e.target.closest("[data-perfil]");
    if (!button) return;

    e.preventDefault();
    const profile = button.dataset.perfil;
    handleFilter(profile);

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?perfil=${profile}`;
    window.history.pushState({ profile }, "", newUrl);
  });

  // Handle browser back/forward navigation
  window.addEventListener("popstate", (e) => {
    const profile =
      e.state?.profile ||
      new URLSearchParams(window.location.search).get("perfil") ||
      "todos";
    handleFilter(profile);
  });

  // Initial filter on page load
  const initialProfile =
    new URLSearchParams(window.location.search).get("perfil") || "todos";
  handleFilter(initialProfile);
  // Store initial state for popstate to work correctly on the first back navigation
  window.history.replaceState(
    { profile: initialProfile },
    "",
    window.location.href,
  );
});
