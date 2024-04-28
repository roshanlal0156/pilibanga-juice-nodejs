const items = [
  {
    name: "sugarcane",
    price: 20,
  },
  {
    name: "bael",
    price: 20,
  },
  {
    name: "banana",
    price: 20,
  },
  {
    name: "papaya",
    price: 20,
  },
];

loadingCartCalculations = () => {
  const cartCalculationWrapper = document.querySelector(
    ".cart__calculation-wrapper"
  );
  const cartSubTotal = document.querySelector(".cart__sub-total");
  const cartDeliveryCharges = document.querySelector(".cart__delivery-charges");
  const cartTotal = document.querySelector(".cart__total");

  const cartOrderBtn = document.querySelector('.cart__order-btn');
  const cartOrderMinimum = document.querySelector('.cart__order-minimum');
  const cartOrderEmpty = document.querySelector('.cart__order-empty');

  const itemsPrices = document.querySelectorAll(".item__total-prize");

  let subTotal = 0;
  let total = 0;
  let deliveryCharges = 20; // 20 rupees for now
  itemsPrices.forEach((element) => {
    let value = element.innerHTML;
    value = value.replace(" ₹", "");
    subTotal += Number(value);
  });

  total = subTotal + deliveryCharges;
  cartSubTotal.innerHTML = `${subTotal} ₹`;
  cartDeliveryCharges.innerHTML = `${deliveryCharges} ₹`;
  cartTotal.innerHTML = `${total} ₹`;

  if (subTotal > 0) cartCalculationWrapper.style.display = "block";
  else cartCalculationWrapper.style.display = "none";

  if(subTotal === 0) {
      cartOrderEmpty.style.display = 'block';
      cartOrderMinimum.style.display = 'none';
      cartOrderBtn.style.display = 'none';
    } else if(total < 100) {
        cartOrderEmpty.style.display = 'none';
        cartOrderMinimum.style.display = 'block';
        cartOrderBtn.style.display = 'none';
  } else {
    cartOrderEmpty.style.display = 'none';
      cartOrderMinimum.style.display = 'none';
      cartOrderBtn.style.display = 'block';
  }


};

const cartTableBody = document.querySelector(".cart__table-body");

loadingCartItems = (items) => {
  items.forEach((element) => {
    let tr = document.createElement(`tr`);
    tr.classList.add(`item__row-${element.name}`);

    // firt td
    let td1 = document.createElement("td");
    td1.classList.add("item__qty", `item__qty-${element.name}`);
    let btnAdd = document.createElement("button");
    btnAdd.classList.add("btn__cart-qty", `add__qty-${element.name}`);
    btnAdd.innerHTML = "+";
    let qty = document.createElement("input");
    qty.classList.add("input__qty", `input__qty-${element.name}`);
    qty.type = "number";
    qty.readOnly = "true";
    qty.value = 1;
    let btnRemove = document.createElement("button");
    btnRemove.classList.add("btn__cart-qty", `remove__qty-${element.name}`);
    btnRemove.innerHTML = "-";

    // second td
    let td2 = document.createElement("td");
    td2.classList.add("item__name");
    td2.innerHTML = element.name[0].toUpperCase() + element.name.slice(1);

    // third td
    let td3 = document.createElement("td");
    td3.classList.add("item__per-piece-prize");
    td3.innerHTML = element.price + " ₹";

    // forth td
    let td4 = document.createElement("td");
    td4.classList.add("item__total-prize", `item__total-prize-${element.name}`);
    td4.innerHTML = element.price + " ₹";

    // add remove qty
    btnAdd.addEventListener("click", (e) => {
      if (Number(qty.value) >= 20) return;
      qty.value = Number(qty.value) + 1;
      td4.innerHTML = `${element.price * qty.value} ₹`;
      loadingCartCalculations();
    });
    btnRemove.addEventListener("click", (e) => {
      if (Number(qty.value) === 1) return;
      qty.value = Number(qty.value) - 1;
      td4.innerHTML = `${element.price * qty.value} ₹`;
      loadingCartCalculations();
    });

    // fifth td
    let td5 = document.createElement("td");
    td5.classList.add("item__delete", `item__delete-${element.name}`);
    let i = document.createElement("i");
    i.classList.add(
      "item__delete-icon",
      `item__delete-icon-${element.name}`,
      "fa",
      "fa-trash"
    );
    i.setAttribute("aria-hidden", "true");
    i.addEventListener("click", (e) => {
      tr.innerHTML = "";
      loadingCartCalculations();
    });

    // append
    td1.appendChild(btnRemove);
    td1.appendChild(qty);
    td1.appendChild(btnAdd);
    tr.appendChild(td1);

    tr.appendChild(td2);

    tr.appendChild(td3);

    tr.appendChild(td4);

    td5.appendChild(i);
    tr.appendChild(td5);

    cartTableBody.appendChild(tr);
  });
  loadingCartCalculations();
};

loadingCartItems(items);
