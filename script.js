const API_KEY = "e6c65d8f3e6140498c3a86e4cd8916c3";

// Theme handling
const body = document.getElementById("body");
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
});

// Set category from quick filter
function setCategory(cat) {
  document.getElementById("category").value = cat;
  fetchNews();
}

// Fetch news from API
async function fetchNews() {
  const query = document.getElementById("query").value;
  const category = document.getElementById("category").value;

  let url = "";

  if (category) {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`;
  } else {
    const q = query || "latest";
    url = `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Display news cards
function displayNews(articles) {
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  if (!articles || articles.length === 0) {
    container.innerHTML = "<p>No news found.</p>";
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-white";

    card.innerHTML = `
      <img src="${article.urlToImage || "https://via.placeholder.com/300"}"
           class="w-full h-40 object-cover rounded mb-2" />
      <h2 class="text-lg font-semibold mb-1">${article.title}</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
        ${article.description || ""}
      </p>
      <a href="${article.url}" target="_blank"
         class="text-blue-600 dark:text-blue-400 text-sm">
        Read more →
      </a>
    `;

    container.appendChild(card);
  });
}
