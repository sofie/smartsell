(function() {
	var navWindow;

	Smart.ui.createApplicationMainWin = function() {
		var mainWindow = Titanium.UI.createWindow(commonStyle.windowNoLayout);
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
			font : FontTitle
		});
		mainWindow.setTitleControl(lblTitle);

		var addButton = Titanium.UI.createButton(commonStyle.addButton);

		addButton.addEventListener('click', function(e) {
			//mainWindow.close();
			Smart.navGroup.open(Smart.ui.createNieuweKoppelingWindow(), {
				animated : false
			});
		});
		mainWindow.rightNavButton = addButton;

		//
		//Zoek bestaande koppeling
		//
		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 43 - 45;

		Titanium.App.addEventListener('app:reloadLinks', function(e) {
			getLinks();
		});
		getLinks();
		function getLinks() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartsell/post_getlinks.php");
			getReq.timeout = 5000;

		var listLinks = Titanium.UI.createTableView({
			data : data,
			backgroundImage : 'img/bg.png',
			scrollable : false,
			fullscreen : false,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		//
			editable:true,
			allowsSelectionDuringEditing:true
		//
		});
		mainWindow.add(listLinks);
		
	//	
		listLinks.addEventListener('click', function(e)
		{
			// event data
			var index = e.index;
			var section = e.section;
			var row = e.row;
			var rowdata = e.rowData;
			//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
		});

			getReq.onload = function() {
				try {
					var links = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(links.getLink == false) {
						Titanium.API.info('Geen links');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.',
							font : FontNormal,
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						mainWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < links.length; i++) {
							var linkid = links[i].linkId;
							var linknaam = links[i].linkNaam;
							var linkprod1 = links[i].productNaam;

							var searchbar = Ti.UI.createSearchBar({
								barColor : 'transparent',
								showCancel : false
							});

							var row = Ti.UI.createTableViewRow({
								height : 35,
								rightImage : 'img/arrow.png'
							});
							row.filter = links[i].linkNaam;

							var name = Ti.UI.createLabel({
								text : linknaam,
								left : 10,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								color : '#474240',
								font : FontNormal
							});
							var prod1 = Ti.UI.createLabel({
								text : linkprod1,
								right : 10,
								width : 'auto',
								height : 'auto',
								color : '#474240',
								textAlign : 'left',
								font : FontSmall
							});

							row.add(name);
							row.add(prod1);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView({
							top : 0,
							left : 0,
							right : 0,
							bottom : 64,
							data : data,

							search : searchbar,
							filterAttribute : 'filter',
							hideSearchOnSelection : false,

							backgroundImage : 'img/bg.png',
							style : Titanium.UI.iPhone.TableViewStyle.GROUPED
						});
						mainWindow.add(listLinks);

						//Open detail van window
						listLinks.addEventListener('click', function(e) {
							Titanium.App.selectedIndex = links[e.index].linkId;
							Titanium.App.selectedNaam = links[e.index].linkNaam;
							Titanium.App.selectedProd1 = links[e.index].productNaam;
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						});
					}

				} catch(e) {
					alert(e);
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

<<<<<<< HEAD
			if(response.add == true) {
				Titanium.API.info('Ok');
			} else {
				Titanium.API.info('Niet ok');
			}
		};
		btnCreateLijstje.addEventListener('click', function(e) {
			Ti.API.info('Nieuwe koppeling: ' + nameKoppeling.value);
			if(nameKoppeling.value != '') {
				createReq.open("POST", "http://localhost/smartsell/post_getlink.php");
				var params = {
					linkNaam : nameKoppeling.value
				};
				createReq.send(params);
			}
		});
		
	}
})();
=======
 Titanium.API.info("deleted - row=" + e.row + ", index=" + e.index + ", section=" + e.section + ' foo ' + e.rowData.foo);
 });
 */

