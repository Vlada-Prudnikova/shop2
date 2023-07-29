const categoriesBlock = document.querySelector(".categories");
const productsBlock = document.querySelector(".products");
const productDetailsBlock = document.querySelector(".product-details");
const orderForm = document.querySelector(".order-form");
const buyButton = document.querySelector(".button");

const categoriesData = [
  { id: 1, name: "Категорія 1" },
  { id: 2, name: "Категорія 2" },
  { id: 3, name: "Категорія 3" },
];

const productsData = [
  { id: 1, name: "Товар 1", categoryId: 1, description: "Опис товару 1" },
  { id: 2, name: "Товар 2", categoryId: 1, description: "Опис товару 2" },
  { id: 3, name: "Товар 3", categoryId: 2, description: "Опис товару 3" },
];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayCategories() {
  categoriesBlock.innerHTML = "";

  for (const category of categoriesData) {
    const categoryElement = document.createElement("div");
    categoryElement.textContent = category.name;

    categoryElement.addEventListener("click", () => {
      displayProducts(category.id);
    });

    categoriesBlock.appendChild(categoryElement);
  }
}

function displayProducts(categoryId) {
  productsBlock.innerHTML = "";

  const filteredProducts = productsData.filter(
    (product) => product.categoryId === categoryId
  );

  for (const product of filteredProducts) {
    const productElement = document.createElement("div");
    productElement.textContent = product.name;

    productElement.addEventListener("click", () => {
      displayProductDetails(product);
    });

    productsBlock.appendChild(productElement);
  }
}

function displayProductDetails(product) {
  productDetailsBlock.innerHTML = "";

  const productNameElement = document.createElement("h2");
  productNameElement.textContent = product.name;

  const productDescriptionElement = document.createElement("p");
  productDescriptionElement.textContent = product.description;

  productDetailsBlock.appendChild(productNameElement);
  productDetailsBlock.appendChild(productDescriptionElement);

  orderForm.style.display = "block";
}

function displayOrders() {
  productsBlock.style.display = "none"; // Hide the products block
  categoriesBlock.style.display = "none"; // Hide the categories block
  orderForm.style.display = "none"; // Hide the order form

  const ordersContainer = document.querySelector(".orders-container");
  ordersContainer.innerHTML = "";

  for (const order of orders) {
    const orderElement = document.createElement("div");
    const orderDateElement = document.createElement("p");
    const orderPriceElement = document.createElement("p");

    orderDateElement.textContent = `Дата замовлення: ${order.date}`;
    orderPriceElement.textContent = `Ціна: ${order.price} грн`;

    orderElement.appendChild(orderDateElement);
    orderElement.appendChild(orderPriceElement);

    orderElement.addEventListener("click", () => {
      displayOrderDetails(order);
    });

    orderElement.addEventListener("contextmenu", (event) => {
      event.preventDefault(); // Prevent default right-click menu
      deleteOrder(order);
    });

    ordersContainer.appendChild(orderElement);
  }
}

function deleteOrder(orderToDelete) {
  orders = orders.filter((order) => order !== orderToDelete);
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders(); // Refresh the displayed orders after deletion
}

const myOrdersButton = document.querySelector(".my-orders-button");
myOrdersButton.addEventListener("click", () => {
  displayOrders();
});

function saveOrderToLocalStorage(order) {
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function submitOrder() {
  const pibInput = document.getElementById("pib");
  const cityInput = document.getElementById("city");
  const postOfficeInput = document.getElementById("post-office");
  const paymentTypeInput = document.getElementById("payment-type");
  const quantityInput = document.getElementById("quantity");

  if (
    pibInput.value.trim() === "" ||
    postOfficeInput.value.trim() === "" ||
    quantityInput.value.trim() === ""
  ) {
    alert("Будь ласка, заповніть всі обов'язкові поля!");
    return false;
  }
  saveOrderToLocalStorage(orderDetails);
  const orderDetails = {
    pib: pibInput.value.trim(),
    city: cityInput.value,
    postOffice: postOfficeInput.value.trim(),
    paymentType: paymentTypeInput.value,
    quantity: parseInt(quantityInput.value),
    comment: document.getElementById("comment").value.trim(),
  };

  console.log("Інформація про замовлення:", orderDetails);

  alert("Замовлення успішно оформлено!");
  resetState();
  return false;
}
buyButton.addEventListener("click", () => {
  orderForm.style.display = "block";
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Замовлення підтверджено!");
  orderForm.reset();
  orderForm.style.display = "none";
});

function resetState() {
  productDetailsBlock.innerHTML = "";
  orderForm.style.display = "none";
  displayCategories();
}

displayCategories();
