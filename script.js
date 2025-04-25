console.log("script loaded");

const backendURL = "https://sluether-tool-github-io.onrender.com";

document.getElementById("osintForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const username = document.getElementById("input").value.trim();
  const resultsDiv = document.getElementById("result"); // Make sure this ID matches HTML

  if (!username) {
    resultsDiv.textContent = "Please enter a username or email.";
    return;
  }

  resultsDiv.textContent = "Running analysis... please wait.";

  try {
    const response = await fetch(`${backendURL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: username })
    });

    if (!response.ok) throw new Error("Server returned an error");

    const data = await response.json();
    resultsDiv.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultsDiv.textContent = `Error: ${error.message}`;
  }
});


// Call this function with your JSON response
function displayResults(data) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  const createSection = (title, content) => {
    const details = document.createElement("details");
    details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = title;

    const pre = document.createElement("pre");
    pre.textContent = typeof content === "string" ? content : JSON.stringify(content, null, 2);

    details.appendChild(summary);
    details.appendChild(pre);
    container.appendChild(details);
  };

  createSection("Holehe", data.holehe);
  createSection("Maigret", data.maigret);
}

  .then(res => res.json())
  .then(data => displayResults(data))
  .catch(err => console.error("API Error:", err));

