// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Get references to HTML elements
    const registerLink = document.getElementById("register-link");
    const loginLink = document.getElementById("login-link");
    const registrationPage = document.getElementById("registration-page");
    const loginPage = document.getElementById("login-page");
    const userProfilePage = document.getElementById("user-profile-page");
    const registrationForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const addItemLink = document.getElementById("add-item-link");
    const addItemPage = document.getElementById("add-item-page");
    const addItemForm = document.getElementById("add-item-form");
    const itemDisplay = document.getElementById("item-display");
    const itemContainer = document.getElementById("item-container");
    const logoutButton = document.getElementById("logout-button");
  
    // Add event listeners
    registerLink.addEventListener("click", function(e) {
      e.preventDefault();
      showRegistrationPage();
    });
  
    loginLink.addEventListener("click", function(e) {
      e.preventDefault();
      showLoginPage();
    });
  
    registrationForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      registerUser(name, email, password);
      showLoginPage();
    });
  
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      loginUser(email, password);
      showUserProfilePage();
    });

    addItemLink.addEventListener("click", function(e) {
      e.preventDefault();
      showAddItemPage();
    });
  
    addItemForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const item = {
        name: document.getElementById("item-name").value,
        description: document.getElementById("item-description").value,
        category: document.getElementById("item-category").value,
        color: document.getElementById("item-color").value,
        size: document.getElementById("item-size").value,
        image: document.getElementById("item-image").files[0]
      };
      addItem(item);
      showAddItemPage();
    });

    logoutButton.addEventListener("click", function(e) {
      e.preventDefault();
      logoutUser();
    });
  
    // Check if user is already registered
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      displayUserProfile(user);
      showUserProfilePage();
    } else {
      showLoginPage();
    }

    // Check if user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      displayItems();
      showAddItemLink();
      showLogoutButton();
    } else {
      showLoginPage();
    }
  
    // Functions to handle user registration, login, and profile display
    function registerUser(name, email, password) {
      // Store the user data in local storage or send to server
      // You can store the user data in an array or object for now
      const user = { name, email, password };
      // Store the user object in local storage (for demonstration purposes only)
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    function loginUser(email, password) {
      // Retrieve user data from local storage or fetch from server
      // For demonstration purposes, retrieve the user object from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === email && user.password === password) {
        // Successful login
        displayUserProfile(user);
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }

    // Functions to handle user login, logout, and authorization
    function loginUser(email, password) {
      // Retrieve user data from local storage or fetch from server
      // For demonstration purposes, retrieve the user object from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === email && user.password === password) {
        // Successful login
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        displayItems();
        showAddItemLink();
        showLogoutButton();
        showUserProfilePage();
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }

    function logoutUser() {
      localStorage.removeItem("loggedInUser");
      hideAddItemLink();
      hideLogoutButton();
      showLoginPage();
    }
  
    function displayUserProfile(user) {
      // Display user profile information
      profileName.textContent = "Name: " + user.name;
      profileEmail.textContent = "Email: " + user.email;
    }
  
    function showRegistrationPage() {
      registrationPage.style.display = "block";
      loginPage.style.display = "none";
      userProfilePage.style.display = "none";
    }
  
    function showLoginPage() {
      registrationPage.style.display = "none";
      loginPage.style.display = "block";
      userProfilePage.style.display = "none";
    }
  
    function showUserProfilePage() {
      registrationPage.style.display = "none";
      loginPage.style.display = "none";
      userProfilePage.style.display = "block";
    }

    // Function to handle item submission and storage
    function addItem(item) {
      // Perform any necessary validation or processing of the item data
  
      // For demonstration purposes, you can store the item data in an array
      // You can also consider using local storage or a server/database for storage
      // Here, we will simply add the item object to an array
      items.push(item);
      displayItems();
    }
  
    // Function to display the added items
    function displayItems() {
      // Clear existing items from the display
      itemDisplay.innerHTML = "";
  
      // Iterate over the items array and generate HTML elements to display each item
      items.forEach(function(item) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
  
        // Set up the content for each item (you can customize this based on your design)
        itemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>Description: ${item.description}</p>
          <p>Category: ${item.category}</p>
          <p>Color: ${item.color}</p>
          <p>Size: ${item.size}</p>
          <img src="${URL.createObjectURL(item.image)}" alt="${item.name}" width="200">
        `;
  
        // Append the item element to the item display container
        itemDisplay.appendChild(itemElement);
      });
    }
  
    // Function to display the added items
    function displayItems() {
      // Clear existing items from the display
      itemContainer.innerHTML = "";

      // Retrieve items from storage (e.g., an array or a database)
      const items = retrieveItems();

      // Iterate over the items array and generate HTML elements to display each item
      items.forEach(function(item) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        // Set up the content for each item
        itemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>Description: ${item.description}</p>
          <p>Category: ${item.category}</p>
          <p>Color: ${item.color}</p>
          <p>Size: ${item.size}</p>
          <img src="${item.image}" alt="${item.name}" width="200">
        `;

        // Append the item element to the item container
        itemContainer.appendChild(itemElement);
      });
    }

    // Function to retrieve items from storage (e.g., local storage or a database)
    function retrieveItems() {
      // Implement your logic to retrieve items
      // For demonstration purposes, we will assume an array of items stored in local storage
      const storedItems = JSON.parse(localStorage.getItem("items"));
      return storedItems ? storedItems : [];
    }

    // Function to show the Add Item page
    function showAddItemPage() {
      addItemPage.style.display = "block";
      // Hide other pages if needed
    }

    // Helper functions for displaying/hiding UI elements based on user authentication
    function showAddItemLink() {
      addItemLink.style.display = "inline-block";
    }

    function hideAddItemLink() {
      addItemLink.style.display = "none";
    }

    // Function to handle item submission and storage
    function addItem(item) {
      // Perform any necessary validation or processing of the item data
  
      // Retrieve existing items from storage (e.g., an array or a database)
      const items = retrieveItems();
  
      // Add the new item to the array
      items.push(item);
  
      // Store the updated items in storage (e.g., local storage or a database)
      storeItems(items);
  
      // Refresh the display of items
      displayItems();
    }

    // Function to store items in storage (e.g., local storage or a database)
    function storeItems(items) {
      // Implement your logic to store items
      // For demonstration purposes, we will store the items array in local storage
      localStorage.setItem("items", JSON.stringify(items));
    }

    function showLogoutButton() {
      logoutButton.style.display = "inline-block";
    }

    function hideLogoutButton() {
      logoutButton.style.display = "none";
    }
  });
  