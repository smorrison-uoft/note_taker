const express = require("express");
const apiroutes = require ("./routes/api-routes");
const htmlRoutes = require ("./routes/html-routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/api", apiroutes)

require ("./routes/html-routes")(app)


// listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));