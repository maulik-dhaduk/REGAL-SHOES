let edit = null
var Product_Image = ""
var Sub_Images = []

document.getElementById("proimage").addEventListener("change", (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      Product_Image = e.target.result
    }
    reader.readAsDataURL(file)
  }
})

document.getElementById("sub_images").addEventListener("change", (event) => {
  const files = event.target.files;
  Sub_Images = []

  Array.from(files).forEach((file) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      Sub_Images.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
})


function loadDropdowns() {
  let products = JSON.parse(localStorage.getItem("All_product")) || [];

  const categories = [...new Set(products.map(p => p.category))];

  const categoryDropdown = document.getElementById("category_dropdown");
  categoryDropdown.innerHTML = `<option value="">Select Category</option>`;

  categories.forEach(cat => {
    categoryDropdown.innerHTML += `<option value="${cat}">${cat}</option>`;
  });



  categoryDropdown.addEventListener("change", function () {
    const selectedCat = this.value;

    const subCats = [
      ...new Set(
        products
          .filter(p => p.category === selectedCat)
          .map(p => p.sub_category)
      )
    ];

    const subCatDropdown = document.getElementById("sub_category_dropdown");
    subCatDropdown.innerHTML = `<option value="">Select Sub Category</option>`;

    subCats.forEach(sub => {
      subCatDropdown.innerHTML += `<option value="${sub}">${sub}</option>`;
    });


    document.getElementById("brand_dropdown").innerHTML =
      `<option value="">Select Brand</option>`;
  });




  document.getElementById("sub_category_dropdown").addEventListener("change", function () {
    const selectedSubCat = this.value;

    const brands = [
      ...new Set(
        products
          .filter(p => p.sub_category === selectedSubCat)
          .map(p => p.brand_name)
      )
    ];

    const brandDropdown = document.getElementById("brand_dropdown");
    brandDropdown.innerHTML = `<option value="">Select Brand</option>`;

    brands.forEach(brand => {
      brandDropdown.innerHTML += `<option value="${brand}">${brand}</option>`;
    });
  });

  const colorNames = [
  "Red", "Green", "Blue", "Yellow", "Purple", "Orange",
  "Pink", "Black", "White", "Gray", "Brown", "Cyan",
  "Magenta", "Maroon", "Navy", "Teal", "Lime", "Olive",
  "Aqua", "Gold", "Silver", "Beige", "Coral", "Crimson",
  "Fuchsi", "Peach", "Off White", "Champagne", "Coffee",
  "Sea Green", "Royal Blue", "Wooden","Wine"
];


  const dropdown = document.getElementById("color_dropdown");

  colorNames.forEach(color => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    dropdown.appendChild(option);
  });
}

window.onload = loadDropdowns;

var btn = document.querySelector(".add_product");

document.getElementById("product_form").addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  let isValid = true;

  let pro_name = document.getElementById("pro_name").value.trim();
  let pro_org = document.getElementById("pro_org").value.trim();
  let pro_offer = document.getElementById("pro_offer").value.trim();
  let category_dropdown = document.getElementById("category_dropdown").value.trim();
  let sub_category_dropdown = document.getElementById("sub_category_dropdown").value.trim();
  let brand_dropdown = document.getElementById("brand_dropdown").value.trim();


  if (pro_name === "") {
    document.getElementById("err_name").textContent = "Product name is required";
    isValid = false;
  }
  if (Product_Image === "") {
    document.getElementById("err_image").textContent = "Main image is required";
    isValid = false;
  }
  if (Sub_Images.length === 0) {
    document.getElementById("err_subimage").textContent = "Upload sub images";
    isValid = false;
  }
  if (pro_org === "") {
    document.getElementById("err_org").textContent = "Original price required";
    isValid = false;
  }
  if (pro_offer === "") {
    document.getElementById("err_offer").textContent = "Offer price required";
    isValid = false;
  }
  if (category_dropdown === "") {
    document.getElementById("err_cat").textContent = "Select category";
    isValid = false;
  }
  if (sub_category_dropdown === "") {
    document.getElementById("err_subcat").textContent = "Select sub category";
    isValid = false;
  }
  if (brand_dropdown === "") {
    document.getElementById("err_brand").textContent = "Select brand";
    isValid = false;
  }

  if (!isValid) return;

  let product_details = JSON.parse(localStorage.getItem("All_product")) || [];

  let newId = product_details.length > 0
    ? product_details[product_details.length - 1].id + 1
    : 1;

  Sub_Images.unshift(Product_Image);

  let prodata = {
    id: newId,
    image: Product_Image,
    title: pro_name,
    orignal_rate: "₹" + pro_org,
    offer_rate: "₹" + pro_offer,
    category: category_dropdown,
    sub_category: sub_category_dropdown,
    brand_name: brand_dropdown,
    color: document.getElementById("color_dropdown").value.trim(),
    imges: Sub_Images
  };

  if (edit == null) {
    product_details.push(prodata);
    showSuccessMessage("Product added successfully!");

  } else {
    product_details[edit] = {
      id: product_details[edit].id,
      image: Product_Image,
      title: pro_name,
      orignal_rate: "₹" + pro_org,
      offer_rate: "₹" + pro_offer,
      category: category_dropdown,
      sub_category: sub_category_dropdown,
      brand_name: brand_dropdown,
      color: document.getElementById("color_dropdown").value.trim(),
      imges: Sub_Images
    };

     let wishlist = JSON.parse(localStorage.getItem("wishlist_product")) || [];

  wishlist = wishlist.map(item => {
    if (item.id === product_details[edit].id) {
      return {
        ...item,
        image: Product_Image,
        title: pro_name,
        orignal_rate: "₹" + pro_org,
        offer_rate: "₹" + pro_offer,
        category: category_dropdown,
        sub_category: sub_category_dropdown,
        brand_name: brand_dropdown,
        color: document.getElementById("color_dropdown").value.trim(),
        imges: Sub_Images
      };
    }
    return item;
  });

  localStorage.setItem("wishlist_product", JSON.stringify(wishlist));


  let cart = JSON.parse(localStorage.getItem("cart_product")) || [];

  cart = cart.map(item => {
    if (item.id === product_details[edit].id) {
      return {
        ...item,
        image: Product_Image,
        title: pro_name,
        orignal_rate: "₹" + pro_org,
        offer_rate: "₹" + pro_offer,
        category: category_dropdown,
        sub_category: sub_category_dropdown,
        brand_name: brand_dropdown,
        color: document.getElementById("color_dropdown").value.trim(),
        imges: Sub_Images
      };
    }
    return item;
  });

  localStorage.setItem("cart_product", JSON.stringify(cart));

    edit = null
    btn.textContent = "Add Product";
    showSuccessMessage("Product updated successfully!");
  }


  localStorage.setItem("All_product", JSON.stringify(product_details));


  function showSuccessMessage(message) {
    const box = document.getElementById("addMessage");
    box.textContent = message;
    box.classList.add("show");

    setTimeout(() => {
      box.classList.remove("show");
    }, 2000);
  }

  document.getElementById("product_form").reset();
  Product_Image = "";
  Sub_Images = [];

  document.getElementById("sub_category_dropdown").innerHTML = `<option value="">Select Sub Category</option>`;
  document.getElementById("brand_dropdown").innerHTML = `<option value="">Select Brand</option>`;

  document.querySelectorAll(".error").forEach(e => e.textContent = "");
  Display_Product()
});


