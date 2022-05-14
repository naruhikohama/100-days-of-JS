const counter = document.querySelector(".counter");
const input = document.querySelector(".input");

input.addEventListener("keyup", () => {
    counter.innerHTML = input.value.length;
});