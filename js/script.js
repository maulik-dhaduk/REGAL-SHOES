let product_details = JSON.parse(localStorage.getItem("All_product")) || []
let likedItems = JSON.parse(localStorage.getItem("wishlist_product")) || [];

function Display_Product() {

  var new_arrivals = document.querySelector(".new-arrivals")
  var count = 0
  product_details.map((pro) => {
    count++

    let new_arrivals_col = document.createElement("div")
    new_arrivals_col.classList.add("col")

    new_arrivals_col.innerHTML = `
  <div class="card h-100 d-flex flex-column border-0 position-relative">

    <a class="nav-link wishlist-icon">
      <i class="bi bi-heart fs-5"></i>
    </a>

    <div class="img-wrapper rounded">
      <img
        src="${pro.image}"
        class="card-img-top go-detail" 
        alt="Product Image" 
        style="cursor: pointer;">
    </div>

    <div class="card-body d-flex flex-column p-2">
      <h6 class="mb-1">${pro.brand_name}</h6>
      <p class="small mb-1">${pro.title}</p>
      <p class="mb-1">
        <strong>${pro.offer_rate}</strong> 
        <del class="text-muted">${pro.orignal_rate}</del>
      </p>

      <button class="btn btn-dark w-100 mt-auto go-detail">View Detail</button>
    </div>

  </div>
`;


    new_arrivals_col.querySelectorAll(".go-detail").forEach(el => {
      el.addEventListener("click", () => {
        window.location.href = `product.html?id=${pro.id}`;
      });
    });


    let heartIcon = new_arrivals_col.querySelector(".bi-heart")
    let isLiked = likedItems.some(item => item.id == pro.id);


    if (isLiked) {
      heartIcon.classList.replace("bi-heart", "bi-heart-fill");
    }

    let user_login = JSON.parse(localStorage.getItem("Sign_IN_Data"))
    
    if (user_login) {
      heartIcon.addEventListener("click", (e) => {
        e.stopPropagation()
        if (heartIcon.classList.contains("bi-heart")) {
          heartIcon.classList.replace("bi-heart", "bi-heart-fill")
          likedItems = likedItems.filter(item => item.id != pro.id)
          likedItems.push(pro)

        } else {
          heartIcon.classList.replace("bi-heart-fill", "bi-heart")
          likedItems = likedItems.filter(item => item.id !== pro.id)

        }
        localStorage.setItem("wishlist_product", JSON.stringify(likedItems))
        updateLikeCounter()
      })
    }
    else {
      heartIcon.classList.replace("bi-heart-fill", "bi-heart");
      heartIcon.addEventListener("click", (e) => {
        e.stopPropagation()

        window.location.href = "sign-in.html"
      })
    }

    if (count <= 5) {
      new_arrivals.appendChild(new_arrivals_col)
    }
  })
}
Display_Product()
