const backendURL = "https://sluether-tool-github-io.onrender.com";

document.getElementById("analyze-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!username) {
    resultsDiv.textContent = "Please enter a username or email.";
    return;
  }

  resultsDiv.textContent = "Running analysis... please wait.";

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: username })
    });

    if (!response.ok) throw new Error("Server returned an error");

    const data = await response.json();

    // Format and display results
    resultsDiv.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultsDiv.textContent = `Error: ${error.message}`;
  }
});

