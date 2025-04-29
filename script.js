const backendURL = "https://sluether-tool-github-io.onrender.com";

document.getElementById("osintform").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  const username = document.getElementById("input").value.trim();
  const resultsDiv = document.getElementById("results-container");
  const resultsContainer = document.getElementById("results-container");

  if (!username) {
    resultsDiv.textContent = "Please enter a username or email.";
    return;
  }

  resultsDiv.textContent = "Running analysis... please wait...";
  resultsContainer.innerHTML = ""; // Clear previous results

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
    
    // Optional: hide or clear the "Running..." message
    resultsDiv.textContent = "";

    displayResults(data);
  } catch (error) {
    resultsDiv.textContent = `Error: ${error.message}`;
  }
});

function displayResults(data) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  const createSection = (title, content) => {
        const details = document.createElement("details");
        details.open = false;

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

