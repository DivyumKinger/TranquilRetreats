document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!username || username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please check your connection and try again.");
    }
  });
document.getElementById("password").addEventListener("input", (e) => {
  const password = e.target.value;
  const strength = calculatePasswordStrength(password);
  updatePasswordStrengthUI(strength);
});

function calculatePasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  return score;
}

function updatePasswordStrengthUI(score) {
  const strengthIndicator = document.getElementById("password-strength");
  if (!strengthIndicator) return;

  const strengths = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["#ff4d4d", "#ffad4d", "#4da6ff", "#4dff4d"];

  strengthIndicator.textContent = `Strength: ${strengths[score]}`;
  strengthIndicator.style.color = colors[score];
}
