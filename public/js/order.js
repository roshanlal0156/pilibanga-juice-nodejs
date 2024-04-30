const statusColors = {
  placed: "var(--clr-indigo)",

  confirmed: "var(--clr-indigo)",

  cancelled: "var(--clr-rose)",

  preparing: "var(--clr-indigo)",

  out_for_delivery: "var(--clr-indigo)",

  delivered: "var(--clr-green)",
};
const orderTbody = document.querySelector(".order__tbody");
// order statuses

// placed
// confirmed, cancelled
// preparing
// ready for pickup
// out for delivery
// delivered

// [
//   {
//     user_id: new ObjectId('662e05f2582e7170bd12d020'),
//     products: [ [Object], [Object] ],
//     sub_total: 220,
//     delivery_charges: 20,
//     total: 240,
//     order_id: '6630bab2ff906fe97c9e1a22'
//   }
// ]

const ordersRes = async () => {
  try {
    const res = await fetch("/get-order", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    if (data.errors) {
      // handle errors
    } else {
      console.log(typeof(data.orders));
      loadingOrders(data.orders);
    }
  } catch (err) {
    console.log(err);
  }
}

ordersRes();

loadingOrders = (orders) => {
  orders.forEach((element) => {
    const elapsedTime = moment.duration(moment().diff(moment(element.createdAt)));
    let formattedElapsedTime = '';
    if (elapsedTime.asHours() < 1) {
      formattedElapsedTime = elapsedTime.format('m [minutes], s [seconds]');
    } else if(elapsedTime.asDays() < 1){
      formattedElapsedTime = elapsedTime.format('h [h], m [min], s [sec]');
    }else {
      formattedElapsedTime = moment(element.createdAt).format('MMMM Do YYYY');;
      }
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
            #${element.order_id}
        </td>
        <td>
            ${element.total}
        </td>
        <td>
            ${formattedElapsedTime}
        </td>
        <td>
            <strong style="color:${statusColors[element.status]};">${
      element.status
    }</strong>
        </td>
        <td>
            <a class="btn" href="/order/${element.order_id}">view</a>
        </td>`;
    orderTbody.appendChild(tr);
    console.log(statusColors[element.status]);
  });
};
