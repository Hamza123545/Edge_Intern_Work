// Function to load stored data on page refresh
window.onload = function () {
    loadStoredData();
};

let create = () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validation for Confirm Password
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create object
    let user = { name, email, password };

    // Store in Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Add row with animation
    addRowWithAnimation(user);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
};

// Function to load stored users
function loadStoredData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => addRowWithAnimation(user, false));
}

// Function to add row with animation
function addRowWithAnimation(user, animate = true) {
    let tableBody = document.getElementById("result");

    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    `;

    if (animate) {
        row.classList.add("fade-in");
    }

    tableBody.appendChild(row);

    // Delete functionality
    row.querySelector(".delete-btn").addEventListener("click", function () {
        row.classList.add("fade-out");
        setTimeout(() => {
            row.remove();
            removeUserFromLocalStorage(user.email);
        }, 500);
    });
}

// Function to remove user from local storage
function removeUserFromLocalStorage(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(user => user.email !== email);
    localStorage.setItem("users", JSON.stringify(users));
}
