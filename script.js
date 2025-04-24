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

