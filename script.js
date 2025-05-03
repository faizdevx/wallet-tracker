const monthDisplay = document.getElementById("monthDisplay");
const remainingDisplay = document.getElementById("remaining");
const budgetDisplay = document.getElementById("budget");
const amountInput = document.getElementById("amount");
const monthText = document.getElementById("monthText");
let chart; // Global Chart instance

const now = new Date();
const currentMonthName = now.toLocaleString("default", { month: "long", year: "numeric" });
monthDisplay.innerText = `Month: ${currentMonthName}`;
monthText.innerText = currentMonthName;

const storageKey = `wallet_${now.getFullYear()}_${now.getMonth() + 1}`;

let remainingMoney = localStorage.getItem(storageKey);
if (!remainingMoney) {
  remainingMoney = 0;
  localStorage.setItem(storageKey, remainingMoney);
}
remainingDisplay.innerText = remainingMoney;

function updateMoney() {
  const value = parseFloat(amountInput.value);
  if (!isNaN(value) && value >= 0) {
    remainingMoney = value;
    localStorage.setItem(storageKey, remainingMoney);
    remainingDisplay.innerText = remainingMoney;
    budgetDisplay.innerHTML = "";
    amountInput.value = "";
  } else {
    alert("Please enter a valid non-negative number.");
  }
}
function generateBudget() {
    const amt = parseFloat(remainingMoney);
    if (amt > 0) {
      const needs = (amt * 0.5).toFixed(2);
      const wants = (amt * 0.3).toFixed(2);
      const savings = (amt * 0.2).toFixed(2);
  
      budgetDisplay.innerHTML = `
        <strong>🧾 Your 50/30/20 Budget</strong><br>
        ✅ <strong>Needs (50%)</strong>: ₹${needs}<br>
        🎉 <strong>Wants (30%)</strong>: ₹${wants}<br>
        💰 <strong>Savings (20%)</strong>: ₹${savings}
      `;
  
      const ctx = document.getElementById('budgetChart').getContext('2d');
  
      // Destroy existing chart before creating a new one
      if (chart) chart.destroy();
  
      chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Needs - 50%', 'Wants - 30%', 'Savings - 20%'],
          datasets: [{
            label: 'Budget Split',
            data: [needs, wants, savings],
            backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
  } else {
    alert("Please update your wallet with a valid amount first.");
  }
}
