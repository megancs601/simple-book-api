<script setup>
import { onMounted, ref } from "vue";
import EditBook from "./EditBook.vue";
import Book from "./Book.vue";

const API_URL = "http://localhost:3000/books";
const books = ref([]);

const title = ref("");
const author = ref("");
const error = ref("");

const editingId = ref(null);
const editingTitle = ref("");
const editingAuthor = ref("");

const fetchBooks = async () => {
  // reset error message
  error.value = "";

  try {
    const res = await fetch(API_URL);
    books.value = await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const addBookHandler = async () => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        author: author.value,
      }),
    });

    if (res.ok) {
      title.value = "";
      author.value = "";

      fetchBooks();
    } else if (res.status === 409 || res.status === 400) {
      const data = await res.json();
      error.value = data.error;
    }
  } catch (error) {
    error.value =
      "We could not add this book at this time. Please try again later.";
    console.error("❌ Network or server error:", error);
  }
};

const deleteBookHandler = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/${bookId}`, { method: "DELETE" });

    if (res.ok) {
      fetchBooks();
    }
  } catch (error) {
    error.value =
      "We could not remove this book at this time. Please try again later.";
    console.error("❌ Network or server error:", error);
  }
  console.log("delete ", bookId);
};

const editBookHandler = async ({ id, title, author }) => {
  editingId.value = id;
  editingTitle.value = title;
  editingAuthor.value = author;
};

const saveEditingHandler = () => {
  console.log("save called");
  editingId.value = null;
};

const cancelEditingHandler = () => {
  editingId.value = null;
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="m-4">
    <form @submit.prevent="addBookHandler">
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        v-model="title"
        class="border-1 rounded-sm border-slate-400 ml-2"
      />
      <label for="author">Author:</label>
      <input
        type="text"
        id="author"
        v-model="author"
        class="border-1 rounded-sm border-slate-400 ml-2"
      />
      <button
        type="submit"
        class="h-full cursor-pointer bg-sky-400 rounded-sm px-4 text-white font-semibold"
      >
        Add Book
      </button>
    </form>
    <p v-if="error != ''" class="mt-4 font-semibold text-red-400">
      {{ error }}
    </p>
    <ul class="list-disc mt-4 pl-4">
      <li v-for="book in books" :key="book.id">
        <EditBook
          v-if="editingId === book.id"
          :id="editingId"
          :title="editingTitle"
          :author="editingAuthor"
          :saveEdit="saveEditingHandler"
          :cancelEdit="cancelEditingHandler"
        />
        <Book
          v-else
          :id="book.id"
          :title="book.title"
          :author="book.author"
          :editHandler="editBookHandler"
          :deleteHandler="deleteBookHandler"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
