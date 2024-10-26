const carouselItems = document.getElementById("carouselItems");
carousel.forEach((image, index) => {
  const item = document.createElement("div");
  item.className = `carousel-item ${index === 0 ? "active" : ""}`;
  item.innerHTML = `<img src="images/carousel/${image}" class="d-block" alt="Slide ${
    index + 1
  }"
   data-bs-toggle="modal" data-bs-target="#imageModal" data-image="images/carousel/${image}">`;
  carouselItems.appendChild(item);
});

const galleryItems = document.getElementById("galleryItems");
gallery.forEach((image) => {
  const col = document.createElement("div");
  col.className = "col-lg-3 col-4 mb-3";
  col.innerHTML = `<div class="card"><img src="images/gallery/${image}" 
  class="card-img-top" alt="Gallery Image" data-bs-toggle="modal" data-bs-target="#imageModal"
   data-image="images/gallery/${image}"><div class="card-body"></div></div>`;
  galleryItems.appendChild(col);
});

const modalImage = document.getElementById("modalImage");
document.addEventListener("click", function (e) {
  if (e.target.matches('[data-bs-target="#imageModal"]')) {
    modalImage.src = e.target.getAttribute("data-image");
  }
});
