const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/analyze", (req, res) => {
  const { fileName } = req.body;

  let wasteType = "Unknown Waste";
  let binType = "Manual Segregation Required";

  if (fileName) {
    const name = fileName.toLowerCase();
    if (name.includes("plastic")) {
      wasteType = "Plastic Waste";
      binType = "Dry / Recyclable Bin";
    } else if (name.includes("banana") || name.includes("food")) {
      wasteType = "Organic Waste";
      binType = "Wet Bin";
    } else if (name.includes("paper")) {
      wasteType = "Paper Waste";
      binType = "Dry / Recyclable Bin";
    } else if (name.includes("metal") || name.includes("can")) {
      wasteType = "Metal Waste";
      binType = "Recyclable Bin";
    } else if (name.includes("battery") || name.includes("charger")) {
      wasteType = "E-Waste";
      binType = "Authorized E-Waste Center";
    }
  }

  res.json({ wasteType, binType });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
