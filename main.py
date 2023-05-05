import requests

genre = 'waifu'
nsfw = False # False or True if you want NSFW

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
