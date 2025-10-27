// Configuration - API endpoint from environment variable or fallback
// In Azure Static Web Apps, environment variables are injected at build time
// For local development, you can use a fallback URL
const API_ENDPOINT =
  window.API_CONFIG?.endpoint ||
  "https://your-app-service.azurewebsites.net/api/user";

// Get form elements
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const messageDiv = document.getElementById("message");

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const userData = {
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
  };

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="btn-text">Sending...</span><span class="btn-icon">⏳</span>';

  try {
    // Send data to Azure App Service
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      showMessage(
        "success",
        `✅ Success! Data sent successfully. ${result.message || ""}`
      );
      form.reset();
    } else {
      const errorData = await response.json().catch(() => ({}));
      showMessage(
        "error",
        `❌ Error: ${
          errorData.message || "Failed to send data. Please try again."
        }`
      );
    }
  } catch (error) {
    console.error("Error sending data:", error);
    showMessage(
      "error",
      `❌ Network Error: Unable to connect to the server. Please check your connection and try again.`
    );
  } finally {
    // Restore button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});

// Show message function
function showMessage(type, text) {
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.className = "message hidden";
  }, 5000);
}

// Add input validation feedback
[nameInput, ageInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.validity.valid) {
      input.style.borderColor = "#48bb78";
    } else {
      input.style.borderColor = "#e2e8f0";
    }
  });

  input.addEventListener("blur", () => {
    if (input.value && !input.validity.valid) {
      input.style.borderColor = "#f56565";
    }
  });
});
