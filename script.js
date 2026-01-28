document.getElementById("analyzeBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "❌ Please select an image first";
    return;
  }

  const fileName = fileInput.files[0].name.toLowerCase();

  let wasteType = "Unknown Waste";
  let binType = "Manual segregation required";

  if (fileName.includes("banana") || fileName.includes("food")) {
    wasteType = "Organic Waste";
    binType = "Green Bin";
  } else if (fileName.includes("paper") || fileName.includes("newspaper")) {
    wasteType = "Paper Waste";
    binType = "Blue Bin";
  } else if (fileName.includes("plastic") || fileName.includes("bottle")) {
    wasteType = "Plastic Waste";
    binType = "Red Bin";
  } else if (fileName.includes("metal") || fileName.includes("can")) {
    wasteType = "Metal Waste";
    binType = "Yellow Bin";
  } else if (fileName.includes("Electronics") || fileName.includes("charger")) {
    wasteType = "E-Waste";
    binType = "Authorized E-Waste Center";
  }

  resultDiv.innerHTML = `
    ✅ <b>Waste Type:</b> ${wasteType}<br>
    🗑️ <b>Dispose In:</b> ${binType}
  `;
});
