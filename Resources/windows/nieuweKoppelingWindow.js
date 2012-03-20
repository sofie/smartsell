(function() {

	Smart.ui.createNieuweKoppelingWindow = function() {
		//
		// Main window
		//
		var addKoppelingWin = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			layout : 'vertical'
		});
		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Nieuwe koppeling',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		addKoppelingWin.setTitleControl(lblAddTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_back.png",
			width : 57,
			height : 35
		});
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
			hintText : 'Nieuwe koppeling',
			font : {
				fontSize : 15,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		/*
		 var picker = Titanium.UI.createPicker({
		 top:15,
		 type : Titanium.UI.PICKER_TYPE_DATE_AND_TIME
		 });*/

		var btnCreateLijstje = Titanium.UI.createButton({
			backgroundImage : 'img/btn_maken.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});

		var createReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);
				if(response.add == true) {
					Titanium.API.info('Qry: ' + this.responseText);
					Smart.navGroup.close(addKoppelingWin, {
						animated : false
					});
					Ti.App.fireEvent('app:reloadLinks', {
						action : 'Reload links'
					});

				} else {
					alert('Link bestaat al.');
				}
			},
			//Databank niet ok (path, MAMP,...)
			onerror : function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			},
			timeout : 5000
		});

		btnCreateLijstje.addEventListener('click', function(e) {
			if(linkNaam.value != '') {
				createReq.open("POST", "http://localhost/smartsell/post_addlink.php");
				var params = {
					linkNaam : linkNaam.value
				};
				createReq.send(params);
			} else {
				alert('Gelieve een naam in te vullen.');
			}
		});

		addKoppelingWin.add(linkNaam);
		/*addKoppelingWin.add(picker);
		 Titanium.API.info(picker.value);*/
		addKoppelingWin.add(btnCreateLijstje);

		return addKoppelingWin;
	};
})();
