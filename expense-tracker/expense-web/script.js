// Select elements
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const chartCanvas = document.getElementById("chart").getContext("2d");

let expenses;

// Safe load from localStorage
try {
    expenses = JSON.parse(localStorage.getItem("expenses"));
    if (!Array.isArray(expenses)) {
        expenses = [];
    }
} catch (e) {
    expenses = [];
}

let myChart;

// ----------------------
// Add Expense
// ----------------------
function addExpense() {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter valid name and amount.");
        return;
    }

    const expense = { name, amount, category };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    nameInput.value = "";
    amountInput.value = "";

    renderExpenses();
}

// ----------------------
// Render Expenses List + Total + Chart
// ----------------------
function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    const categoryTotals = {};

    expenses.forEach((exp, index) => {
        total += exp.amount;

        // Category totals for chart
        if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
        } else {
            categoryTotals[exp.category] = exp.amount;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.name} - ₹${exp.amount} <span>${exp.category}</span>
            <button onclick="deleteExpense(${index})">❌</button>
        `;
        expenseList.appendChild(li);
    });

    totalEl.textContent = total;

    renderChart(categoryTotals);
}

// ----------------------
// Delete Expense
// ----------------------
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
}

// ----------------------
// Render Chart using Chart.js
// ----------------------
function renderChart(data) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    if (myChart) {
        myChart.destroy(); // destroy previous chart before creating new
    }

    myChart = new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Amount Spent",
                data: values,
                backgroundColor: ["#6C63FF", "#FF6584", "#FFCD56", "#36A2EB"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// ----------------------
// Initial Render
// ----------------------
renderExpenses();
