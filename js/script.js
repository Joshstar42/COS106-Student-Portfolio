// Shared navigation and interactive features for the portfolio website.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Academic planner: tasks are stored in localStorage for this browser.
  const taskForm = document.getElementById('task-form');
  if (taskForm) {
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');
    const count = document.getElementById('task-count');
    let tasks = JSON.parse(localStorage.getItem('cos106Tasks') || '[]');
    function saveTasks() {
      localStorage.setItem('cos106Tasks', JSON.stringify(tasks));
      renderTasks();
    }
    function renderTasks() {
      list.innerHTML = '';
      tasks.forEach((task, index) => {
        const item = document.createElement('li');
        if (task.completed) item.classList.add('done');
        const check = document.createElement('input');
        check.type = 'checkbox'; check.checked = task.completed; check.setAttribute('aria-label', 'Mark task complete');
        check.addEventListener('change', () => { tasks[index].completed = check.checked; saveTasks(); });
        const label = document.createElement('span'); label.textContent = task.text;
        const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'small-btn delete'; remove.textContent = 'Delete';
        remove.addEventListener('click', () => { tasks.splice(index, 1); saveTasks(); });
        item.append(check, label, remove); list.appendChild(item);
      });
      const completed = tasks.filter(t => t.completed).length;
      count.textContent = `${tasks.length} task(s) · ${completed} completed`;
    }
    taskForm.addEventListener('submit', event => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      tasks.push({ text, completed: false }); input.value = ''; saveTasks();
    });
    renderTasks();
  }

  // Contact form validation (demonstration only; no server sends the message).
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      const feedback = document.getElementById('form-feedback');
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const phoneOK = /^\d+$/.test(phone);
      if (!name || !email || !phone || !message) feedback.textContent = 'Please complete every field.';
      else if (!emailOK) feedback.textContent = 'Please enter a valid email address.';
      else if (!phoneOK) feedback.textContent = 'Phone number must contain digits only.';
      else feedback.textContent = 'Validation successful. This demonstration form does not send data to a server.';
    });
  }
});
