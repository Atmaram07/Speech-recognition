// SPEECH RECOGNITION
var speech = {
  // Recognized colors
  colors : ["red", "green", "blue", "cyan", "magenta", "purple", "yellow", "orange", "black", "white"],
  start : function () {
  // speech.start() : start speech recognition

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speech.recognition = new SpeechRecognition();
    speech.recognition.continuous = false;
    speech.recognition.interimResults = false;
    speech.recognition.lang = "en-US";
    speech.recognition.onerror = function (evt) {
      console.log(evt);
    };
    speech.recognition.onresult = function (evt) {
      // CHANGE BACKGROUND COLOR
      var color = evt.results[0][0].transcript;
      if (speech.colors.includes(color)) {
        document.getElementById("color-back").style.backgroundColor = color;
      } 
      // NOT RECOGNIZED
      else {
        alert(color + " not recognized - Please try again");
      }
      speech.stop();
    };
    speech.recognition.start();
    document.getElementById('voice-on').disabled = true;
    document.getElementById('voice-off').disabled = false;
  },

  stop : function () {
  // speech.stop() : end speech recognition

    if (speech.recognition != null) {
      speech.recognition.stop();
      speech.recognition = null;
      document.getElementById('voice-on').disabled = false;
      document.getElementById('voice-off').disabled = true;
    }
  }
};

// INIT CHECKS
window.addEventListener("load", function () {
  if (window.hasOwnProperty('SpeechRecognition') || window.hasOwnProperty('webkitSpeechRecognition')) {
    navigator.permissions.query({name: 'microphone'}).then(function (result) {
      if (result.state == 'denied') {
        document.getElementById("voice-cmd").innerHTML = "Please manually enable access to microphone";
      } else {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          document.getElementById('voice-on').disabled = false;
        })
        .catch(function(err) {
          document.getElementById("voice-cmd").innerHTML = "Please enable access and attach a microphone";
        });
      }
    });
  } else {
    document.getElementById("voice-cmd").innerHTML = "Speech Recognition not supported on your browser";
  }
});