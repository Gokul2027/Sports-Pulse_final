document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;
    const eventChoice = document.getElementById("event").value;

    // Validate phone number (should be exactly 10 digits)
    if (phonenumber.length !== 10 || !/^\d{10}$/.test(phonenumber)) {
      document.getElementById("message").textContent =
        "Please enter a valid 10-digit phone number.";
      return;
    }

    // Send data to the backend via POST request
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phonenumber, email, event: eventChoice }),
    });

    const result = await response.json();
    document.getElementById("message").textContent = result.message;

    // Wait for 2-3 seconds before redirecting
    if (response.ok) {
      setTimeout(() => {
        window.location.href = "register.html"; // Redirect to register.html after a delay
      }, 1500); // Adjust the delay as needed (3000ms = 3 seconds)
    }
  });
