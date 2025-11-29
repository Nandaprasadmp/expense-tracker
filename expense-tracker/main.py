import json
import os
import matplotlib.pyplot as plt

DATA_FILE = "data.json"

# -----------------------------
# SAFE DATA LOADING
# -----------------------------
def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                content = f.read().strip()
                if not content:
                    return []  # empty file → return empty list
                return json.loads(content)
        except:
            return []  # broken file → return empty list
    return []


# -----------------------------
# SAVE DATA
# -----------------------------
def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


# -----------------------------
# ADD EXPENSE
# -----------------------------
def add_expense():
    name = input("Enter expense name: ")
    amount = float(input("Enter amount: "))
    category = input("Enter category (Food/Travel/Shopping/Others): ")

    data = load_data()

    expense = {
        "name": name,
        "amount": amount,
        "category": category
    }

    data.append(expense)
    save_data(data)
    print("Expense added successfully!\n")


# -----------------------------
# VIEW EXPENSES
# -----------------------------
def view_expenses():
    data = load_data()

    if not data:
        print("No expenses found.\n")
        return

    print("\n----- All Expenses -----")
    for i, exp in enumerate(data, start=1):
        print(f"{i}. {exp['name']} - ₹{exp['amount']} ({exp['category']})")
    print()


# -----------------------------
# TOTAL EXPENSE
# -----------------------------
def show_total():
    data = load_data()

    total = sum(item["amount"] for item in data)
    print(f"\nTotal Expense: ₹{total}\n")


# -----------------------------
# CATEGORY CHART
# -----------------------------
def show_category_chart():
    data = load_data()

    if not data:
        print("No data to show chart.\n")
        return

    categories = {}
    for item in data:
        cat = item["category"]
        categories[cat] = categories.get(cat, 0) + item["amount"]

    plt.bar(categories.keys(), categories.values())
    plt.title("Expense by Category")
    plt.xlabel("Category")
    plt.ylabel("Amount Spent")
    plt.show()


# -----------------------------
# MENU
# -----------------------------
def menu():
    while True:
        print("===== Expense Tracker =====")
        print("1. Add Expense")
        print("2. View All Expenses")
        print("3. Show Total")
        print("4. Show Category Chart")
        print("5. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            add_expense()
        elif choice == "2":
            view_expenses()
        elif choice == "3":
            show_total()
        elif choice == "4":
            show_category_chart()
        elif choice == "5":
            print("Exiting program...")
            break
        else:
            print("Invalid choice! Try again.\n")


# Run the program
menu()