function Display_Product() {
  let product_details = JSON.parse(localStorage.getItem("All_product")) || []

  var Show_Product = document.querySelector(".Show-Product")
  Show_Product.innerHTML = ``
  product_details.forEach((pro, index) => {


    let Show_Product_col = document.createElement("div")
    Show_Product_col.classList.add("col")

    Show_Product_col.innerHTML = `
  <div class="card h-100 d-flex flex-column border-0 position-relative">
      <div class="card h-100 d-flex flex-column border-0 position-relative">

  <div class="icon-wrapper d-flex flex-column position-absolute top-0 end-0 mt-2 me-2" style="z-index: 9999;">
      <i class="bi bi-trash fs-5 mb-2" style="cursor: pointer;" onclick="DeleteButton(${pro.id})"></i>
      <a href="#ontop"><i class="bi bi-pencil-square fs-5" style="cursor: pointer;" onclick="UpdateButton(${index})"></i></a>
  </div>

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


    Show_Product_col.querySelectorAll(".go-detail").forEach(el => {
      el.addEventListener("click", () => {
        window.location.href = `product.html?id=${pro.id}`;
      });
    });

    Show_Product.appendChild(Show_Product_col)
  })
}
Display_Product()


function DeleteButton(index) {
  let product_delete = JSON.parse(localStorage.getItem("All_product")) || []
  let updated = product_delete.filter(p => p.id !== index);
  localStorage.setItem("All_product", JSON.stringify(updated));

  let wishlist = JSON.parse(localStorage.getItem("wishlist_product")) || [];
  wishlist = wishlist.filter(item => item.id !== index);
  localStorage.setItem("wishlist_product", JSON.stringify(wishlist));

  let cart = JSON.parse(localStorage.getItem("cart_product")) || [];
  cart = cart.filter(item => item.id !== index);
  localStorage.setItem("cart_product", JSON.stringify(cart));

  Display_Product();
  updateLikeCounter()
  updateCartCounter()
}


function UpdateButton(index) {
  let Products_Data_Update = JSON.parse(localStorage.getItem("All_product")) || [];
  let data = Products_Data_Update[index];
  let original_rate = parseFloat(data.orignal_rate.replace(/[^0-9]/g, ""));
  let offer_rate = parseFloat(data.offer_rate.replace(/[^0-9]/g, ""));

  document.getElementById("pro_name").value = data.title;
  Product_Image = data.image;
  Sub_Images = data.imges.slice(1);
  document.getElementById("pro_org").value = original_rate;
  document.getElementById("pro_offer").value = offer_rate;

  loadDropdowns();

  setTimeout(() => {
    const cat = document.getElementById("category_dropdown");
    cat.value = data.category;
    cat.dispatchEvent(new Event("change"));

    setTimeout(() => {
      const subcat = document.getElementById("sub_category_dropdown");
      subcat.value = data.sub_category;
      subcat.dispatchEvent(new Event("change"));

      setTimeout(() => {
        document.getElementById("brand_dropdown").value = data.brand_name;
        document.getElementById("color_dropdown").value = data.color;
      }, 150);
    }, 150);
  }, 150);

  edit = index;
  btn.textContent = "Update Product";
}