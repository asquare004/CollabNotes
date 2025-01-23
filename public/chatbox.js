document.addEventListener("DOMContentLoaded", function() {
    const chatIcon = document.getElementById("chatIcon");
    const chatBox = document.getElementById("chatBox");
    const closeBtn = document.getElementById("closeBtn");

    chatIcon.addEventListener("click", function() {
      chatBox.style.display = "block";
    });
  
    closeBtn.addEventListener("click", function() {
      chatBox.style.display = "none";
    });
  });
  
  function displayMessage(){
    var Message = document.getElementById('message').value;
    var outMessage = document.getElementById('outgoing-msg');
    outMessage.innerHTML = Message;  
  }
