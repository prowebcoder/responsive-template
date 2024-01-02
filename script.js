function uploadImage(imageNumber) {
    const input = document.getElementById(`imageInput${imageNumber}`);
  
    // Ensure a file is selected
    if (!input.files || !input.files[0]) {
      alert(`Please select an image for Image ${imageNumber}.`);
      return;
    }
  
    const file = input.files[0];
    
    // Check file size
    if (file.size > 1200000) {
      alert(`File size exceeds the limit of 1.2MB for Image ${imageNumber}.`);
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const imageData = event.target.result;
  
      // Store image data in local storage
      localStorage.setItem(`uploadedImage${imageNumber}`, imageData);
  
      // Display the image
      displayImage(imageData, imageNumber);
  
      // Show the Remove button and Next Page link
      document.getElementById(`removeBtn${imageNumber}`).style.display = 'block';
      checkNextPageVisibility();
    };
  
    // Read the file as Data URL
    reader.readAsDataURL(file);
  }
  

function displayImage(imageData, imageNumber) {
  const displayDiv = document.getElementById(`imageDisplay${imageNumber}`);
  displayDiv.innerHTML = '';

  const image = new Image();
  image.src = imageData;
  image.style.maxWidth = '100%';
  displayDiv.appendChild(image);
}

function removeImage(imageNumber) {
  localStorage.removeItem(`uploadedImage${imageNumber}`);
  const displayDiv = document.getElementById(`imageDisplay${imageNumber}`);
  displayDiv.innerHTML = '';

  // Hide the Remove button and check Next Page visibility
  document.getElementById(`removeBtn${imageNumber}`).style.display = 'none';
  checkNextPageVisibility();
}

function checkNextPageVisibility() {
  const image1 = localStorage.getItem('uploadedImage1');
  const image2 = localStorage.getItem('uploadedImage2');

  // Show Next Page link only if both images are uploaded
  if (image1 && image2) {
    document.getElementById('nextPageLink').style.display = 'block';
  } else {
    document.getElementById('nextPageLink').style.display = 'none';
  }
}

// Check if images exist in local storage on page load
window.onload = function() {
  for (let i = 1; i <= 2; i++) {
    const imageData = localStorage.getItem(`uploadedImage${i}`);
    if (imageData) {
      displayImage(imageData, i);
      document.getElementById(`removeBtn${i}`).style.display = 'block';
    }
  }
  checkNextPageVisibility();
};
  
  // Retrieve images from local storage and set them in the result.html page
window.onload = function() {
    const image1 = localStorage.getItem('uploadedImage1');
    const image2 = localStorage.getItem('uploadedImage2');
  
    if (image1 && image2) {
      document.getElementById('resultImage1').src = image1;
      document.getElementById('resultImage2').src = image2;
    }
  };
  