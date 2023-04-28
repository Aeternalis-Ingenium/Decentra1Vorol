import { LendLord_backend } from "../../declarations/LendLord_backend";

window.addEventListener("load", async function() {
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");
  let isTransaction = false;
  const currentAmount = await LendLord_backend.checkBalance();
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await LendLord_backend.topUp(inputAmount);
    isTransaction = true;
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await LendLord_backend.withdraw(outputAmount);
    isTransaction = true;
  }

  await LendLord_backend.calculateCompoundInterest(isTransaction);
  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await LendLord_backend.checkBalance();
  document.getElementById("value").innerText = Number(Number(currentAmount).toFixed(3));
};
