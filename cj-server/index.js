const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { port } = require("./config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.info(req.method, req.originalUrl);
    next();
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    const status = (err && err.status) || 500;
    res.status(status).send(err.message);
    return next();
});

app.use(express.static(path.join(__dirname, "build")));

require("./routes")(app);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.info(`Listening on ${port}`));
