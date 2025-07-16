
const loginForm = document.getElementById('loginForm');  // Your login form element
const logoutBtn = document.getElementById('logoutBtn');  // Your logout button element

let token = null;
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try{
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
       
         token = data.token; 
         localStorage.setItem('token', data.token);

          loginForm.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'inline-block';

        renderPostForm();
        fetchTopics();
      } else {
        alert(data.message || data.errors?.map(e => e.msg).join(', '));
      }
      } catch (err) {
        alert('An error occurred during login.');
        console.log(`Error while trying to login: ${err.message}`);
      }
    });

    // Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
  token = null;
  localStorage.removeItem('token');

   loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';

  loginForm.style.display = 'block';
  logoutBtn.style.display = 'none';

 
  document.getElementById('topicForm').innerHTML = '';
  fetchTopics();
});
}

// Topic rendering and fetching

window.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('token');
  if (token) {
    loginForm.style.display = 'none';
     if (logoutBtn) logoutBtn.style.display = 'inline-block';
    renderPostForm();
  } else {
    loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
  fetchTopics();
});

    async function fetchTopics() {
      const res = await fetch('/api/topics');
      const topics = await res.json();
      const container = document.getElementById('topics');
      container.innerHTML = '';
      topics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'card z-depth-2 hoverable grey lighten-2';

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('span');
        title.className = 'card-title';
        title.textContent = topic.title;

        const body = document.createElement('p');
        body.textContent = topic.content;

        const meta = document.createElement('p');
        meta.className = 'grey-text text-darken-2';
        meta.textContent = `${topic.username} | ${new Date(topic.createdAt).toLocaleString()}`;

        const actions = document.createElement('div');
        actions.className = 'card-action';

        const delBtn = document.createElement('button');
        delBtn.className = 'btn waves-effect waves-light';
        delBtn.textContent = 'Delete';
        delBtn.classList.add('deleteTopic');
        delBtn.onclick = async () => {
          const res = await fetch(`/api/topic/${topic._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const result = await res.json();
          if (res.ok) fetchTopics();
          else alert(result.message);
        };

        actions.appendChild(delBtn);
        content.appendChild(title);
        content.appendChild(body);
        content.appendChild(meta);
        card.appendChild(content);
        card.appendChild(actions);
        container.appendChild(card);
      });
    }

    function renderPostForm() {
      const form = document.getElementById('topicForm');
      form.innerHTML = `
        <div class="input-field">
          <input id="topicTitle" type="text" placeholder="Title">
        </div>
        <div class="input-field">
          <textarea id="topicText" class="materialize-textarea" placeholder="Write your post..."></textarea>
        </div>
        <button id="postTopic" class="btn waves-effect waves-light" type="submit">Post</button>
      `;

      document.getElementById('postTopic').addEventListener('click', async () => {
        const title = document.getElementById('topicTitle').value;
        const content = document.getElementById('topicText').value;
        await fetch('/api/topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title, content })
        });
        fetchTopics();
      });
    }

    fetchTopics();

    
