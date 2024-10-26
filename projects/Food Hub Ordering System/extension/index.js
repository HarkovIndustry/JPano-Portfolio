

let cart = {};

function renderFoodCards(filterCategory = "all") {
  const foodCardsContainer = document.getElementById("food-cards");
  foodCardsContainer.innerHTML = "";
  foods.forEach((food) => {
    if (filterCategory === "all" || food.categories.includes(filterCategory)) {
      const card = document.createElement("div");
      card.className = "col-sm-6 col-md-4 col-lg-3";
      card.innerHTML = `
                        <div class="card">
                            <img src="${
                              food.image
                            }" class="card-img-top" alt="${food.name}">
                            <div class="card-body">
                                <h5 class="card-title">${food.name}</h5>
                                <p class="card-text">Price: ₱${food.price.toFixed(
                                  2
                                )}</p>
                                <button class="btn btn-success" onclick="updateCart('${
                                  food.name
                                }', 1)">+</button>
                                <button class="btn btn-danger" onclick="updateCart('${
                                  food.name
                                }', -1)">-</button>
                                <p>Quantity: <span id="${
                                  food.name
                                }-quantity">0</span></p>
                                <p>Total Price: ₱<span id="${
                                  food.name
                                }-total">0.00</span></p>
                            </div>
                        </div>
                    `;
      foodCardsContainer.appendChild(card);
    }
  });
}

function updateCart(name, change) {
  if (!cart[name]) {
    cart[name] = 0;
  }
  cart[name] += change;
  if (cart[name] < 0) cart[name] = 0;

  document.getElementById(`${name}-quantity`).innerText = cart[name];
  document.getElementById(`${name}-total`).innerText = (
    cart[name] * foods.find((food) => food.name === name).price
  ).toFixed(2);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  let summary = "";
  let totalAmount = 0;
  for (const [name, quantity] of Object.entries(cart)) {
    if (quantity > 0) {
      const price = foods.find((food) => food.name === name).price;
      const itemTotal = price * quantity;
      summary += `${name}(${quantity}) = ₱${itemTotal.toFixed(2)}<br>`;
      totalAmount += itemTotal;
    }
  }
  if (summary) {
    Swal.fire({
      title: "Order Summary",
      html: `<p>${summary}</p>`,
      footer: `<strong>Total: ₱${totalAmount.toFixed(2)}</strong>`,
      showCancelButton: true,
      confirmButtonText: "Delivery",
      cancelButtonText: "Pick-up",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter Delivery Information",
          html: `
                                <input type="text" id="name" class="swal2-input" placeholder="Name" required>
                                <input type="text" id="address" class="swal2-input" placeholder="Address" required>
                                <input type="number" id="contact" class="swal2-input" placeholder="Contact Number" required>
                            `,
          showCloseButton: true,
          confirmButtonText: "Submit",
          focusConfirm: false,
          preConfirm: () => {
            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const contact = document.getElementById("contact").value;
            if (!name || !address || !contact) {
              Swal.showValidationMessage(`Please enter all fields`);
            }
            return { name: name, address: address, contact: contact };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Submitted",
              "Wait for the delivery personnel to reach out.",
              "success"
            ).then(() => {
              resetCart();
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Pick Up Address",
          text: `${address}`,
          confirmButtonText: "Done",
        }).then(() => {
          resetCart();
        });
      }
    });
  } else {
    Swal.fire("No items in cart!");
  }
});

function resetCart() {
  cart = {};
  foods.forEach((food) => {
    document.getElementById(`${food.name}-quantity`).innerText = 0;
    document.getElementById(`${food.name}-total`).innerText = "0.00";
  });
}

document
  .getElementById("category-selector")
  .addEventListener("change", (event) => {
    renderFoodCards(event.target.value);
  });

renderFoodCards();
