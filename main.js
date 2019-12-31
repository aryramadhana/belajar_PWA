$(document).ready(function() {
	
	var _url = "https://my-json-server.typicode.com/aryramadhana/pwaapi/products"

	var dataResults=''

	var optionResults=''

	var categories=[]


	function renderPage(data) {
		
		$.each(data, function(key,items) {

			_cat=items.category
			dataResults += "<div>"
							+ "<h3>" + items.nama + "</h3>"
							+ "<h3>" + items.category + "</h3>"
			"</div";

			if ($.inArray(_cat,categories)== -1) {
				categories.push(_cat)
				optionResults +="<option value'"+_cat+"'>"+_cat+"</option>"
			}
		})

		$('#products').html(dataResults)

		$('#cat_select').html("<option value='all'>semua</option>" + optionResults)
}

	//fresh data from online
	var networkDataReceived = false
	var networkUpdate = fetch(_url).then(function(response) {
		return response.json()
	}).then(function(data){
		networkDataReceived = true
		renderPage(data)
	})

	//return data from cache
	caches.match(_url).then(function(response){
		if (!response) throw Error ('no data on cache')
		return response.json()
	}).then(function(data){
		if (!networkDataReceived) {
			renderPage(data)
			console.log('render data from cache')
		}
	}).catch(function(){
		return networkUpdate
	})


	//fungsi Filter
	$("#cat_select").on('change',function(){
		updateProduct($(this).val())
	})


	function updateProduct(cat) {

		var dataResults=''

		var _newUrl=_url

		if (cat != 'all'){
			_newUrl = _url + "?category=" + cat
		}
		

		$.get(_newUrl, function(data){
		$.each(data, function(key,items) {

			_cat=items.category
			dataResults += "<div>"
							+ "<h3>" + items.nama + "</h3>"
							+ "<h3>" + items.category + "</h3>"
			"</div";
		})

		$('#products').html(dataResults)

	})

	}
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}