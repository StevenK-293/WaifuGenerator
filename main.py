import requests
import os
import random 

# Specify the genre for the waifu image
genres = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe']
genre = genres[random.randint(0, len(genres)-1)]

# Specify if the waifu image should be NSFW or SFW
nsfw = False

# Call the Waifu API
if nsfw:
    endpoint = 'https://api.waifu.pics/nsfw/waifu'
else:
    endpoint = 'https://api.waifu.pics/sfw/waifu'

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
    if not os.path.exists("images"):
        os.makedirs("images")
    with open(f'images/{genre}.jpg', 'wb') as f:
        f.write(response.content)
        print(f"{genre} image downloaded successfully!")
else:
    print("Error downloading waifu image")
