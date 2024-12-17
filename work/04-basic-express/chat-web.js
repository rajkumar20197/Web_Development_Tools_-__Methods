const chatWeb = {
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/chat.css">
        </head>
        <body>
          <header>
            <h1><img class="logo" src="images/avatar-amit.jpg" alt="Logo"/>Web Chat</h1>
          </header>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoingSection(chat)}
          </div>
          <footer>
            <p>Terms and Conditions, Privacy Policy
            </p>
          </footer>
        </body>
      </html>
    `;
  },

  getMessageList: function(chat) {
    return `
      <ol class="messages">
        ${chat.messages.map(message => `
          <li>
            <div class="message">
              <div class="sender-info">
                <img class="avatar" src="/images/avatar-${message.sender.toLowerCase()}.jpg" alt="${message.sender}'s avatar">
                <span class="username">${message.sender}</span>
              </div>
              <p class="message-text">${message.text}</p>
            </div>
          </li>
        `).join('')}
      </ol>
    `;
  },

  getUserList: function(chat) {
    return `
      <ul class="users">
        ${Object.values(chat.users).map(user => `
          <li>
            <div class="user">
              <img class="avatar" src="/images/avatar-${user.toLowerCase()}.jpg" alt="${user}'s avatar">
              <span class="username">${user}</span>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  },

  getOutgoingSection: function() {
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <input type="hidden" name="username" value="Amit">
          <input type="text" name="text" class="to-send" placeholder="Type here..."/>
          <button type="submit" class="send-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>

          </button>
        </form>
      </div>
    `;
  }
};

module.exports = chatWeb;
