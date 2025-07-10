import fs from "fs";
import { promises as fsp } from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import express, { json } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "books.json");

// REST API
const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

let books = [];

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, "utf8");
  try {
    books = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing books.json", error);
  }
}

// let timeout;

// const debounce = (fn, delay = 500) => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     fn();
//   }, delay);
// };

const saveBooks = async () => {
  try {
    await fsp.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving books:", error);
  }
};

app.get("/", (req, res) => {
  res.send("📚 Book API is running. Use /books");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    const error = "Both book title and author are required.";
    return res.status(400).json({ error });
  }

  //check for duplicates first
  const isDuplicate = books.some(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase(),
  );

  if (isDuplicate) {
    return res
      .status(409)
      .json({ error: "This book already exists in the library." });
  }

  const newBook = {
    id: Date.now().toString(),
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
  saveBooks();
  // debounce(saveBooks);
});

// app.put("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, author } = req.body;
//   const index = books.findIndex((book) => id === book.id);
//   if (index === -1) {
//     return res.status(404).json({ error: "Book not found." });
//   }

//   if (title !== undefined) {
//     books[index].title = title;
//   }

//   if (author !== undefined) {
//     books[index].author = author;
//   }

//   res.status(200).json(books[index]);
//   debounce(saveBooks);
// });

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => id === book.id);
  if (index === -1) {
    const error = "Book not found";
    return res.status(404).json({ error });
  }

  books.splice(index, 1);
  res.status(204).end();
  saveBooks();
  //debounce(saveBooks);
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
