import {bottemData,pcbottem} from './data-set.js'

addEventListener('DOMContentLoaded',()=>{
  document.querySelector(".bottam-section").innerHTML=bottemData
  document.querySelector(".pc-bottam-section").innerHTML=pcbottem
})

let monkey =JSON.parse(localStorage.getItem('cart'));

document.addEventListener("DOMContentLoaded", () => {
  let fishPair = 0;
  let totalAmount = 0;
 
  const totalOrderAmount = document.querySelector('.total-pay');
  const totalpair = document.querySelector('.fish-qtu-value');
  const cartShow = document.querySelector('.product-show-of');


 if(cartShow){
  cartShow.innerHTML = '';
}  
if(monkey){
  monkey.forEach((fish) => {
    totalAmount += fish.totalPrice;
    fishPair += fish.quantity;
  });
}

  // Update totals display (with null checks
  if (totalOrderAmount) {
    totalOrderAmount.textContent = `₹${totalAmount}`;
  } else {
    console.warn('Total order amount element not found');
  }

  if (totalpair) {
    totalpair.textContent = `${fishPair}(qtn)`;
  } else {
    console.warn('Fish quantity element not found');
  }
if(monkey){
monkey.forEach((fish) => {
    const newProduct = `
      <div class="product product-${fish.id}">
        <div class="fish-name"><h3>${fish.name}</h3></div>
        <div class="cart-fish-remove" onclick="fishremove(${fish.id})"><i class="fa-solid fa-xmark fa-xl"></i></div>
        <div class="fish-image-section"><img class="cart-image-section" src="${fish.image}" alt=""></div>
        <div class="fishquantity"><h4>quantity: ${fish.quantity}(qnt)</h4></div>
        <div class="fish-price"><h4>price: ${fish.price}₹</h4></div>
        <div class="fish-total-amount"><h4>total amount: ${fish.totalPrice}₹</h4></div>
      </div>
    `;
    cartShow.insertAdjacentHTML("beforeend", newProduct);
  });
}

})

  // Add event listeners for remove buttons


window.fishremove = function (value) {
  let car = [];
  const cartJSON = JSON.parse(localStorage.getItem("cart")) || [];

  for (let i = 0; i < cartJSON.length; i++) {
    if (cartJSON[i].id === value) {
      continue; // skip the item we want to remove
    }
    car.push(cartJSON[i]);
  }

  console.log(car);
  localStorage.setItem("cart", JSON.stringify(car));
  location.reload();
};


document.querySelector('.final-btn').addEventListener('click',()=>window.location.href="order.html")
document.querySelector(`.product-bin`).addEventListener("click",()=>{localStorage.removeItem("cart");location.reload()})