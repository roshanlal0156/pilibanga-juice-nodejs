fetchProducts = async () => {
  try {
    const res = await fetch("/product", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data.errors) {
      // handle errors
    } else {
        console.log(data.products);
        loadingJuices(data.products);
    }
  } catch (err) {
    console.log(err);
  }
};

fetchProducts();

const mainMenu = document.querySelector(".main__menu");
const selelctedItemsCount = document.querySelector(
  ".menu__selected-items-count"
);
let selectedJuices = new Set();

const loadingJuices = (juices) => {
  juices.forEach((element) => {
    if(element.in_stock == true) {
        let divWrapper = document.createElement("div");
        divWrapper.classList.add("juice-item-img-wrapper");
    
        let div = document.createElement("div");
        div.classList.add("juice-item", `item-${element.name}`);
        div.style.backgroundImage = `url('../../images/${element.name}.jpeg')`;
    
        let p = document.createElement("p");
        p.innerHTML =
          element.name[0].toUpperCase() +
          element.name.slice(1) +
          " " +
          element.price +
          "₹";
    
        let btn = document.createElement("button");
        btn.classList.add("btn", "cart-btn");
        btn.innerHTML = `<i class="cart-icon fa-solid fa-cart-shopping">+</i>`;
    
        btn.addEventListener("click", (e) => {
          selectedJuices.add(element.name);
          if (selectedJuices.size > 0) {
            selelctedItemsCount.innerHTML = selectedJuices.size;
            selelctedItemsCount.style.display = "block";
          }
          console.log(selectedJuices);
        });
    
        div.appendChild(p);
        div.appendChild(btn);
        divWrapper.appendChild(div);
        mainMenu.appendChild(divWrapper);
    }
  });
};

const menuCartButton = document.querySelector(".menu__cart");
menuCartButton.addEventListener("click", (e) => {});
