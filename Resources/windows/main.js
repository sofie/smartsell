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

		navWindow.open({
			animated : false
		});

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
		addButton.addEventListener('click', function(e) {
			//mainWindow.close();
			Smart.navGroup.open(Smart.ui.createNieuweKoppelingWindow({
				animated : false
			}));
		});
		mainWindow.rightNavButton = addButton;

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
		//Links
		//
		var data = [Ti.UI.createTableViewRow({
			title : 'Choco - Banaan',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Stella - Duyvis Nootjes',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Kaas - Wijn',
			hasChild : true
		})];

		var listLinks = Titanium.UI.createTableView({
			top : 60,
			left : 13,
			right : 10,
			data : data,
			backgroundImage : 'img/bg.png',
			scrollable : false,
			fullscreen : false,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		mainWindow.add(listLinks);
		
		listLinks.addEventListener('click', function(e) {
			Smart.navGroup.open(Smart.ui.createHTTPWindow({animated:false}));
		});
		/*
		var createReq = Titanium.Network.createHTTPClient({
			onload : function() {
				var json = this.responseText;
				var response = JSON.parse(json);
				if(response.getLink == true) {
					Ti.API.info('Stringify: ' + JSON.stringify(response.result));

					Titanium.API.info('Result: ' + response.linkNaam);
					Titanium.API.info('Text: ' + this.responseText);
					alert('Linken tonen');
				} else {
					alert('Er zijn nog geen links.');
				}
			},
			//Databank niet ok (path, MAMP,...)
			onerror : function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			},
			timeout : 5000
		});

		createReq.open("POST", "http://localhost/AuthSmartsell/post_getlinks.php");
		createReq.send();
*/
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
