(function () {
  const toggleBtn = document.querySelector(".toggle_btn");
  const toggleBtnIcon = document.querySelector(".toggle_btn i");
  const dropDownMenu = document.querySelector(".dropdown_menu");
  const logged = document.querySelector(".logged");

  const overlay = document.querySelector('.overlay-user');

  toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle("open");

    const isOpen = dropDownMenu.classList.contains("open");

    toggleBtnIcon.classList = isOpen ? "bx bx-x" : "bx bx-menu";

    if (isOpen) {
      overlay.style.display = "none";
      console.log("entor aqui");
    } else {
      overlay.style.display = "block";
      console.log("entro acasa");
    }
  };
})();
