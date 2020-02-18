const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");

//instantiate
const app = express();

//connect to db
connectDB();

//body-parser
app.use(express.json({ extended: false }));

//routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
