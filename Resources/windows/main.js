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
			top : 12,
			left : 23,
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
			top : 12
		});
		btnSearch.addEventListener('click', function(e) {
			Ti.API.info('Zoek koppeling: ' + searchField.value)
		});
		mainWindow.add(searchField);
		mainWindow.add(btnSearch);

		//
		//Haal linken op uit databank
		//
		Titanium.App.addEventListener('app:reloadLinks', function(e) {
			getLinks();
		});
		getLinks();
		function getLinks() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartsell/post_getlinks.php");
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var links = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(links.getLink == false) {
						Titanium.API.info('Geen links');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.',
							font : {
								fontFamily : 'Bree serif',
								fontSize : 15
							},
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						mainWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < links.length; i++) {
							var link = links[i].linknaam;

							var row = Ti.UI.createTableViewRow({
								height : 35,
								rightImage : 'img/arrow.png'
							});

							var name = Ti.UI.createLabel({
								text : link,
								left : 10,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								font : {
									fontFamily : 'Bree serif',
									fontSize : 15
								}
							});

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView({
							top : 52,
							left : 13,
							right : 10,
							bottom : 64,
							//height : 120,
							data : data,
							backgroundImage : 'img/bg.png',
							style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
							opacity : 0.7
						});
						mainWindow.add(listLinks);

						//Open detail van window
						listLinks.addEventListener('click', function(e) {
							Smart.navGroup.open(Smart.ui.createHTTPWindow({
								animated : false
							}));
						});
					}

				} catch(E) {
					alert(E);
				}
			};
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send();
		}

		//
		//Logout
		//
		var logoutButton = Titanium.UI.createButton({
			backgroundImage : 'img/btn_logout.png',
			height : 40,
			width : 290,
			bottom : 10,
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

/*

 listLinks.addEventListener('click', function(e) {
 // event data
 var index = e.index;
 var section = e.section;
 var row = e.row;
 var rowdata = e.rowData;
 Titanium.UI.createAlertDialog({
 title : 'Table View',
 message : 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata
 }).show();
 });
 // add delete event listener
 listLinks.addEventListener('delete', function(e) {
 var s = e.section;
 Ti.API.info('rows ' + s.rows + ' rowCount ' + s.rowCount + ' headerTitle ' + s.headerTitle + ' title ' + e.rowData.title);

 Titanium.API.info("deleted - row=" + e.row + ", index=" + e.index + ", section=" + e.section + ' foo ' + e.rowData.foo);
 });
 */