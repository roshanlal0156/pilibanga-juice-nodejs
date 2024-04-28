// order statuses

// placed
// confirmed, cancelled
// preparing
// ready for pickup
// out for delivery
// delivered

const statusColors = {
  placed: "var(--clr-indigo)",

  confirmed: "var(--clr-indigo)",

  cancelled: "var(--clr-rose)",

  preparing: "var(--clr-indigo)",

  out_for_delivery: "var(--clr-indigo)",

  delivered: "var(--clr-green)",
};

const orders = [
  {
    id: "12345",
    amount: 567,
    date: "23 jan 2323",
    status: "placed",
  },
  {
    id: "23232",
    amount: 130,
    date: "23 jan 2323",
    status: "cancelled",
  },
  {
    id: "12123",
    amount: 124,
    date: "23 jan 2323",
    status: "delivered",
  },
];

const orderTbody = document.querySelector(".order__tbody");

loadingOrders = (orders) => {
  orders.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
            #${element.id}
        </td>
        <td>
            ${element.amount}
        </td>
        <td>
            ${element.date}
        </td>
        <td>
            <strong style="color:${statusColors[element.status]};">${
      element.status
    }</strong>
        </td>
        <td>
            <a class="btn" href="/order/${element.id}">view</a>
        </td>`;
    orderTbody.appendChild(tr);
    console.log(statusColors[element.status]);
  });
};

loadingOrders(orders);
