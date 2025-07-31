document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault(); // form reload se bachaye

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("message").innerText =
        data.message || "User added";
      document.getElementById("userForm").reset(); // form clear
    })
    .catch((err) => {
      document.getElementById("message").innerText = "Error adding user";
      console.error(err);
    });
});
