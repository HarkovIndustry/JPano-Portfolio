/* LOADER Sample
    const carousel = ["image.jpg", "image.jpeg", "image.jfif", "image.png"];
*/


const divTarget = "carouselcontainer";
const path = "home-img/";
const time = 3000; // 0 - disable autoswipe
const border = {}; /* {} or {size: "2px", style: "solid", color: "black"} */
const fiximagesizing =
  ""; /* "" or ("fill", "contain", "cover", "none", "scale-down") */
const largescreen = "30vw";
const smallscreen = "80vw";

/* minified Code [Carousel dynamic] */
const autoplay=time>0,carouselItems=document.createElement("div");carouselItems.className="carousel slide",carouselItems.setAttribute("data-bs-ride",autoplay?"carousel":"false"),carouselItems.id="carouselExample";const innerDiv=document.createElement("div");innerDiv.className="carousel-inner",innerDiv.id="carouselItems",carousel.forEach((image,index)=>{const item=document.createElement("div");item.className=`carousel-item ${index===0?"active":""}`,item.innerHTML=`<img src="${path}${image}" class="d-block" alt="Slide ${index+1}" data-bs-toggle="modal" data-bs-target="#imageModal" data-image="${path}${image}">`,innerDiv.appendChild(item)}),carouselItems.appendChild(innerDiv),carouselItems.innerHTML+=`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>`,document.querySelector(`.${divTarget}`).appendChild(carouselItems);const style=document.createElement("style");style.innerHTML=`.carousel{max-width:${largescreen};margin:auto;${border.size?`border:${border.size} ${border.style} ${border.color};`:""}}.carousel-item img{width:100%;max-width:100%;object-fit:${fiximagesizing};}@media (max-width:576px){.carousel{max-width:${smallscreen};}}.modal-img{max-width:100%;height:auto;}`,document.head.appendChild(style);const modalDiv=document.createElement("div");modalDiv.className="modal fade",modalDiv.id="imageModal",modalDiv.setAttribute("tabindex","-1"),modalDiv.setAttribute("aria-labelledby","imageModalLabel"),modalDiv.setAttribute("aria-hidden","true"),modalDiv.innerHTML=`<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body"><img src="" id="modalImage" class="modal-img" alt="${path}[directory_failed]"></div></div></div>`,document.body.appendChild(modalDiv);const modalImage=document.getElementById("modalImage");document.addEventListener("click",function(e){if(e.target.matches('[data-bs-target="#imageModal"]')){modalImage.src=e.target.getAttribute("data-image")}})

/**
 * Don't forget to add BOOTSTRAP, since most of the design used are BOOTSTRAP
 */