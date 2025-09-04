import {monthProduct,bottemData,pcbottem,fishlist} from './data-set.js'






addEventListener('DOMContentLoaded',()=>{
  document.querySelector(".bottam-section").innerHTML=bottemData
  document.querySelector(".pc-bottam-section").innerHTML=pcbottem
})


let image =0;
let currentIndex = 2;

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    ProductsOffer();
});

function displayProducts() {
    const offerFirstSection = document.querySelector('.offer-section-product-1');
     if (!offerFirstSection) {
        return; // prevent crash
    }
         offerFirstSection.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const product = fishlist[i];
        const productHTML = `
        <div class="offer-items product-${product.id}">
            <div class="product-image" style="background-image: url('${product.image}');grid-row: 1/-1;grid-column: 1/-1;background-size: cover;background-position: center;border-radius: 10px;"></div>
            <div class="offer-fish-heading"><h3>${product.name}</h3></div>
            <div class="offer-order"><a href="product.html"><p class="offer-order-p">order</p></a></div>
        </div>`;
        
        offerFirstSection.insertAdjacentHTML('beforeend', productHTML);
    }
   
}

window.arrow=function(value) {
  document.querySelector('.offer-section-product-1 .offer-items:first-child')?.remove();
    if (value === 'next') {
        currentIndex +=1;
        console.log(currentIndex)
        if(currentIndex>=fishlist.length){
            currentIndex=0;
             console.log(fishlist[currentIndex])
        }
       
    } 
     else if(value === 'prev') {
        if(currentIndex>0){
            currentIndex --;
            console.log(currentIndex)
        }
        if(currentIndex<=0){
            currentIndex=fishlist.length-1;
             console.log(currentIndex)
        }
    }


    const product = fishlist[currentIndex];

    const productHTML = `
    <div class="offer-items product-${product.id}" style="background-color: #ffffff;">
        <div class="product-image" style="background-image: url('${product.image}');grid-row:1/-1;grid-column: 1/-1;background-size: cover;background-position: center;border-radius: 10px;"></div>
        <div class="offer-fish-heading"><h3 style="font-weight: bold;" >${product.name}</h3></div>
        <div class="offer-order"><a href="product.html"><p class="offer-order-p">order</p></a></div>
    </div>`;
    
    document.querySelector('.offer-section-product-1').insertAdjacentHTML('beforeend', productHTML);
}


// month end section 

function ProductsOffer(){
    const offerFirstSection = document.querySelector('.offer-section-product-2');
     if (!offerFirstSection) {
        return;
    }
    offerFirstSection.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const product = monthProduct[i];
        const productHTML = `
        <div class="offer-items product-${product.id}"  style="background-color: #ffffff;">
            <div class="product-image" style="background-image: url('${product.image}');grid-row: 2/3;grid-column: 1/-1;background-size: cover;background-position: center;border-radius: 10px;"></div>
            <div class="offer-fish-heading"><h3>${product.name}</h3></div>
            <div class="offer-order"><a href="product.html"><p class="offer-order-p">order</p></a></div>
        </div>`;
        
        offerFirstSection.insertAdjacentHTML('beforeend', productHTML);
    }
}



let ProductOfferIndex=2;

window.car=function(value) {
   //all done here
     if (value === 'next') {
        ProductOfferIndex ++;
        console.log(ProductOfferIndex)
        if(ProductOfferIndex>=monthProduct.length-1){
            ProductOfferIndex=0;
        }
    }

   else if (value === 'prev') {
    // Circular navigation: if at 0, go to 6; otherwise decrease
    ProductOfferIndex = ProductOfferIndex === 0 ? 6 : ProductOfferIndex - 1;
    console.log(ProductOfferIndex);                 
    console.log(ProductOfferIndex === 6 ? "Looping to last" : "Previous product");
}
   
    const product = monthProduct[ProductOfferIndex];

    const productHTML = `
    <div class="offer-items product-${product.id}"  style="background-color: #ffffff;">
        <div class="product-image" style="background-image: url('${product.image}');grid-row:2/3;grid-column: 1/-1;background-size: cover;background-position: center;border-radius: 10px;"></div>
        <div class="offer-fish-heading"><h3>${product.name}</h3></div>
        <div class="offer-order"><a href="product.html"><p class="offer-order-p">order</p></a></div>
    </div>`;
    
         document.querySelector('.offer-section-product-2 .offer-items:first-child')?.remove();
         document.querySelector('.offer-section-product-2').insertAdjacentHTML('beforeend', productHTML);     
   
}








