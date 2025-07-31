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

// ✅ Get all users and show on page
  function loadUsers() {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(users => {
        const list = document.getElementById('userList');
        list.innerHTML = ''; // purani list clear karo

        users.forEach(user => {
          const li = document.createElement('li');
          li.innerText = `${user.id}. ${user.name} - ${user.email}`;
          list.appendChild(li);
        });
      })
      .catch(err => {
        console.error('Error loading users:', err);
      });
  }

  // ✅ Page load hone par user list fetch karo
  window.onload = loadUsers;

  // ✅ Jab naya user add ho to list refresh karo
  document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('message').innerText = data.message || 'User added';
      document.getElementById('userForm').reset();
      loadUsers(); // ✅ naya user add hone ke baad list update karo
    })
    .catch(err => {
      document.getElementById('message').innerText = 'Error adding user';
      console.error(err);
    });
  });