/*
 * Write your JS code in this file.  Don't forget to include your name and
 * @oregonstate.edu email address below.
 *
 * Name: Owen Markley
 * Email: markleyo@oregonstate.edu
 */


var sellSomethingModal = document.getElementById("sell-something-modal");
var sellSomethingButton = document.getElementById("sell-something-button");
var sellSomethingModalClose = document.getElementById("modal-close");
var sellSomethingModalCancel = document.getElementById("modal-cancel");
var sellSomethingModalAccept = document.getElementById("modal-accept");
var sellSomethingModalBackdrop = document.getElementById("modal-backdrop");
var postTextInput = document.getElementById("post-text-input");
var postPhotoInput = document.getElementById("post-photo-input");
var postPriceInput = document.getElementById("post-price-input");
var postCityInput = document.getElementById("post-city-input");
var filterUpdateButton = document.getElementById("filter-update-button");


sellSomethingButton.onclick = function(){
	sellSomethingModalBackdrop.style.display = "block";
	sellSomethingModal.style.display = "block";

}

function closeAndEmptyModal(){
	sellSomethingModal.style.display = "none";
	postTextInput.value = '';
	postPhotoInput.value = '';
	postPriceInput.value = '';
	postCityInput.value = '';
	document.getElementById("post-condition-new").checked = true;
	sellSomethingModalBackdrop.style.display = "none";

}

sellSomethingModalClose.onclick = closeAndEmptyModal;
sellSomethingModalCancel.onclick = closeAndEmptyModal;

function hasEmpty(){
	if(postTextInput.value == '' || postPhotoInput.value == '' || postPriceInput.value == '' || postCityInput.value == ''){
		return true;
	}
	return false;
}

function getSelectedCondition(){
	var selectedConditionButton = document.querySelector('input[name="post-condition"]:checked');
	return selectedConditionButton.value;
}

function addItem(){
	var newMainDiv = document.createElement("div");
	newMainDiv.classList.add('post');
	newMainDiv.setAttribute('data-price', postPriceInput.value);
	newMainDiv.setAttribute('data-city', postCityInput.value);
	newMainDiv.setAttribute('data-condition', getSelectedCondition());

	var newContentsDiv = document.createElement("div");
	newContentsDiv.classList.add('post-contents');
	newMainDiv.appendChild(newContentsDiv);

	var newPictureDiv = document.createElement("div");
	newPictureDiv.classList.add('post-image-container');
	newContentsDiv.appendChild(newPictureDiv);

	var picture = document.createElement("img");
	picture.setAttribute('src', postPhotoInput.value);
	picture.setAttribute('alt', postTextInput.value);
	newPictureDiv.appendChild(picture);

	var newInfoContainerDiv = document.createElement("div");
	newInfoContainerDiv.classList.add('post-info-container');
	newContentsDiv.appendChild(newInfoContainerDiv);

	var title = document.createElement("a");
	title.setAttribute('href', '#');
	title.classList.add('post-title');
	title.textContent = postTextInput.value;
	newInfoContainerDiv.appendChild(title);

	var price = document.createElement("span");
	price.classList.add('post-price');
	price.textContent = '$' + postPriceInput.value;
	newInfoContainerDiv.appendChild(price);

	var city = document.createElement("span");
	city.classList.add('post-city');
	city.textContent = '(' + postCityInput.value + ')';
	newInfoContainerDiv.appendChild(city);

	document.getElementById('posts').appendChild(newMainDiv);
}

sellSomethingModalAccept.onclick = function(){
	if(hasEmpty()){
		alert("Please fill all fields.");
		return false;
	}
	else{
		addItem();
		closeAndEmptyModal();
	}
}

filterUpdateButton.onclick = function(){
	var text = document.getElementById('filter-text').value;
	var priceMin = document.getElementById('filter-min-price').value;
	var priceMax = document.getElementById('filter-max-price').value;
	var city = document.getElementById('filter-city').value;
	var conditions = getFilterConditions();

	var posts = document.getElementsByClassName("post");
	checkPrice(posts, priceMin, priceMax);
	checkCity(posts, city);
	checkCondition(posts, conditions);
	checkText(posts, text);
}

function getFilterConditions(){
	var filterConditions = document.getElementsByName("filter-condition");
	var acceptableConditionsArray = [];

	for(var i=0; i<filterConditions.length; i++){
		if(filterConditions[i].checked){
			acceptableConditionsArray.push(filterConditions[i].value);
		}
	}
	return acceptableConditionsArray;
}

function checkPrice(postings, min, max){
	for(var i=0; i<postings.length; i++){
		var tempPrice = parseInt(postings[i].getAttribute("data-price"));
		if(min != '' && tempPrice<min){
			document.getElementById("posts").removeChild(postings[i]);
			i--;
		}
		if(max != '' && tempPrice>max){
			document.getElementById("posts").removeChild(postings[i]);
			i--;
		}
	}
}

function checkCity(postings,selectedCity){
	for(var i=0; i<postings.length; i++){
		var tempCity = postings[i].getAttribute("data-city");
		if(selectedCity != '' && selectedCity != tempCity){
			document.getElementById("posts").removeChild(postings[i]);
			i--;
		}
	}
}

function checkCondition(postings, selectedConditions){
	if(selectedConditions.length == 0)
		return false;

	for(var i=0; i<postings.length; i++){
		var tempCondition = postings[i].getAttribute("data-condition");
		var present = false;
		for(var j=0; j<selectedConditions.length; j++){
			if(selectedConditions[j] == tempCondition){
				present = true;
			}
		}
		if(!present){
			document.getElementById("posts").removeChild(postings[i]);
			i--;
		}
	}
}

function checkText(postings, text){
	for(var i=0; i<postings.length; i++){
		var tempText = postings[i].children[0].children[1].children[0].textContent;
		var tempTextLower = tempText.toLowerCase();
		if(tempTextLower.search(text) == -1){
			document.getElementById("posts").removeChild(postings[i]);
			i--;
		}
	}
}

