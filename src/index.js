import express, { text } from 'express'
import path, { join } from 'path'
import { fileURLToPath } from 'url'

const app = express();
const PORT = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    },
    {
        text: "No database yet",
        user: "Diego",
        added: new Date()
    }
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("pages/index", { title: "Message Board", h1: "Message Board", messages: messages });
})

app.get("/new", (req, res) => {
    res.render("pages/form", { title: "Form Message" });
})

app.post("/new", (req, res) => {
    const {username, messageText} = req.body;
    messages.push({text: messageText, user: username, added: new Date()});

    res.redirect("/");
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));