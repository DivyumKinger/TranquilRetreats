document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      window.location.href = "/"; // Redirect to the homepage
    } else {
      if (data.redirect) {
        alert("User not found. Redirecting to registration page...");
        window.location.href = data.redirect;
      } else {
        alert(data.error || "Login failed. Please check your credentials.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
});

// Show/hide password toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".password-toggle");
  const passwordInput = document.getElementById("password");

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const icon = toggleBtn.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }
});
