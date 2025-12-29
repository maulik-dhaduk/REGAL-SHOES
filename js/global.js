fetch("header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;

    document.querySelector(".admin-add-product").style.display = "none"

  let user_login = JSON.parse(localStorage.getItem("Sign_IN_Data"))
    
  if(user_login && user_login.roll_type == "admin"){
    document.querySelector(".admin-add-product").style.display = "block"
  }
    document.querySelectorAll(".dropdown").forEach(drop => {


      drop.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
        item.addEventListener("click", function (e) {
          e.preventDefault();

          const mainCategory = drop.querySelector(".nav-link .nav-text").textContent.trim();
          const subCategory = item.textContent.trim();

          if (subCategory != mainCategory) {
            window.location.href = `filter_product.html?subcategory=${encodeURIComponent(subCategory)}`;
          }

        });
      });

    });
    updateLikeCounter()
    updateCartCounter()

    const searchBtnMobile = document.getElementById("searchBtnMobile");
    const searchBtnDesktop = document.getElementById("searchBtnDesktop");

    if (searchBtnMobile) {
      searchBtnMobile.addEventListener("click", () => searchProduct("mobile"));
    }

    if (searchBtnDesktop) {
      searchBtnDesktop.addEventListener("click", () => searchProduct("desktop"));
    }


    const userBtn = document.getElementById("userBtn");
    if (userBtn) {
      userBtn.addEventListener("click", updateUserMenu);

      userBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelector(".user-menu").classList.toggle("show");
      });
    }


    document.addEventListener("click", function (e) {
      const userMenu = document.querySelector(".user-menu");
      if (!userMenu) return;

      if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove("show");
      }
    });


    document.querySelectorAll('.nav-item.dropdown:not(.useradd)').forEach(drop => {
      drop.addEventListener('mouseenter', () => {
        document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show')
          .forEach(menu => menu.classList.remove('show'));
      });
      drop.addEventListener('mouseleave', () => {
        if (!drop.matches(':hover')) {
          drop.querySelector('.dropdown-menu')?.classList.remove('show');
        }
      });
    });
  });


fetch("footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          backToTopBtn.style.display = "flex";
        } else {
          backToTopBtn.style.display = "none";
        }
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  });


function searchProduct(type) {
  let inputId = type === "mobile" ? "searchInputMobile" : "searchInputDesktop";

  const query = document.getElementById(inputId).value.trim();

  if (query) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
}


function updateLikeCounter() {


  let likedItems = JSON.parse(localStorage.getItem("wishlist_product")) || []
  let counter_nav = document.querySelector(".like-counter")
  let user_login = JSON.parse(localStorage.getItem("Sign_IN_Data"))

  if (user_login) {
    counter_nav.textContent = likedItems.length
    counter_nav.style.display = likedItems.length > 0 ? "inline-block" : "none"
  } else {
    counter_nav.style.display = "none"
  }

}

function updateCartCounter() {

  let cartItems = JSON.parse(localStorage.getItem("cart_product")) || []
  let cart_counter_nav = document.querySelector(".cart-counter")
  let user_login = JSON.parse(localStorage.getItem("Sign_IN_Data"))

  if (user_login) {
    cart_counter_nav.textContent = cartItems.length
    cart_counter_nav.style.display = cartItems.length > 0 ? "inline-block" : "none"
  } else {
    cart_counter_nav.style.display = "none"
  }


}


function updateUserMenu() {
  let currentUser = JSON.parse(localStorage.getItem("Sign_IN_Data"));
  let dropdown_menu = document.querySelector(".user-menu");

  if (!dropdown_menu) return;

  dropdown_menu.innerHTML = "";

  if (currentUser) {
    dropdown_menu.innerHTML = `
      <li><span class="dropdown-item-text fw-bold">${currentUser.username}</span></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="index.html" id="logoutBtn"><span class="nav-text">Logout</span></a></li>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("Sign_IN_Data");
      window.location.reload();
    });

  } else {
    dropdown_menu.innerHTML = `
      <li><a class="dropdown-item" href="sign-in.html"><span class="nav-text">Login</span></a></li>
      <li><a class="dropdown-item" href="sign-up.html"><span class="nav-text">Create Account</span></a></li>
    `;
  }
}



document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }
});

window.addEventListener("load", () => {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});
