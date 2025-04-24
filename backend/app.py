from flask import Flask, request, jsonify
import subprocess
import uuid
import os
import json
from flask_cors import CORS

if not os.path.exists("social-analyzer"):
    subprocess.run(["git", "clone", "https://github.com/qeeqbox/social-analyzer.git"])

app = Flask(__name__)

CORS(app, resources={r"/run": {"origins": "https://sluether-tool.github.io"}})

port = int(os.environ.get("PORT", 5000))

# This endpoint will be called from the frontend (GitHub Pages)
@app.route('/run', methods=['POST'])
def run_tools():
    print("received post /run")
    data = request.json
    print("input from frontend:", data)
    user_input = data.get("input")
    task_id = str(uuid.uuid4())
    results_dir = f"/tmp/osint_{task_id}"
    os.makedirs(results_dir, exist_ok=True)

    # Run Holehe
    holehe_out = subprocess.run(["holehe", user_input], capture_output=True, text=True).stdout

    # Run Maigret
    maigret_path = os.path.join(results_dir, f"report_{user_input}_simple.json")
    subprocess.run(["maigret", user_input, "--json", "simple", "--retries", "2", "-fo", os.path.dirname(maigret_path)])
    with open(maigret_path) as f:
        maigret_data = json.load(f)

    # Run Social Analyzer
    analyzer_path = os.path.join(results_dir, "social_analyzer.json")
   

   subprocess.run(["node", "social-analyzer/app.js", "-f", user_input, "-o", analyzer_path, "--json"])


   with open(analyzer_path) as f:
        analyzer_data = json.load(f)

    # Return the results to the frontend (GitHub Pages)
    return jsonify({
        "holehe": holehe_out,
        "maigret": maigret_data,
        "social_analyzer": analyzer_data
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port, debug=True)



