
function getYouTubeId(url) {
    var videoId = url.split('v=')[-1];
    var ampersandPos = videoId.indexOf('&');
    if (ampersandPos !== -1) {
        videoId = videoId.substring(0, ampersandPos);
    }
    console.log(videoId);
    return videoId;
}

function embedYouTubeVideo(videoUrl) {
    console.log('Embedding YouTube video:', videoUrl);

    var videoId = getYouTubeId(videoUrl);

    // Construct the YouTube embed URL
    var embedUrl = 'https://www.youtube.com/embed/' + videoId;

    // Create an iframe element
    var iframe = document.createElement('iframe');

    // Set the iframe attributes
    iframe.setAttribute('width', '550');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');

    // Get the container element where the embedded video will be displayed
    var videoContainer = document.getElementById('videoContainer');

    // Clear any previous content in the container
    videoContainer.innerHTML = '';

    // Append the iframe to the container
    videoContainer.appendChild(iframe);
}

// Function to be called when the "Submit" button is clicked
function submitVideo() {
    console.log('Submit video button clicked');
    var videoUrl = document.getElementById("videoURL").value;
    console.log('Video URL:', videoUrl);
    embedYouTubeVideo(videoUrl);
}

// Function to fetch and update comments for a video
function fetchComments(videoId) {
    fetch('/comments?video_id=' + videoId)
        .then(response => response.json())
        .then(data => {
            // Update the comment list on the webpage
            var commentList = document.getElementById("commentList_" + videoId);
            commentList.innerHTML = "";

            data.comments.forEach(comment => {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(comment.text));
                commentList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to add a comment for a video
function addComment(videoId) {
    var commentText = document.getElementById("commentText_" + videoId).value;

    fetch('/add_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            video_id: videoId,
            comment_text: commentText,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Refresh the comment list after a successful comment submission
            fetchComments();
        } else {
            console.error('Error adding comment:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




// cannot post video because I keep getting "submit_video" error, check html code and js code to make sure the word submitVideo is connected between the two
// then look into the python code and make sure it matches up with the HTML BUT NOT THE JS CODE  and keep trouble shooting until video displays
// also look into making a list of the "previous videos" underneath the video already shown