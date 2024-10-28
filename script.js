let videoName = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let resultContainer = document.querySelector(".results-container");
let errorDiv = document.querySelector(".error-message")
let apiKey = "cc7d974197msh9b3524f24202bc6p17a9b0jsn9380c02cd31e"


form.addEventListener("submit", async event => {

    event.preventDefault();

    let video = videoName.value
  
        if(video) {

            try {
                
                let videoData = await getVideoData(video);
                displayVideoInfo(videoData);

            } catch (error) {
               
              console.error(error);
              displayError(`${ video } could not be found`)
              
              
                
            }



        } else{

            displayError("No results found. Please try a different search term.")

        }
    

})


async function getVideoData(video) {

    let apiUrl = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${video}`;

  let response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`${video} not found`);
  }

  return response.json();


}





function displayVideoInfo(data) {

  resultContainer.innerHTML = " ";

    if( data.videos && data.videos.length > 0) {


      data.videos.forEach(video => {


        let videoCard = document.createElement("div");
        videoCard.classList.add("video-card");

        let videoThumbnail = document.createElement("img");
        videoThumbnail.src = video.thumbnail;
        videoThumbnail.classList.add("video-thumbnail");
        videoCard.appendChild(videoThumbnail);

        let videoInfo = document.createElement("div");
        videoInfo.classList.add("video-info");
        videoCard.appendChild(videoInfo);

        let videoTitle = document.createElement("p");
        videoTitle.textContent = video.title;
        videoTitle.classList.add("video-title")
        videoCard.appendChild(videoTitle)

        // let videoDescription = document.createElement("p");
        // videoDescription.textContent = video.description;
        // videoDescription.classList.add("video-description");
        // videoCard.appendChild(videoDescription)


          resultContainer.appendChild(videoCard)
          resultContainer.style.display = "block"
        console.log(data);
        

      })


    }

      else {

        displayError("data not found")
      }
 
}

function displayError( message ) {

    errorDiv.textContent = "";

    let errormessage = document.createElement("p")
    errormessage.textContent = message;
  


   
    errorDiv.append(errormessage);
    errorDiv.style.display = "block";
   

}




 
