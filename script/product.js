import {monthProduct,fishlist,plant,bottemData,pcbottem} from './data-set.js'


addEventListener('DOMContentLoaded',()=>{
  document.querySelector(".bottam-section").innerHTML=bottemData
  document.querySelector(".pc-bottam-section").innerHTML=pcbottem
})

window.addquantity=function(index){
  const displayElement = document.querySelector(`.input-section-${index}`);
  fishlist[index - 1].quantity++;
  console.log(fishlist[index - 1]);
  displayElement.value = fishlist[index-1].quantity;
}

window.productaddquantity=function(index){
  const displayElement = document.querySelector(`.product-input-section-${index}`);
  monthProduct[index-1].quantity++;
  console.log(monthProduct[index-1]);
  displayElement.value = monthProduct[index-1].quantity;
}

window.plantaddquantity=function(index){
  const displayElement = document.querySelector(`.plant-input-section-${index}`);
  plant[index-1].quantity++;
  console.log(plant[index-1]);
  displayElement.value = plant[index-1].quantity;
}

window.subquantity=function(index){
  if(fishlist[index-1].quantity > 1){
   const displayElement = document.querySelector(`.input-section-${index}`);
  fishlist[index - 1].quantity--;
  console.log(fishlist[index - 1]);
  displayElement.value = fishlist[index - 1].quantity;
  }
  else{
    console.log("increase the quantity")
  }
};

window.productsubquantity=(index)=>{
  const displayElement = document.querySelector(`.product-input-section-${index}`);
  if(monthProduct[index-1].quantity > 1){
  monthProduct[index - 1].quantity--;
  console.log(monthProduct[index - 1].quantity);
  displayElement.value = monthProduct[index-1].quantity;
  }
  else{
    console.log("increase the quantity")
  }
}
window.plantsubquantity=(index)=>{
  const displayElement = document.querySelector(`.plant-input-section-${index}`);
  if(plant[index-1].quantity > 1){
  plant[index - 1].quantity--;
  console.log(plant[index - 1].quantity);
  displayElement.value = plant[index-1].quantity;
  }
  else{
    console.log("increase the quantity")
  }
}


let likeditems=[[],[],[]]


window.heart=function(value){
let heart=document.querySelector(`.heart${value}`);
heart.style.color="#d80303ff";
const fish =fishlist[value-1];
fish.like="liked";
console.log(fish)
likeditems[0].push(fish.id)
console.log(likeditems)
localStorage.setItem("heart",JSON.stringify(likeditems))
}

window.productheart=function(value){
let heart=document.querySelector(`.productheart${value}`);
heart.style.color="#d80303ff";
const fish =monthProduct[value-1];
fish.like="liked";
console.log(fish)
likeditems[1].push(fish.id)
localStorage.setItem("heart",JSON.stringify(likeditems))
}

window.plantheart=function(value){
let heart=document.querySelector(`.plantheart${value}`);
heart.style.color="#d80303ff";
const fish =plant[value-1];
fish.like="liked";
likeditems[2].push(fish.id)
console.log(fish)
localStorage.setItem("heart",JSON.stringify(likeditems))
}

window.productcart=function(value){
totalvalue(value);
senddetalis('first')
}
window.productcartsecond=(value)=>{
mortal(value);
senddetalis('second')
}
window.plantproductcartsecond=(value)=>{
cartal(value);
senddetalis('third')
}

window.mortal=function(value){
  let totalProductValue=0;
  
  const fish=monthProduct[value-1];
  let totalamount=fish.quantity*fish.price;
  fish.totalPrice=totalamount;
  console.log(fish)
 
for(let i=0;i<=monthProduct.length;i++){
  if(monthProduct[i]&& typeof monthProduct[i].totalPrice==="number"){
    totalProductValue+=monthProduct[i].totalPrice;
  }  
}
}

window.cartal=function(value){
  let totalProductValue=0;
  
  const fish=plant[value-1];
  let totalamount=fish.quantity*fish.price;
  fish.totalPrice=totalamount;
  console.log(fish)
 
for(let i=0;i<=monthProduct.length;i++){
  if(monthProduct[i]&& typeof monthProduct[i].totalPrice==="number"){
    totalProductValue+=monthProduct[i].totalPrice;
  }  
}
}

window.totalvalue=function(value){
  let totalProductValue=0;
  
  const fish=fishlist[value-1];
  let totalamount=fish.quantity*fish.price;
  fish.totalPrice=totalamount;
  console.log(fish)
 
for(let i=0;i<=fishlist.length;i++){
  if(fishlist[i]&& typeof fishlist[i].totalPrice==="number"){
    totalProductValue+=fishlist[i].totalPrice;
  }  
}
}

addEventListener("DOMContentLoaded", () => {
  const crossBtn = document.querySelector('.product-cross,.cart-cross,.qr-section-btn');
  
  if (crossBtn) {
    crossBtn.addEventListener('click', () => {
      window.location.href = 'main.html';     
    });
  }
});

 let cartDetails = [];

