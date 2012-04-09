(function() {

	Smart.ui.createNieuweKoppelingWindow = function() {
		var addKoppelingWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			backgroundImage : 'img/bg.png',
			layout:'vertical',
			navBarHidden:false
		});

		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuwe koppeling',
			color : '#fff',
			font : FontTitle
		});
		addKoppelingWin.setTitleControl(lblAddTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(commonStyle.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addKoppelingWin, {
				animated : false
			});
		});
		addKoppelingWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		var linkNaam = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Naam koppeling',
			font : FontTextField,
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		addKoppelingWin.add(linkNaam);

		var linkProduct1 = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Product 1',
			font : FontTextField,
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		addKoppelingWin.add(linkProduct1);

		var linkProduct2 = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 40,
			hintText : 'Product 2',
			font : FontTextField,
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		addKoppelingWin.add(linkProduct2);

		var btnCreateLijstje = Titanium.UI.createButton({
			backgroundImage : 'img/btn_maken.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});
		addKoppelingWin.add(btnCreateLijstje);


		btnCreateLijstje.addEventListener('click', function(e) {
			if(linkNaam.value != '') {
				addLink();
			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});
		
		function addLink() {
			var createReq = Titanium.Network.createHTTPClient();
			createReq.open("POST", "http://localhost/smartsell/post_addlink.php");

			var params = {
				linkNaam : linkNaam.value,
				linkProduct1 : linkProduct1.value,
				linkProduct2 : linkProduct2.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					if(response.add === true) {
						Titanium.API.info('Add link: ' + this.responseText);
						Ti.App.fireEvent('app:reloadLinks', {
							action : 'Reload links'
						});
						Smart.navGroup.close(addKoppelingWin, {
							animated : false
						});
					} else {
						alert('Link bestaat al.');
					}
				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};
		
		return addKoppelingWin;
	};
})();
