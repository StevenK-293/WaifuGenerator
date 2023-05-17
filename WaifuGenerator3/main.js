// Get DOM elements
const randomImage = document.querySelector(".random-image");
const randomWaifu = document.querySelector(".random-waifu");
const randomWaifuNsfw = document.querySelector(".random-waifu-nsfw");
const formSelect = document.querySelector(".form-select");
const formSelectNsfw = document.querySelector(".form-select-nsfw");
const nsfwToggle = document.querySelector("#nsfwToggle");
const imageWrapper = document.querySelector('.image-wrapper');

// Set initial display state
document.querySelector(".sfw").classList.add("active");
document.querySelector(".nsfw").classList.remove("active");

// Add event listeners
formSelect.addEventListener('change', generateWaifu);
formSelectNsfw.addEventListener('change', generateWaifu);

let checkboxNsfw = document.querySelector('input[type=checkbox]');

nsfwToggle.addEventListener('change', () => {
  if (checkboxNsfw.checked) {
    document.querySelector(".nsfw").classList.add("active");
    document.querySelector(".sfw").classList.remove("active");
    generateWaifu();
  } else {
    document.querySelector(".sfw").classList.add("active");
    document.querySelector(".nsfw").classList.remove("active");
    generateWaifu();
  }
});

randomWaifu.addEventListener("click", generateWaifu);
randomWaifuNsfw.addEventListener("click", generateWaifu);

// Set loading image
const loading = './load.png';
randomImage.src = loading;

// Generate waifu function
async function generateWaifu() {
  randomImage.src = loading;
  if (document.querySelector(".sfw").classList.contains("active")) {
    await fetchWaifu('sfw', formSelect.value);
  } else if (document.querySelector(".nsfw").classList.contains("active")) {
    await fetchWaifu('nsfw', formSelectNsfw.value);
  }
}

// Fetch waifu function
async function fetchWaifu(type, category) {
  await fetch(`https://api.waifu.pics/${type}/${category}`)
    .then(response => response.json())
    .then(data => {
      randomImage.src = data.url;
    });
}

generateWaifu();
