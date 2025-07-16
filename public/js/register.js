document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const isAdmin = document.getElementById('isAdmin').checked;

      try {
        const res = await fetch('http://localhost:3000/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, isAdmin })
        });

        const data = await res.json();

        if (res.ok) {
          alert('Registration successful');
          window.location.href = '/index.html';
        } else {
          alert(data.message || (data.errors && data.errors.map(e => e.msg).join(', ')));
        }
      } catch (err) {
        alert('An error occurred during registration.');
        console.error(err);
      }
    });