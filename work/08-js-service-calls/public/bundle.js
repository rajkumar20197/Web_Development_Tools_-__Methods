(()=>{var e={userName:"",savedWord:"",errorMessage:""},n="/api/session",t="/api/word";function o(){fetch(t).then((function(e){return e.json()})).then((function(n){e.savedWord=n.storedWord||"No word stored yet.",a()})).catch((function(e){return console.error("Error fetching stored word:",e)}))}function r(){document.getElementById("app").innerHTML='\n    <form id="login-form" class="login-form">\n      <label for="username">Username:</label>\n      <input type="text" id="username" required>\n      <button type="submit">Login</button>\n      <div class="error">'.concat(e.errorMessage,"</div>\n    </form>")}function a(){document.getElementById("app").innerHTML='\n    <div class="word-view">\n      <p>Hello, '.concat(e.userName,"</p>\n      <p>Stored word: ").concat(e.savedWord,'</p>\n      <form id="word-form" class="word-form">\n        <label for="word">New Word:</label>\n        <input type="text" id="word" required>\n        <button type="submit">Update Word</button>\n      </form>\n      <button class="logout-button">Logout</button>\n    </div>\n  ')}function s(s){var d,i;s.preventDefault(),s.target.classList.contains("login-form")?(i=document.getElementById("username").value,fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i})}).then((function(n){if(!n.ok)throw e.errorMessage="dog"===i?"Incorrect. Try again.":"Invalid username format.",new Error("login-failed");return n.json()})).then((function(n){e.userName=n.username,e.errorMessage="",o()})).catch((function(){return r()}))):s.target.classList.contains("word-form")&&(d=document.getElementById("word").value,fetch(t,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({word:d})}).then((function(e){if(!e.ok)throw new Error("Failed to update word");return e.json()})).then((function(n){e.savedWord=n.storedWord,a()})).catch((function(e){return console.error("Error changing stored word:",e)})))}function d(t){t.target.classList.contains("logout-button")&&fetch(n,{method:"DELETE"}).then((function(){e.userName="",r()}))}document.addEventListener("DOMContentLoaded",(function(){fetch(n).then((function(e){if(!e.ok)throw new Error("auth-missing");return e.json()})).then((function(n){e.userName=n.username,o()})).catch((function(){return r()}));var t=document.getElementById("app");t.addEventListener("click",d),t.addEventListener("submit",s)}))})();