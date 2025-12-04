const productDescription = document.querySelector(".product__description");
const productDescriptionModal = document.querySelector(".modal__product-description");
const overlayCanvasBlur = document.querySelector(".canvas__overlay-blur-product-description");
const btncCloseProductDescription = document.querySelector(".product__description-btn-close");
const btnAddToFavorite = document.querySelector(".add-favorites");
const templateModal = document.querySelector("#template__card-description").content;
const modalProductDescription = document.querySelector(".modal__product-description");

async function showProducts(id) {
  try {
    // Find product in mock data
    const product = mockProducts.find((p) => p.id === id);

    const fragment = document.createDocumentFragment();
    productDescriptionModal.textContent = "";

    if (product) {
      const { name, price, imageUrl, description } = product;
      const card = templateModal.cloneNode(true);
      card.querySelector(".product__description-content-title").textContent = name;
      card.querySelector(".product__description-content-price").textContent = price;
      card.querySelector(".product__description-content-description").textContent = description; // Note: The original HTML structure might need adjustment if description is inside a p tag
      // Actually, looking at the template in index.html:
      // <div class="product__description-content-description">
      //   <h2>Descripción</h2>
      //   <p>...</p>
      // </div>
      // So setting textContent on the container might wipe out the h2. 
      // Let's target the p tag if possible, or just append the text.
      // The original code did: card.querySelector(".product__description-content-description").textContent = description;
      // This would replace the entire content including the <h2>. 
      // Let's fix this to target the p tag if it exists, or just set the description text.

      // Let's check the template structure in index.html again.
      // <div class="product__description-content-description">
      //   <h2>Descripción</h2>
      //   <p>...</p>
      // </div>

      const descriptionContainer = card.querySelector(".product__description-content-description");
      const descriptionParagraph = descriptionContainer.querySelector("p");
      if (descriptionParagraph) {
        descriptionParagraph.textContent = description;
      } else {
        // Fallback if p tag is missing
        descriptionContainer.textContent = description;
      }

      card.querySelector("img").src = imageUrl;

      const favoriteItem = card.querySelector(".add-favorites");
      card.querySelector(".add-favorites").addEventListener("click", () => {
        favoriteItem.classList.toggle("active");
        console.log("Añadir a favoritos");
      });

      fragment.appendChild(card);
    }

    productDescriptionModal.appendChild(fragment);
  } catch (error) {
    console.log(error);
  }
}
const toggleDescription = () => {
  productDescription.classList.toggle("active");
  overlayCanvasBlur.classList.toggle("active");
  modalProductDescription.classList.toggle("active");
};

window.showProductDescription = (event) => {
  const idProduct = event.target.parentElement.dataset.id;
  toggleDescription();
  showProducts(idProduct);
};

btncCloseProductDescription.addEventListener("click", () => {
  toggleDescription();
});

overlayCanvasBlur.addEventListener("click", () => {
  toggleDescription();
});
