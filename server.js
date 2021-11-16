const express = require('express');
const mongosse = require("mongoose")


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongosse.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

// use this to log mongo queries being executed!
mongosse.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
