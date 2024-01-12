from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS


comments = None



app = Flask(__name__, static_url_path = "/static", static_folder='static')
CORS(app)
# from pymongo import MongoClient
# The Following code ia my own 
uri = "mongodb+srv://FMuser:KoolWordz@cluster0.ykezvyd.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient('localhost', 27017)
db = client.flask_db
videoIds = db.videoIds
comments = db.comments



@app.route('/', methods=["POST", "GET"])
def video():
    if request.method == "POST":
        print("POST")
        videoURL = request.form.get("videoURL")
        videoId = videoURL[videoURL.find('v=') + 2:len(videoURL)] # videoId = videoURL[28: 39] -> videoId = "KL4--AJrJHQ"

        # Save the video URL to MongoDB
        videoIds.insert_one({'videoId': videoId})

    # Retrieve the updated list of videos from the database
        video_ids_list = videoIds.find()
        video_ids_list = list(video_ids_list)
        print("Video Ids List:", list(video_ids_list))
        return render_template('video_sub.html', videoIds=video_ids_list) 
    else:
        return render_template('video_sub.html')

def get_youtube_id(url):
    # this is pulling the video ID for it to get embeded
    video_id = url.split('v=')[-1]
    ampersand_pos = video_id.find('&')
    if ampersand_pos != -1:
        video_id = video_id[:ampersand_pos]
    return video_id

@app.route('/add_comment', methods=['GET', 'POST'])
def add_comment():
    data = request.get_json()

    if 'video_id' not in data or 'comment_text' not in data:
        return jsonify({'error': 'Invalid request'}), 400

    video_id = data['video_id']
    comment_text = data['comment_text']

    # For a more robust solution, you'd likely store comments in a database.
    videoIds.update_one({'videoId': video_id}, {'$push': {'comments': {'text': comment_text}}})

    return jsonify({'success': True})

@app.route('/comments', methods=['POST'])
def get_comments():
    video_id = request.form.get('video_id')

    # Fetch comments for the given video_id from MongoDB
    video_comments = videoIds.find_one({'videoId': video_id}, {'comments': 1})

    # Create a list of comment texts
    comment_texts = [comment['text'] for comment in video_comments.get('comments', [])]

    # Return a JSON response
    return jsonify({'comments': comment_texts})

if __name__ == '__main__':
    app.run(debug=True, port=5003)