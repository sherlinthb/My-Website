//listen for form submit

document.getElementById('myform').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	

	if(!validateForm(siteName, siteUrl)){

		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	
	//local storage
	
	if(localStorage.getItem('bookmarks') === null){
		// init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		
		//Reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();
	
	// refetch bookmarks	
	fetchBookmarks();
	
	//prevents form from submitting
	e.preventDefault();
}

	//Delete bookmark
	function deleteBookmark(url){
		//get bookmark from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//loop through bookmarks
		for(var i = 0; i < bookmarks.length;i++){
			if(bookmarks[i].url == url){
				//remove from array
				bookmarks.splice(i,1);
			}
		}
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		
		//refetch bookmarks	
		fetchBookmarks();
	}



//fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	//Get output id
	var bookmarksResults = document.getElementById("bookmarksResults");
	
	//build output
	bookmarksResults.innerHTML=' ';
	for(var i = 0;i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		
		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>' +name+
										' <a class="btn btn-default" target= "_blank" href="'+url+'">Visit</a> ' +
										' <a onclick = "deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
										'</h3>' +
										'</div>';
										
	}
}

	//Validate Form

function validateForm(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Please fill in the form.');

		return false;
	}

	 var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
     var regex = new RegExp(expression);

     if(!siteUrl.match(regex)){

     	alert('Please use a valid URL');
     	return false;
     }

     return true;
}