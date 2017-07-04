'use strict';

var productsArray = [];
var imgParentElement = document.getElementById('imageArea');
var listParentElement = document.getElementById('resultsList');
var randomImage = 0;
var totalClicks = 0;
var maxClicks = 25;
var nowShowing = [];
var lastShowing = [];

var Products = function(imgName, fileName) {
  this.imgName = imgName;
  this.filepath = 'img/' + fileName;
  this.timesShown = 0;
  this.timesClicked = 0;
};

var allImageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

addProductsToArray();

show3RandomImages();

imgParentElement.addEventListener('click', function(event) {
  totalClicks++;
  var clickedId = event.target.getAttribute('id');
  for (var i = 0; i < productsArray.length; i++) {
    if (productsArray[i].imgName == clickedId) {
      productsArray[i].timesClicked += 1;
    }
  }
  lastShowing = nowShowing;
  nowShowing = [];
  remove3Images();
  if (totalClicks < maxClicks) {
    show3RandomImages();
  } else {
    showResultsList();
  }
});

function showResultsList() {
  for (var i = 0; i < productsArray.length; i++) {
    var li = document.createElement('li');
    if (productsArray[i].timesClicked === 1) {
      li.textContent = productsArray[i].timesClicked + ' vote for the ' + productsArray[i].imgName;
    } else {
      li.textContent = productsArray[i].timesClicked + ' votes for the ' + productsArray[i].imgName;
    }
    listParentElement.appendChild(li);
  }
}

function remove3Images() {
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
}

function addProductsToArray() {
  for (var i = 0; i < allImageNames.length; i++) {
      // take extension off image names
    var dotSplit = allImageNames[i].split('.');
    var prodName = dotSplit[0];
      // and capitalize first letter
    var capProdName = prodName.charAt(0).toUpperCase() + prodName.slice(1);
    prodName = new Products(capProdName, allImageNames[i]);
    productsArray.push(prodName);
  }
}

function show3RandomImages() {
  for (var j = 0; j < 3; j++) {
    randomImageGenerator();
      // while the nowShowing array or the lastShowing array INCLUDE any objects with the same imgName, re-run the randomImageGenerator function
    while (nowShowing.indexOf(productsArray[randomImage]) !== -1 || lastShowing.indexOf(productsArray[randomImage]) !== -1) {
      randomImageGenerator();
    }
    nowShowing.push(productsArray[randomImage]);
    productsArray[randomImage].timesShown += 1;
    var selectedImage = productsArray[randomImage].filepath;
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', selectedImage);
    imgElement.setAttribute('id', productsArray[randomImage].imgName);
    imgParentElement.appendChild(imgElement);
  }
}

function randomImageGenerator() {
  randomImage = Math.floor(Math.random() * productsArray.length);
}
