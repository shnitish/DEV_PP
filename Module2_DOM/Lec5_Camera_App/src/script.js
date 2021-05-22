let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let captureButton = document.querySelector("#capture-photo");
let recordingState = false;
let constraints = {video: true};
let recordedData;
let mediaRecorder;

(async function()
{

        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoPlayer.srcObject = mediaStream;

        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.onstart = function(e)
        {
            console.log("Inside on start");
        }
        mediaRecorder.onstop = function(e)
        {
            console.log("Inside on stop");
        }

        mediaRecorder.ondataavailable = function(e)
        {
            console.log("Inside on data available");
            recordedData = e.data;
            downloadVideo();
        }

        // record button click event
        recordButton.addEventListener("click", function()
        {
            if(recordingState)
            {
                // stop recording
                mediaRecorder.stop();
                recordButton.querySelector("div").classList.remove("record-animate");
            }

            else
            {
                // start recording
                mediaRecorder.start();
                recordButton.querySelector("div").classList.add("record-animate");
            }
            recordingState = !recordingState;
        });

        // capture button event
        captureButton.addEventListener("click", saveCapture);
})();

// download video
function downloadVideo()
{
    // create URL from BLOB raw data
    console.log("Saving video");
    let videoURL = URL.createObjectURL(recordedData);

    let aTag = document.createElement("a");
    aTag.download = "video.mp4";
    aTag.href = videoURL;
    aTag.click();
}

// capture photos
function saveCapture()
{
    console.log("Saving Photo")
    captureButton.querySelector("div").classList.add("capture-animate");

    setTimeout(function(){
        captureButton.querySelector("div").classList.remove("capture-animate");
    }, 1000);
    
    let canvas = document.createElement("canvas");    
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0);
    let imageURL = canvas.toDataURL("image/jpg");

    let aTag = document.createElement("a");
    aTag.download = "image.jpg";
    aTag.href = imageURL;
    aTag.click();
}