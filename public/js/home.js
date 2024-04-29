const menuCartButton = document.querySelector(".menu__cart");
let selectedJuices = new Set();

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
      menuCartButton.addEventListener("click", (e) => {
        //TODO:: handle on click
        let productIds = "?";
        selectedJuices.forEach((element) => {
          productIds += `product_ids=${element}&`;
        })
        window.open("/get-cart/" + productIds);
      });
      menuCartButton.style.display = "flex";
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

const loadingJuices = (juices) => {
  juices.forEach((element) => {
    if (element.in_stock == true) {
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
        selectedJuices.add(element._id);
        selelctedItemsCount.innerHTML = selectedJuices.size;
        selelctedItemsCount.style.display = "block";

        console.log(selectedJuices);
      });

      div.appendChild(p);
      div.appendChild(btn);
      divWrapper.appendChild(div);
      mainMenu.appendChild(divWrapper);
    }
  });
};
