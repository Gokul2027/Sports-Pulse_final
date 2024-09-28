const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", (req, res) => {
  const { name, email, event, phonenumber } = req.body;
  const csvLine = `${name},${email},${event},${phonenumber}\n`;

  // Check if CSV exists and add headers if not
  if (!fs.existsSync("registrations.csv")) {
    const headers = "Name,Email,Event,Phone Number\n";
    fs.writeFileSync("registrations.csv", headers);
  }

  // Append registration data to CSV
  fs.appendFile("registrations.csv", csvLine, (err) => {
    if (err) {
      console.error("Error writing to CSV file", err);
      return res.status(500).json({ message: "Registration failed!" });
    }
    console.log(
      `Registered: Name: ${name}, Email: ${email}, Event: ${event}, Phone Number: ${phonenumber}`
    );
    res.json({ message: "Registration successful!" });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
