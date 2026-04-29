const STORAGE_KEY = "aqi-chatbot-alert";

function loadSavedUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors so the widget still works in restricted contexts.
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char] || char;
  });
}

function createMessage(text, author = "bot") {
  return `
    <div class="chatbot__message chatbot__message--${author}">
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function initChatbot() {
  if (document.querySelector("[data-chatbot-root]")) {
    return;
  }

  const savedUser = loadSavedUser();
  const root = document.createElement("section");
  root.className = "chatbot";
  root.setAttribute("data-chatbot-root", "");

  root.innerHTML = `
    <button
      type="button"
      class="chatbot__toggle"
      aria-expanded="false"
      aria-controls="chatbotPanel"
    >
      <span class="chatbot__toggle-icon">AQI</span>
      <span class="chatbot__toggle-copy">Chat with us</span>
    </button>

    <div id="chatbotPanel" class="chatbot__panel" hidden>
      <div class="chatbot__header">
        <div>
          <span class="chatbot__eyebrow">AQI Assistant</span>
          <strong>Alert setup</strong>
        </div>
        <button type="button" class="chatbot__close" aria-label="Close chatbot">X</button>
      </div>

      <div class="chatbot__messages" aria-live="polite"></div>

      <form class="chatbot__form">
        <label class="chatbot__label" for="chatbotInput">Reply here</label>
        <input
          id="chatbotInput"
          class="chatbot__input"
          type="text"
          autocomplete="off"
          placeholder="Type your answer..."
          required
        />
        <button type="submit" class="button button--primary chatbot__submit">Continue</button>
      </form>
    </div>
  `;

  document.body.append(root);

  const toggle = root.querySelector(".chatbot__toggle");
  const panel = root.querySelector(".chatbot__panel");
  const close = root.querySelector(".chatbot__close");
  const messages = root.querySelector(".chatbot__messages");
  const form = root.querySelector(".chatbot__form");
  const input = root.querySelector(".chatbot__input");
  const label = root.querySelector(".chatbot__label");
  const submit = root.querySelector(".chatbot__submit");

  let state = savedUser && savedUser.stateName ? "done" : "name";
  let user = savedUser || { name: "", email: "", stateName: "" };

  function renderConversation() {
    if (state === "done") {
      messages.innerHTML = [
        createMessage(`Welcome back${user.name ? `, ${user.name}` : ""}.`),
        createMessage(`We already have ${user.email} saved for ${user.stateName}.`),
        createMessage("You are added to the thread now. You will receive upcoming alerts and notifications.")
      ].join("");
      label.textContent = "AQI alert added";
      input.value = "";
      input.placeholder = "Your alert is active";
      input.disabled = true;
      submit.disabled = true;
      submit.textContent = "Added";
      return;
    }

    if (state === "name") {
      messages.innerHTML = createMessage("Hi there. What is your name?");
      label.textContent = "Enter your name";
      input.value = "";
      input.type = "text";
      input.placeholder = "Your name";
      input.disabled = false;
      submit.disabled = false;
      submit.textContent = "Continue";
      return;
    }

    if (state === "email") {
      messages.innerHTML = [
        createMessage(`Welcome ${user.name}!`),
        createMessage("Please enter your email for AQI alert notification."),
      ].join("");
      label.textContent = "Enter your email";
      input.value = user.email;
      input.type = "email";
      input.placeholder = "name@example.com";
      input.disabled = false;
      submit.disabled = false;
      submit.textContent = "Continue";
      return;
    }

    if (state === "state") {
      messages.innerHTML = [
        createMessage(`Welcome ${user.name}!`),
        createMessage(`Great, we will use ${user.email} for your AQI alert notification.`),
        createMessage("Which state do you belong to?")
      ].join("");
      label.textContent = "Enter your state";
      input.value = user.stateName;
      input.type = "text";
      input.placeholder = "Example: Delhi";
      input.disabled = false;
      submit.disabled = false;
      submit.textContent = "Continue";
      return;
    }

    if (state === "confirm") {
      messages.innerHTML = [
        createMessage(`Welcome ${user.name}!`),
        createMessage(`We will send AQI alert notifications to ${user.email} for ${user.stateName}.`),
        createMessage("Please type yes to confirm.")
      ].join("");
      label.textContent = "Type yes to confirm";
      input.value = "";
      input.type = "text";
      input.placeholder = "Type yes";
      input.disabled = false;
      submit.disabled = false;
      submit.textContent = "Confirm";
    }
  }

  function openPanel() {
    panel.hidden = false;
    root.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    renderConversation();
    window.setTimeout(() => input.focus(), 50);
  }

  function closePanel() {
    panel.hidden = true;
    root.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openPanel();
      return;
    }

    closePanel();
  });

  close.addEventListener("click", closePanel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = input.value.trim();

    if (state === "name") {
      if (!value) {
        input.focus();
        return;
      }

      user.name = value;
      state = "email";
      renderConversation();
      input.focus();
      return;
    }

    if (state === "email") {
      if (!isValidEmail(value)) {
        messages.innerHTML = [
          createMessage(`Welcome ${user.name}!`),
          createMessage("Please enter your email for AQI alert notification."),
          createMessage("That email looks invalid. Please enter a valid email address.")
        ].join("");
        input.focus();
        return;
      }

      user.email = value;
      console.log("AQI alert email entered:", user.email);
      state = "state";
      renderConversation();
      input.focus();
      return;
    }

    if (state === "state") {
      if (!value) {
        input.focus();
        return;
      }

      user.stateName = value;
      state = "confirm";
      renderConversation();
      input.focus();
      return;
    }

    if (state === "confirm") {
      if (value.toLowerCase() !== "yes") {
        messages.innerHTML = [
          createMessage(`Welcome ${user.name}!`),
          createMessage(`We will send AQI alert notifications to ${user.email} for ${user.stateName}.`),
          createMessage("Please type yes to confirm."),
          createMessage("Confirmation not received yet. Type yes when you are ready.")
        ].join("");
        input.focus();
        return;
      }

      state = "done";
      saveUser(user);
      renderConversation();
    }
  });
}

initChatbot();
