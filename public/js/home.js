const juices = [
    {
        "name" : "sugarcane",
        "price" : 20
    },
    {
        "name" : "papaya",
        "price" : 20
    },
    {
        "name" : "pineapple",
        "price" : 20
    },
    {
        "name" : "bael",
        "price" : 20
    },
    {
        "name" : "banana",
        "price" : 20
    },
    {
        "name" : "orange",
        "price" : 20
    },
    {
        "name" : "mango",
        "price" : 20
    }
]
const mainMenu = document.querySelector('.main__menu');
const selelctedItemsCount = document.querySelector('.menu__selected-items-count');
let selectedJuices = new Set();

const loadingJuices = (juices) => {
    juices.forEach(element => {
        let divWrapper = document.createElement("div");   
        divWrapper.classList.add("juice-item-img-wrapper"); 

        let div = document.createElement("div");
        div.classList.add("juice-item", `item-${element.name}`); 

        let p = document.createElement("p");
        p.innerHTML = element.name[0].toUpperCase() + element.name.slice(1) + " " + element.price + "₹";

        let btn = document.createElement("button");
        btn.classList.add("btn", "cart-btn");
        btn.innerHTML = `<i class="cart-icon fa-solid fa-cart-shopping">+</i>`;

        btn.addEventListener('click', (e) => {
            selectedJuices.add(element.name);
            if(selectedJuices.size > 0) {
                selelctedItemsCount.innerHTML = selectedJuices.size;
                selelctedItemsCount.style.display = 'block';
            }
            console.log(selectedJuices);
        })

        div.appendChild(p);
        div.appendChild(btn);
        divWrapper.appendChild(div);
        mainMenu.appendChild(divWrapper);

    });
}
loadingJuices(juices);

const menuCartButton = document.querySelector(".menu__cart");
menuCartButton.addEventListener('click', (e) => {
    
})
