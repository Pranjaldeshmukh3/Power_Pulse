// Dropdown Menu Logic
let select = document.querySelector(".select-heading");
let arrow = document.querySelector(".select-heading img");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");
let selecttext = document.querySelector(".select-heading span");

select.addEventListener("click", () => {
  options.classList.toggle("active-options");
  arrow.classList.toggle("rotate");
});

option.forEach((item) => {
  item.addEventListener("click", () => {
    selecttext.innerText = item.innerText;
  });
});

// Chatbot Logic
let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let chatContainer = document.querySelector(".chat-container");
let h1 = document.querySelector(".h1");
let chatimg = document.querySelector("#chatbotimg");
let chatbox = document.querySelector(".chat-box");

let userMessage="";
chatimg.addEventListener("click", ()=> {
chatbox.classList.toggle("active-chat-box")
})
1

let API_KEY = "AIzaSyAxul10EcX165otYQDzB6JdJkKKTeegjyA";  // 🔁 Replace with your real Gemini API key
let API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function generateApiResponse(aiChatBox, userMessage) {
  const textElement = aiChatBox.querySelector(".text");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          top_p: 0.95,
          max_output_tokens: 500,
        },
      }),
    });

    const data = await response.json();
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    textElement.innerText = apiResponse || "❌ No response from API.";
  } catch (error) {
    textElement.innerText = "⚠️ Failed to fetch response.";
    console.error("API Error:", error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}

function showLoading(userMessage) {
  const html = `
    <p class="text"></p>
    <img src="Build AI powered fitness website/loading.gif" class="loading" width="40px">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  generateApiResponse(aiChatBox, userMessage);
}

chatbtn.addEventListener("click", () => {
  h1.style.display="none"
  let userMessage = prompt.value.trim();
  if (!userMessage) return;

  const html = `<p class="text"></p>`;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(() => showLoading(userMessage), 500);
});

let ai=document.querySelector(".virtual-assistant img")
let speakpage=document.querySelector(".speak-page")
let content=document.querySelector(".speak-page h1")


function speak(text) {
let text_speak=new SpeechSynthesisUtterance(text)
text_speak.rate=1.2
text_speak.pitch=1
text_speak.volume=1
text_speak.lang="hi-GB"
window.speechSynthesis.speak (text_speak)
}

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(event)=>{
  speakpage.style.display="none"
let currentIndex=event.resultIndex
let transcript=event.results [currentIndex] [0].transcript
content.innerText=transcript
takeCommand(transcript.toLowerCase())
recognition.start()
}



function takeCommand(message) {
  // Clean up
  message = message.replace(/[.,!?]/g, "").trim();

  if (message.includes("open") && message.includes("chat")) {
    speak("Okay, opening chat.");
    chatbox.classList.add("active-chat-box");
  } else if (message.includes("close") && message.includes("chat")) {
    speak("Okay, closing chat.");
    chatbox.classList.remove("active-chat-box");
  } else if (message.includes("back")) {
    speak("Okay, opening back workout page.");
    window.location.href = "back.html"; // ✅ opens in same tab
  } else if (message.includes("all workout")) {
    speak("Okay, opening all workouts.");
    window.location.href = "workout.html";
  } else if (message.includes("chest")) {
    speak("Okay, opening chest workout.");
    window.location.href = "chest.html";
  } else if (message.includes("biceps") || message.includes("triceps")) {
    speak("Okay, opening biceps and triceps workout.");
    window.location.href = "biceps-triceps.html";
  } else if (message.includes("shoulder")) {
    speak("Okay, opening shoulder workout.");
    window.location.href = "shoulder.html";
  } else if (message.includes("leg")) {
    speak("Okay, opening leg workout.");
    window.location.href = "leg.html";
  } else if (message.includes("home")) {
    speak("Okay, going home.");
    window.location.href = "index.html";
  }else if(message.includes("hello") || message.includes ("hey")) {
speak("hello , what can i help you?")
}
else if (message.includes("who are you")) {
speak("i am virtual assistant, created by Ayush Sir")
}else if(message.includes ("open youtube")) {
speak("opening youtube...")
window.open("https://youtube.com/","_blank")
}
else if (message.includes ("open google")){
speak("opening google...")
window.open("https://google.com/","_blank")
}
else if (message.includes ("open facebook")) {
speak("opening facebook...")
window.open("https://facebook.com/","_blank")
}
else if (message.includes ("open instagram")) {
speak("opening instagram...")
window.open("https://instagram.com/","_blank")
}
else if (message.includes ("open calculator")){
speak("opening calculator..")
window.open("calculator://")
}
else if(message.includes ("open whatsapp")) {
speak("opening whatsapp..")
window.open("whatsapp://")
}
else if (message.includes("time")) {
    // ✅ Get current time in HH:MM format
    let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    speak(`The time is ${time}`);
} 
else if (message.includes("date")) {
    // ✅ Get current date in "17 Jul 2025" format
    let date = new Date().toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
    speak(`Today is ${date}`);
} 
else {
    let query = message.replace(/shipra|shifra/gi, "").trim();
    let finalText = `This is what I found on the internet regarding ${query}`;

    // ⚡ Speak and open link almost simultaneously
    speak(finalText);
    setTimeout(() => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }, 100); // small delay so speech starts first
}


}


ai.addEventListener("click", ()=>{
  recognition.start()
speakpage.style.display="flex";
})

