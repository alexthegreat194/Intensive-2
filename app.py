from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient




app = Flask(__name__, static_url_path = "/static")
# from pymongo import MongoClient
# The Following code ia my own 
uri = "mongodb+srv://FMuser:KoolWordz@cluster0.ykezvyd.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient('localhost', 27017)
db = client.flask_db
todos = db.todos

@app.route('/')
def video():
    return render_template('video_sub.html')

@app.route('/submitVideo', methods=["POST"])
def submitVideo():
    videoURL = request.form.get("videoURL")

    # Save the video URL to MongoDB
    todos.insert_one({'videoURL': videoURL})

    # Retrieve the updated list of videos from the database
    video_list = todos.find()

    print("Video List:", list(video_list))
    
    return render_template('video_sub.html', videos=video_list)

def get_youtube_id(url):
    # this is pulling the video ID for it to get embeded
    video_id = url.split('v=')[-1]
    ampersand_pos = video_id.find('&')
    if ampersand_pos != -1:
        video_id = video_id[:ampersand_pos]
    return video_id


if __name__ == '__main__':
    app.run(debug=True, port=5003)