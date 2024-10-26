const cardTargetDiv = "cardcontainer"; // select an empty div for cards
const carouselTargetDiv = "carouselcontainer"; // select an empty div for carousel
const path = "images/card/"; // directory before the file name for cards
const carouselPath = "images/carousel/"; // directory before the file name for carousel
const LGscreen = 6; // pcs shown in row for Large Screen (Desktop)
const MDscreen = 4; // pcs shown in row for Medium Screen (Tablet)
const XSscreen = 2; // pcs shown in row for Small Screen (Mobile)
const displayHeader = false; // activate Header, false to disable
const headerText = "Header Title"; // text displayed in header
const headerColor = "white"; // text color for the text:header
const headerBackground = "#007bff"; // background color for the header
const headerTextPosition = "middle"; // position of the header text: (start, middle, end)
const containerBG = "#f8f9fa"; // background color for the container
const imageHeight = "200px"; // height adjustment for the image inside the card
const imageBorderSize = "2px"; // border size adjustment for the image inside the card
const imageBorderColor = "black"; // border color adjustment for the image inside the card
const titleColor = "#343a40"; // text color for the title:card
const textColor = "#6c757d"; // text color for the text:card

/* minified CODE [CARD dynamic] */
const lgcol = 12 / LGscreen,
  mdcol = 12 / MDscreen,
  xscol = 12 / XSscreen,
  cardContainer = document.getElementsByClassName(cardTargetDiv)[0];
cardContainer.classList.add("container"),
  displayHeader &&
    ((header = document.createElement("h1")),
    (header.innerText = headerText),
    (header.style.color = headerColor),
    (header.style.backgroundColor = headerBackground),
    header.classList.add("text-center", "py-3", "mb-4", "rounded", "shadow"),
    (header.style.textAlign = headerTextPosition),
    cardContainer.appendChild(header));
const cardRow = document.createElement("div");
(cardRow.className = "row"),
  cardData.forEach((item) => {
    const col = document.createElement("div");
    (col.className = `col-lg-${lgcol} col-md-${mdcol} col-${xscol} mb-3`),
      (col.innerHTML = `<div class="card shadow-sm"><img src="${path}${
        item.image
      }" class="card-img-top" alt="${path}${
        item.image
      }-not Found" data-bs-toggle="modal" data-bs-target="#imageModal" data-image="${path}${
        item.image
      }"><div class="card-body">${
        item.title ? `<h5 class="card-title">${item.title}</h5>` : ""
      }${
        item.text ? `<p class="card-text">${item.text}</p>` : ""
      }</div></div>`),
      cardRow.appendChild(col);
  }),
  cardContainer.appendChild(cardRow);
const cardStyles = `.${cardTargetDiv}{padding:20px;box-shadow:0 4px 20px rgba(0,0,0,0.1);border-radius:10px;background-color:${containerBG};}.card{transition:transform 0.2s,box-shadow 0.2s;height:100%;border:${imageBorderSize} solid ${imageBorderColor};border-radius:5px;}.card img{object-fit:cover;height:${imageHeight};width:100%;border-top-left-radius:5px;border-top-right-radius:5px;}.card:hover{transform:scale(1.05);box-shadow:0 8px 30px rgba(0,0,0,0.2);}.card-title{color:${titleColor};font-weight:bold;}.card-text{color:${textColor};}.modal-img{max-width:100%;height:auto;}`,
  cardStyleSheet = document.createElement("style");
(cardStyleSheet.type = "text/css"),
  (cardStyleSheet.innerText = cardStyles),
  document.head.appendChild(cardStyleSheet);
const cardModal = document.createElement("div");
(cardModal.className = "modal fade"),
  (cardModal.id = "imageModal"),
  (cardModal.tabIndex = -1),
  cardModal.setAttribute("aria-labelledby", "imageModalLabel"),
  cardModal.setAttribute("aria-hidden", "true"),
  (cardModal.innerHTML = `<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body"><img src="" id="modalImage" class="modal-img" alt="Large Image"></div></div></div>`),
  document.body.appendChild(cardModal);
const cardModalImage = document.getElementById("modalImage");
document.addEventListener("click", function (e) {
  if (e.target.matches('[data-bs-target="#imageModal"]')) {
    cardModalImage.src = e.target.getAttribute("data-image");
  }
});

/* Carousel Configuration */
const carouselTime = 0; // 0 - disable autoswipe
const carouselBorder = {
  size: "0.3rem",
  style: "solid",
  color: "black",
};
const carouselFixImageSizing = "";
const carouselLargeScreen = "50vw";
const carouselSmallScreen = "80vw";

/* minified Code [Carousel dynamic] */
const autoplay = carouselTime > 0,
  carouselItems = document.createElement("div");
(carouselItems.className = "carousel slide"),
  carouselItems.setAttribute("data-bs-ride", autoplay ? "carousel" : "false"),
  (carouselItems.id = "carouselExample");
const innerCarouselDiv = document.createElement("div");
(innerCarouselDiv.className = "carousel-inner"),
  (innerCarouselDiv.id = "carouselItems"),
  carouselData.forEach((image, index) => {
    const item = document.createElement("div");
    (item.className = `carousel-item ${index === 0 ? "active" : ""}`),
      (item.innerHTML = `<img src="${carouselPath}${image}" class="d-block" alt="Slide ${
        index + 1
      }" data-bs-toggle="modal" data-bs-target="#imageModal" data-image="${carouselPath}${image}">`),
      innerCarouselDiv.appendChild(item);
  }),
  carouselItems.appendChild(innerCarouselDiv),
  (carouselItems.innerHTML += `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>`),
  document.querySelector(`.${carouselTargetDiv}`).appendChild(carouselItems);
const carouselStyle = document.createElement("style");
(carouselStyle.innerHTML = `.carousel{max-width:${carouselLargeScreen};margin:auto;${
  carouselBorder.size
    ? `border:${carouselBorder.size} ${carouselBorder.style} ${carouselBorder.color};`
    : ""
}}.carousel-item img{width:100%;max-width:100%;object-fit:${carouselFixImageSizing};}@media (max-width:576px){.carousel{max-width:${carouselSmallScreen};}}.modal-img{max-width:100%;height:auto;`),
  document.head.appendChild(carouselStyle);
const carouselModalDiv = document.createElement("div");
(carouselModalDiv.className = "modal fade"),
  (carouselModalDiv.id = "imageModal"),
  carouselModalDiv.setAttribute("tabindex", "-1"),
  carouselModalDiv.setAttribute("aria-labelledby", "imageModalLabel"),
  carouselModalDiv.setAttribute("aria-hidden", "true"),
  (carouselModalDiv.innerHTML = `<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-body"><img src="" id="modalImage" class="modal-img" alt="${carouselPath}[directory_failed]"></div></div></div>`),
  document.body.appendChild(carouselModalDiv);
const carouselModalImage = document.getElementById("modalImage");
document.addEventListener("click", function (e) {
  if (e.target.matches('[data-bs-target="#imageModal"]')) {
    carouselModalImage.src = e.target.getAttribute("data-image");
  }
});

/**
 * Don't forget to add BOOTSTRAP, since most of the designs here are from BOOTSTRAP
 */
