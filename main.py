import os
import requests
import json
import sys

# Function to fetch a TikTok video and save it as JSON
def fetch_tiktok_video(user, video_id):
    try:
        # Define the TikTok API URL
        url = "https://api.tik.fail/api/grab"
        
        # Set headers to mimic a user agent
        headers = {
            "User-Agent": "MyTikTokBot"
        }
        
        # Define the data to send in the request
        data = {
            "url": "https://www.tiktok.com/@{}/video/{}/".format(user, video_id)
        }
        
        # Send a POST request to fetch the TikTok video
        response = requests.post(url, headers=headers, data=data)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Save the video data as a JSON file
            with open("{}video.json".format(video_id), "wb") as json_file:
                json_file.write(response.content)
                print("Video data saved to '{}video.json'".format(video_id))
        else:
            print("Failed to fetch TikTok video: {}".format(response.status_code))
    except Exception as e:
        print("An error occurred:", str(e))

# Function to process the JSON data and create a new JSON file
def webReady(user, video_id):
    try:
        # Load the input JSON file created by fetch_tiktok_video
        with open("{}video.json".format(video_id), 'r') as input_file:
            data = json.load(input_file)

        # Initialize a list to store video data
        video_data = []

        # Access the relevant information from the updated JSON structure
        video_entry = {
            "VideoDirectURL": data.get("data", {}).get("archive", {}).get("video", ""),
            "VideoDescription": data.get("data", {}).get("metadata", {}).get("VideoDescription", ""),
            "stats": {
                "plays": data.get("data", {}).get("stats", {}).get("plays", 0)
            }
        }

        # Append the formatted data to the video_data list
        video_data.append(video_entry)

        # Load existing data from videos2.json (if it exists)
        existing_data = []
        try:
            with open("videos2.json", 'r') as existing_file:
                existing_data = json.load(existing_file)
        except FileNotFoundError:
            pass

        # Extend the existing data with the new video data
        existing_data.extend(video_data)

        # Write the extended data to videos2.json
        with open("videos2.json", 'w') as output_file:
            json.dump(existing_data, output_file, indent=4)

        print("Data appended to videos2.json")
    except Exception as e:
        print("An error occurred:", str(e))

# Check for the correct number of command-line arguments
if len(sys.argv) != 3:
    print("Usage: python main.py <user> <video_id>")
    sys.exit(1)

# Retrieve user and video_id from command-line arguments
user = sys.argv[1]
video_id = sys.argv[2]

# Call the fetch_tiktok_video function to fetch the TikTok video
fetch_tiktok_video(user, video_id)

# Call the webReady function to process and append the data
webReady(user, video_id)
