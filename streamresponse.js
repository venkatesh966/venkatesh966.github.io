const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "dummy";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

let controller = null;

const generate = async () => {
  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }

  generateBtn.disabled = true;
  resultText.innerText = "Generating...";

  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
        max_tokens: 100,
        stream: true,
      }),
      signal,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    resultText.innerText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim())
        .filter((line) => line !== "" && line !== "[DONE]")
        .map((line) => JSON.parse(line));

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;

        if (content) resultText.innerText += content;
      }
    }
  } catch (error) {
    if (signal.aborted) resultText.innerText = "Request aborted.";
    else {
      console.error("Error:", error);
      resultText.innerText = "Error occurred while generating.";
    }
  } finally {
    generateBtn.disabled = false;
    
  }
};


promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") generate();
});

generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);
