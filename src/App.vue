<script setup>
import { onMounted, ref } from "vue";
import EditBook from "./EditBook.vue";
import Book from "./Book.vue";
import TheGitLogo from "./TheGitLogo.vue";
import TheBlankList from "./TheBlankList.vue";
import TheAddBookForm from "./TheAddBookForm.vue";

const API_URL = `${import.meta.env.VITE_API_URL}/books`;

const books = ref([]);

const title = ref("");
const author = ref("");
const errorMsg = ref("");

const editingId = ref(null);
const editingTitle = ref("");
const editingAuthor = ref("");

const fetchBooks = async () => {
  // reset
  errorMsg.value = "";
  editingId.value = null;
  title.value = "";
  author.value = "";

  try {
    const res = await fetch(API_URL);
    books.value = await res.json();
  } catch (error) {
    errorMsg.value = "There is a network or server error.";
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
      await fetchBooks();
    } else if (res.status === 409 || res.status === 400 || res.status === 500) {
      const data = await res.json();
      console.log(data);
      errorMsg.value = data.error;
    }
  } catch (error) {
    showNetworkError({ error, action: "add" });
  }
};

const deleteBookHandler = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/${bookId}`, { method: "DELETE" });

    if (res.ok) {
      await fetchBooks();
    }
  } catch (error) {
    showNetworkError({ error, action: "delete" });
  }
};

const editBookHandler = async ({ id, title, author }) => {
  editingId.value = id;
  editingTitle.value = title;
  editingAuthor.value = author;
};

const saveEditingHandler = async ({ title, author }) => {
  try {
    const res = await fetch(`${API_URL}/${editingId.value}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        author,
      }),
    });

    if (res.ok) {
      await fetchBooks();
    } else if (res.status === 409 || res.status === 400 || res.status === 500) {
      const data = await res.json();
      errorMsg.value = data.error;
    }
  } catch (error) {
    showNetworkError({ error, action: "edit" });
  }
};

const showNetworkError = ({ error, action }) => {
  errorMsg.value = `We could not ${action} this book at this time. Please try again later.`;
  console.error("Network or server error:", error);
};

const cancelEditingHandler = () => {
  editingId.value = null;
  errorMsg.value = "";
};

onMounted(async () => {
  await fetchBooks();
});
</script>

<template>
  <TheGitLogo />
  <div class="m-auto mt-12 w-3xl">
    <h1 class="text-2xl font-medium text-amber-950 font-mono">Add Book:</h1>
    <TheAddBookForm
      v-model:title="title"
      v-model:author="author"
      @submit="addBookHandler"
    />
    <p class="mt-4 font-semibold text-red-400">
      {{ errorMsg }}
    </p>
    <ul
      v-if="books.length"
      class="border-[1px] border-stone-600/10 shadow-lg shadow-stone-900/15 rounded-sm bg-white grid grid-flow-row mt-4"
    >
      <li
        v-for="book in books"
        :key="book.id"
        class="border-b-[1px] border-sky-600/40 px-4 py-2 last:border-none last:pb-5 first:pt-4"
      >
        <EditBook
          v-if="editingId === book.id"
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
    <TheBlankList v-else />
  </div>
</template>

<style scoped></style>
