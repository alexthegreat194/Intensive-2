// script.js

// Function to extract YouTube video ID from URL
function getYouTubeId(url) {
    var videoId = url.split('v=')[-1];
    var ampersandPos = videoId.indexOf('&');
    if (ampersandPos !== -1) {
        videoId = videoId.substring(0, ampersandPos);
    }
    return videoId;
}

function embedYouTubeVideo(videoUrl) {

    var videoId = getYouTubeId(videoUrl);

    // Construct the YouTube embed URL
    var embedUrl = 'https://www.youtube.com/embed/' + videoId;

    // Create an iframe element
    var iframe = document.createElement('iframe');

    // Set the iframe attributes
    iframe.setAttribute('width', '560');
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

    var videoUrl = document.getElementById("videoURL").value;

    embedYouTubeVideo(videoUrl);
}



// cannot post video because I keep getting "submit_video" error, check html code and js code to make sure the word submitVideo is connected between the two
// then look into the python code and make sure it matches up with the HTML BUT NOT THE JS CODE  and keep trouble shooting until video displays
// also look into making a list of the "previous videos" underneath the video already shown