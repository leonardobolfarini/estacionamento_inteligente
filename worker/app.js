const express = require("express");
const app = express();

const recommendationRoutes = require("./routes/recommendationRoutes");

app.use(express.json());
app.use(recommendationRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
