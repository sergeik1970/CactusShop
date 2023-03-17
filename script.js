const menu = document.querySelector(".menu")
const close = document.querySelector(".close")
const nav = document.querySelector("nav")

// console.log(menu, close, nav)

menu.addEventListener("click", () => {
    nav.classList.add("open-nav")
})

close.addEventListener("click", () => {
    nav.classList.remove("open-nav")
})

const addToCartButtons = document.querySelectorAll(".shop-item-button");

// console.log(addToCartButtons);

for (let b of addToCartButtons) {
    b.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
    const shopItem = event.target.parentElement.parentElement;
    const title = shopItem.querySelector(".shop-item-title").innerText;
    const price = shopItem.querySelector(".shop-item-price").innerText;
    const imageSrc = shopItem.querySelector(".shop-item-image").src;
    // console.log(title, price, imageSrc)

    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    // console.log("Довавляем товар:", title, price, imageSrc);

    const cartItems = document.querySelector(".cart-items");
    // console.log(cartItems)

    // Проверям есть ли такой товар в корзине
    const cartItemNames = cartItems.querySelectorAll(".cart-item-title")
    // console.log(cartItemNames)

    for (let itemName of cartItemNames) {
        if (itemName.innerText == title) {
            alert("Этот товар уже в корзине!");
            return;
        }
    }


    const cartRow = document.createElement("div");
    cartItems.appendChild(cartRow);
    cartRow.classList.add("cart-row");
    cartRow.innerHTML = "Новая строка";

    let cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>

<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" min="1" value="1">
    <button class="btn btn-danger" type="button">Удалить</button>
</div>`;

    cartRow.innerHTML = cartRowContents;

    // Добавить слушатель событий

    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);

    updateCartTotal()
}

function removeCartItem(event) {

    let del = confirm("Точно удалить?")

    if (del) {
        event.target.parentElement.parentElement.remove();
        updateCartTotal()
    }
}

function quantityChanged(event) {

    // console.log("Меняем количество товаров.");
    let input = event.target;

    //Чтобы было нельзя поставить количество меньше 1
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

function updateCartTotal() {
    // console.log("Обновляем итоговую сумму.");
    const cartRows = document.querySelectorAll(".cart-items .cart-row");

    let total = 0;
    console.log(cartRows)
    for (row of cartRows) {
        console.log(row)
        let price = row.querySelector(".cart-items .cart-price").innerText;
        price = parseFloat(price);
        console.log(price);
        let cartQuantityInput = row.querySelector(".cart-quantity input").value;
        console.log(cartQuantityInput);
        total = total + (cartQuantityInput * price);
    }
    console.log(total);

    document.querySelector(".cart-total-price").innerText = (total + " руб.");
}

const buyBtn = document.querySelector(".btn-purchase");

buyBtn.addEventListener("click", purchaseClicked);

function purchaseClicked() {
    alert("Спасибо за покупку!");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}