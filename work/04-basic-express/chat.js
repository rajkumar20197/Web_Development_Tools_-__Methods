const users = { 
  "Amit": "Amit", 
  "Bao": "Bao",  
};

const messages = [ 
  {
      sender: "Amit",
      text: "You up?",
  },
  {
      sender: "Bao",
      text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  },
  {
    sender: "Amit",
    text: "Haha, cat videos are productivity traps",
  },
];

function addMessage({ sender, text }) { 
  messages.push({
      sender,
      text,
  }); 
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;
