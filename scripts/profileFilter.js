// public/scripts/profileFilter.js
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-perfil]");
  const profileSections = document.querySelectorAll(".profile-section");

  if (!filterButtons.length || !profileSections.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const targetProfile = button.getAttribute("data-perfil");

      // Atualiza o estado visual dos botões
      filterButtons.forEach((btn) =>
        btn.classList.remove("active", "bg-blue-600", "text-white"),
      );
      button.classList.add("active", "bg-blue-600", "text-white");

      // Alterna a visibilidade dos blocos
      profileSections.forEach((section) => {
        const supportedProfiles = section.getAttribute("data-perfis") || "";

        if (
          targetProfile === "visao-geral" ||
          supportedProfiles.includes(targetProfile)
        ) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
});
