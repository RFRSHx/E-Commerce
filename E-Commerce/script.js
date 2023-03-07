const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
var viewBtn = document.getElementsByClassName("view-btn");
var index = 0;

function Button(n) {
    CurrentShowBtn(index = n);
}

function CurrentShowBtn(n) {
    for(var i=0; i < viewBtn.length; i++) {
        viewBtn[i].className = viewBtn[i].className.replace(" active-btn","");
    }
    viewBtn[n].className += " active-btn";
}

function List() {
    var Item = document.getElementById("product-list");

    Item.style.display = "block";
    Item.style.marginLeft = "40%";

}
function Grid() {
    var Item = document.getElementById("product-list");
    Item.style.display = "flex";
    Item.style.marginLeft = "0";
}

const search = () => {
    const searchbar = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const prod = document.querySelectorAll(".prod");
    const prodname = storeitems.getElementsByTagName("h5");

    for(var i=0; i<prodname.length; i++){
        let match = prod[i].getElementsByTagName("h5")[0];

        if(match){
            let textvalue = match.textContent  || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbar) > -1) {
                prod[i].style.display = "";
            }else {
                prod[i].style.display = "none";
            }    
        }
    }
}


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

//Cart
let cartIcon = document.querySelector(".shopping-cart-icon");
let mobileIcon = document.querySelector(".mobile-cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

mobileIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready(){
    //Remove items from cart
    var removeCartButton = document.getElementsByClassName("cart-remove")
    console.log(removeCartButton);
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i]
        button.addEventListener("click", removeCartItem);
    }
    //Quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

//Add to cart
    var addCart = document.getElementsByClassName("cart-btn")
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);   
    }
}


//Remove items
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var prodImg = shopProducts.getElementsByClassName("prod-img")[0].src;
    addProductToCart(title, price, prodImg);
    updateTotal();
}
function addProductToCart(title, price, prodImg) {

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("The item is already in the shopping cart.")
            return;
        }
    }

    var cartBoxContent = `
                    <img src="${prodImg}" alt="Product" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <img src="img/icons/remove.png" width="24px" alt="Remove items icon" class="cart-remove"></img>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);

    }


                    


//Update total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    var totalQuantity = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""))
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        var quantity = parseInt(quantity);
        totalQuantity += quantity;
    }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "€" + total;
        document.getElementsByClassName("cart-total")[0].innerText = "€" + total;
        document.getElementsByClassName("mobile-cart-total")[0].innerText = "€" + total;

        document.getElementsByClassName("mobile-item-element")[0].innerText = totalQuantity;
        document.getElementsByClassName("item-element")[0].innerText = totalQuantity;

}

// Checkout script
const payAmountBtn = document.querySelector("#payAmount");
const decrementBtn = document.querySelectorAll("#decrement");
const quantityElem = document.querySelectorAll("#qty");
const incrementBtn = document.querySelectorAll("#increment");
const priceElem = document.querySelectorAll("#price");
const subtotalElem = document.querySelector("#subtotal");
const taxElem = document.querySelector("#tax");
const finalTotElem = document.querySelector("#final-total");



// Increment & decrement
for (let i = 0; i < incrementBtn.length; i++) {

    incrementBtn[i].addEventListener("click", function () {
        let increment = Number(this.previousElementSibling.textContent);

        increment++;

        this.previousElementSibling.textContent = increment;

        totalCalc();

    });


    decrementBtn[i].addEventListener("click", function () {
        let decrement = Number(this.nextElementSibling.textContent);

        decrement <= 1 ? 1 : decrement--;

        this.nextElementSibling.textContent = decrement;

        totalCalc();

    });

}

// total amount price
const totalCalc = function() {
    const tax = 0.08;
    let subtotal = 0;
    let totalTax = 0;
    let finalTot = 0;

    for (let i = 0;i < quantityElem; i++) {
        subtotal += Number(quantityElem[i].textContent) * Number(priceElem[i].textContent);
    }

    subtotalElem.textContent = subtotal.toFixed(2);


    totalTax = subtotal * tax;

    taxElem.textContent = totalTax.toFixed(2);


    finalTot = subtotal + totalTax;

    finalTotElem.textContent = finalTot.toFixed(2);
    payAmountBtn.textContent = finalTot.toFixed(2);
}


