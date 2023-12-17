const form = document.querySelector(".login__form");
const email_label = document.querySelector("#email_label");
const pass_label = document.querySelector("#pass_label");

const storedFormData = localStorage.getItem("formData");
if (storedFormData) {
  const parsedData = JSON.parse(storedFormData);
  document.querySelector("#login-email").value = parsedData.email;
  document.querySelector("#login-pass").value = parsedData.name;
  console.log(storedFormData);
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const emailInput = document.querySelector("#login-email");
  const passInput = document.querySelector("#login-pass");
  const checkbox = document.querySelector("#login-check").checked;

  const email = emailInput.value.trim();
  const pass = passInput.value.trim();

  email_label.innerHTML = "Email";
  pass_label.innerHTML = "Password";

  if (email === "") {
    email_label.innerHTML = "Email cannot be empty";
  } else if (!isValidEmail(email)) {
    email_label.innerHTML = "Invalid email address";
  }

  if (pass === "") {
    pass_label.innerHTML = "Password cannot be empty";
    return;
  }

  const formData = {
    email: email,
    name: pass,
    checkbox: checkbox,
  };

  if (checkbox) {
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  console.log("Form Data:", formData);
  form.reset();
});

form.addEventListener(
  "invalid",
  (e) => {
    e.preventDefault();
  },
  true
);

form.addEventListener("input", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      iconEye.classList.add("ri-eye-line");
      iconEye.classList.remove("ri-eye-off-line");
    } else {
      input.type = "password";
      iconEye.classList.remove("ri-eye-line");
      iconEye.classList.add("ri-eye-off-line");
    }
  });
};

showHiddenPass("login-pass", "login-eye");
