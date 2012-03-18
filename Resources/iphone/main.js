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
		var table = Ti.UI.createTableView({
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		var tableData = [];
		var json, fighters, fighter, i, row, nameLabel;

		var xhr2 = Ti.Network.createHTTPClient({
			onload : function() {
				// Ti.API.debug(this.responseText);

				json = JSON.parse(this.responseText);
				for( i = 0; i < json.fighters.length; i++) {
					fighter = json.fighters[i];
					row = Ti.UI.createTableViewRow({
						height : 'auto'
					});
					nameLabel = Ti.UI.createLabel({
						text : fighter.name,
						font : {
							fontSize : '17'
						},
						height : 'auto',
						left : '10dp',
						top : '5dp',
						color : '#000',
						touchEnabled : false
					});
					
					row.add(nameLabel);
					tableData.push(row);
				}

				table.setData(tableData);
			},
			onerror : function(e) {
				Ti.API.debug("STATUS: " + this.status);
				Ti.API.debug("TEXT:   " + this.responseText);
				Ti.API.debug("ERROR:  " + e.error);
				alert('There was an error retrieving the remote data. Try again.');
			},
			timeout : 5000
		});

		xhr2.open("GET", "https://raw.github.com/appcelerator/Documentation-Examples/master/HTTPClient/data/json.txt");
		xhr2.send();

		mainWindow.add(table);
		mainWindow.open();

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
