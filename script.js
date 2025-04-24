document.getElementById('osintForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const input = document.getElementById('input').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Running lookup...";

  try {
    const res = await fetch('https://your-backend-url.com/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    resultDiv.innerHTML = `
      <h3>Holehe:</h3><pre>${data.holehe}</pre>
      <h3>Maigret:</h3><pre>${JSON.stringify(data.maigret, null, 2)}</pre>
      <h3>Social Analyzer:</h3><pre>${JSON.stringify(data.social_analyzer, null, 2)}</pre>
    `;
  } catch (err) {
    resultDiv.innerHTML = "Error: " + err.message;
  }
});

