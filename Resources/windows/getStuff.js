(function() {

	Smart.ui.createHTTPWindow = function() {
		//
		// Main window
		//
		var imageWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			layout : 'vertical'
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'HTTP GET ',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		imageWin.setTitleControl(lblAddTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
		backButton.addEventListener('click', function() {
			Smart.navGroup.close(imageWin, {
				animated : false
			});
		});
		imageWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		var xhr = Ti.Network.createHTTPClient({
			onload : function(e) {
				var img = Ti.UI.createImageView({
					image : this.responseData,
					width : 128,
					top : 20,
					height : 128,
					left : 20
				});
				imageWin.add(img);
			},
			onerror : function(e) {
				Ti.API.info('error, HTTP status = ' + this.status);
				alert(e.error);
			},
			timeout : 5000
		});
		xhr.open("GET", 'http://www.digyourowngrave.com/content/nutella.jpg');
		xhr.send();

		imageWin.addEventListener('itemSelected', function(e) {
			Titanium.API.info('Item: '+e.link);
		});
		return imageWin;
	};
})();