window.senddetalis = function(value) {
    let content = [];

    if (value === 'first') {
        content = fishlist;
    } else if (value === 'second') {
        content = monthProduct;
    }else if(value==="third"){
        content = plant;
    }

    content.forEach(fish => {
        if (fish.totalPrice && typeof fish.totalPrice === "number") {
            const existingItem = cartDetails.find(item => item.id === fish.id);

            if (existingItem) {
                existingItem.quantity = fish.quantity;
                existingItem.totalPrice = fish.totalPrice;
            } else {
                cartDetails.push({
                    id: fish.id,
                    name: fish.name,
                    price: fish.price,
                    quantity: fish.quantity,
                    totalPrice: fish.totalPrice,
                    like: fish.like,
                    image: fish.image
                });
            }
        }
    });
    localStorage.setItem("cart", JSON.stringify(cartDetails));
    console.log("Cart saved:", cartDetails);
};


const fishSection = document.querySelector(".fish-section");
let forloopproduct=[fishlist,monthProduct,plant]
let forlooptittle=[`fish section <i class="fa-solid fa-otter"></i>`,`aquarium accessories <i class="fa-solid fa-basket-shopping"></i>`,`aquarium live plants section <i class="fa-solid fa-seedling"></i>`]

for(let i=0;i<=forloopproduct.length-1;i++){
  let hello = forloopproduct[i]

  let Tittlebro=`<div class="product-heading-section"><h2>${forlooptittle[i]}</h2></div>`
  fishSection.insertAdjacentHTML("beforeend",Tittlebro);

   for(let j=0;j<=hello.length-1;j++){
    let subbro, addbro, cartbro,cartinputbro,heart,heartsection;
    if(hello==fishlist){
       subbro =`subquantity(${hello[j].id})`
       addbro =`addquantity(${hello[j].id})`
       cartbro=`productcart(${hello[j].id})`
       cartinputbro=`input-section-${hello[j].id}`
       heart=`heart(${hello[j].id})`
       heartsection=`heart${hello[j].id}`
    }
    else if(hello==monthProduct){
       subbro =`productsubquantity(${hello[j].id})`
       addbro =`productaddquantity(${hello[j].id})`
       cartbro=`productcartsecond(${hello[j].id})`
       cartinputbro=`product-input-section-${hello[j].id}`
       heart=`productheart(${hello[j].id})`
       heartsection=`productheart${hello[j].id}`
    }
    else if(hello==plant){
       subbro =`plantsubquantity(${hello[j].id})`
       addbro =`plantaddquantity(${hello[j].id})`
       cartbro=`plantproductcartsecond(${hello[j].id})`
       cartinputbro=`plant-input-section-${hello[j].id}`
       heart=`plantheart(${hello[j].id})`
       heartsection=`plantheart${hello[j].id}`
    }

    let innerdata=`
      <div class="product product-${hello[j].id} product-item">
        <div class="fish-section-heading"><h2 class="main-heading">name : ${hello[j].name}</h2>
        <h2 class="main-heading-price">price   :  ₹${hello[j].price} (1qty)</h2></div>
        <div class="heart-symbol " onclick="${heart}"><i class="fa-solid fa-heart fa-lg heart ${heartsection}" ></i></div>
        <div class="image-section">
          <img class="fish-img" src="${hello[j].image}" alt="${hello[j].name}">
        </div>
        <div class="btn-section">
          <div class="btn"><div class="decrases-btn" onclick="${subbro}"><p>-</p></div></div>
          <div class="cart-input"><input class="input-section ${cartinputbro}" type="number" value="1"></div>
          <div class="btn "><div class="increase-btn" onclick="${addbro}"><p>+</p></div></div>
        </div>
        <div class="add-to-cart" onclick="${cartbro}"><h3>add to cart</h3><i class="cart fa-solid fa-cart-shopping"></i></div>
      </div>
    `;
    fishSection.insertAdjacentHTML("beforeend",innerdata);
   }
}



addEventListener("DOMContentLoaded", () => {
  let heartplace = JSON.parse(localStorage.getItem("heart"));

  if (heartplace) {
    for (let i = 0; i < heartplace.length; i++) {
      let heartbro = heartplace[i];

      for (let j = 0; j < heartbro.length; j++) {
        let selector = "";

        if (i === 0) {
          selector = `.heart${heartbro[j]}`;
        } else if (i === 1) {
          selector = `.productheart${heartbro[j]}`;
        } else if (i === 2) {
          selector = `.plantheart${heartbro[j]}`;
        }

        let heart = document.querySelector(selector);
        if (heart) {
          heart.style.color = "#d80303ff";
        }
      }
    }
  }
});


/* for(let i=0;i<heartplace.length;i++){
  for(let j=0;j<=heartplace[i].length;j++){
  let heart;
  if(i==0){
  heart=document.querySelector(`.heart${heartbro[i]}`);
  }
  else if(i==1){
     heart=document.querySelector(`.productheart${heartbro[i]}`);
  }
  else if(i==2){
    heart=document.querySelector(`.plantheart${heartbro[i]}`);
  }
    
    heart.style.color="#d80303ff";
  }}
*/


