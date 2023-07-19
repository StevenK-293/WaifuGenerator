const apiUrl = 'https://api.waifu.im/search';
const tags = {
  sfw: ['waifu', 'maid', 'marin-kitagawa', 'mori-calliope', 'raiden-shogun', 'oppai', 'selfies', 'uniform'],
  nsfw: ['ero', 'ass', 'hentai', 'milf', 'oral', 'paizuri', 'ecchi']
};

async function fetchTags() {
  try {
    const response = await fetch('https://api.waifu.im/tags');
    if (!response.ok) {
      throw new Error('Tags request failed with status code: ' + response.status);
    }
    const tagsData = await response.json();
    const apiTags = tagsData.tags;

    const tagDropdown = document.getElementById('tag-dropdown');
    const modeDropdown = document.getElementById('mode-dropdown');
    const fragment = document.createDocumentFragment();

    const selectedTags = tags[modeDropdown.value];

    for (const tag of selectedTags) {
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      fragment.appendChild(option);
    }

    tagDropdown.appendChild(fragment);
    tagDropdown.addEventListener('change', fetchImageByTag);
    modeDropdown.addEventListener('change', updateTagsDropdown);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

async function fetchImageByTag() {
  try {
    const selectedTag = document.getElementById('tag-dropdown').value;
    const apiUrlWithParams = `${apiUrl}?included_tags=${selectedTag}`;
    const response = await fetch(apiUrlWithParams);

    if (!response.ok) {
      throw new Error('Image request failed with status code: ' + response.status);
    }

    const imageData = await response.json();
    const image = imageData.images[0]; // Assuming there is only one image in the response

    const resultDiv = document.getElementById('result');
    const imageElement = resultDiv.querySelector('img');
    const sourceLink = resultDiv.querySelector('a');
    const tagsContainer = resultDiv.querySelector('.tags-container');

    imageElement.src = image.url;
    sourceLink.href = image.source;

    while (tagsContainer.firstChild) {
      tagsContainer.removeChild(tagsContainer.firstChild);
    }

    for (const tag of image.tags) {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.textContent = tag.name;
      tagsContainer.appendChild(tagElement);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function updateTagsDropdown() {
  const tagDropdown = document.getElementById('tag-dropdown');
  const modeDropdown = document.getElementById('mode-dropdown');
  const selectedTags = tags[modeDropdown.value];

  // Clear existing options
  while (tagDropdown.firstChild) {
    tagDropdown.removeChild(tagDropdown.firstChild);
  }

  // Create and append options for selected tags
  const fragment = document.createDocumentFragment();

  for (const tag of selectedTags) {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    fragment.appendChild(option);
  }

  tagDropdown.appendChild(fragment);
  fetchImageByTag();
}

fetchTags();
fetchImageByTag();

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', fetchImageByTag);
