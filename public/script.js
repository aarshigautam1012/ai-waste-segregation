function analyzeWaste() {
  const fileInput = document.getElementById("imageInput");
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  // Clear old result
  result.innerHTML = "";

  if (!fileInput.files.length) {
    status.innerText = "⚠ Please upload an image first.";
    return;
  }

  status.innerText = "🔍 Analyzing image...";

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const imageBase64 = reader.result.split(",")[1];

    fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: imageBase64,
        fileName: file.name
      })
    })
      .then(response => response.json())
      .then(data => {
        status.innerText = "✅ Analysis Complete";

        result.innerHTML = `
          <strong>🗑 Waste Type:</strong> ${data.wasteType}<br>
          <strong>♻ Disposal Bin:</strong> ${data.binType}
        `;
      })
      .catch(error => {
        console.error(error);
        status.innerText = "❌ Error analyzing image";
      });
  };

  reader.readAsDataURL(file);
}


