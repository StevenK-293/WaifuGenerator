import requests

genres = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke']

nsfw = False # True or False if you want NSFW

# Choose a random genre from the list
genre = genres[random.randint(0, len(genres)-1)]

# Construct the API endpoint URL based on the specified genre and NSFW level
if nsfw:
    endpoint = f'https://api.waifu.pics/nsfw/{genre}'
else:
    endpoint = f'https://api.waifu.pics/sfw/{genre}'

# Make a GET request to the API endpoint to retrieve a random waifu image URL
response = requests.get(endpoint)
if response.status_code == 200:
    data = response.json()
    waifu_url = data['url']
    print(f"Generated {genre} image URL: {waifu_url}")
else:
    print("Error retrieving waifu image URL")

# Download the waifu image
response = requests.get(waifu_url)
if response.status_code == 200:
    with open(f'{genre}.jpg', 'wb') as f:
        f.write(response.content)
        print(f"{genre} image downloaded successfully!")
else:
    print("Error downloading waifu image")
