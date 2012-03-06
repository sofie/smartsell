(function() {
	var navWindow;

	Smart.ui.createApplicationMainWin = function() {
		var mainWindow = Titanium.UI.createWindow({
			barImage : 'img/header.png',
			fullscreen : false,
			font : {
				fontFamily : 'Bree Serif'
			}
		});
		navWindow = Ti.UI.createWindow();

		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);

		navWindow.open();

		//
		//Navigationbar
		//
		var lblTitle = Titanium.UI.createLabel({
			text : 'Koppelingen',
			color : '#fff',
			font : {
				fontFamily : 'Bree Serif',
				fontSize : 24
			}
		});
		mainWindow.setTitleControl(lblTitle);

		var addButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_add.png",
			width : 37,
			height : 35
		});
		addButton.addEventListener('click', function() {
			Smart.navGroup.open(addKoppelingWin, {
				animated : true
			});
		});
		mainWindow.rightNavButton = addButton;
		
		//
		//Add koppeling window
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

		var nameKoppeling = Titanium.UI.createTextField({
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

		var btnCreateLijstje = Titanium.UI.createButton({
			backgroundImage : 'img/btn_maak.png',
			width : 100,
			height : 42,
			right : 20,
			top : 15
		});
		btnCreateLijstje.addEventListener('click', function(e) {
			Ti.API.info('Nieuwe koppeling: ' + nameKoppeling.value)
		});

		addKoppelingWin.add(nameKoppeling);
		addKoppelingWin.add(btnCreateLijstje);
		
		//
		//Zoek bestaande koppeling
		//
		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 43 - 45;

		var searchField = Titanium.UI.createTextField({
			color : '#888',
			top : 20,
			left : 20,
			width : widthTxtField,
			height : 40,
			hintText : 'Zoek bestaande koppeling...',
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

		var btnSearch = Titanium.UI.createButton({
			backgroundImage : 'img/btn_search.png',
			width : 43,
			height : 42,
			right : 20,
			top : 20
		});
		btnSearch.addEventListener('click', function(e) {
			Ti.API.info('Zoek koppeling: ' + searchField.value)
		});
		mainWindow.add(searchField);
		mainWindow.add(btnSearch);

		//
		//Logout
		//
		var logoutButton = Titanium.UI.createButton({
			backgroundImage : 'img/btn_logout.png',
			height : 42,
			width : 303,
			bottom : 20,
			left : 'auto',
			right : 'auto'
		});
		mainWindow.add(logoutButton);
		logoutButton.addEventListener('click', function() {
			mainWindow.close();
			Ti.App.fireEvent('app:logout', {
				action : 'Logout klik'
			});
		});
	}
})();
