(function() {
	var navWindow;

	Smart.ui.createApplicationMainWin = function() {
		var mainWindow = Titanium.UI.createWindow(commonStyle.windowNoLayout);
		mainWindow.addEventListener('open', function() {
			getLinks();
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
			text : 'SmartSell',
			color : '#fff',
			font : FontTitle
		});
		mainWindow.setTitleControl(lblTitle);

		var addButton = Titanium.UI.createButton(commonStyle.addButton);

		addButton.addEventListener('click', function(e) {
			Smart.navGroup.open(Smart.ui.createNieuweKoppelingWindow(), {
				animated : false
			});
		});
		mainWindow.rightNavButton = addButton;

		//
		//Bestaande koppeling
		//
		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 43 - 45;

		Titanium.App.addEventListener('app:reloadLinks', function(e) {
			getLinks();
		});
		function getLinks() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartsell/get_links.php");
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

							var searchbar = Ti.UI.createSearchBar({
								barColor : 'transparent',
								showCancel : false
							});
							searchbar.addEventListener('blur',function(){
								
							});

							var row = Ti.UI.createTableViewRow({
								height : 37,
								rightImage : 'img/arrow.png'
							});
							row.filter = links[i].linkNaam;

							var btnDelete = Titanium.UI.createButton({
								title : 'X',
								font:FontNormal,
								color : '#AC3724',
								top:2,
								left:5,
								backgroundImage:'img/btn_delete.png',
								width:35,
								height:33
							});
							

							var name = Ti.UI.createLabel({
								text : linknaam,
								left : 50,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								color : '#474240',
								font : FontNormal
							});
							
							row.add(btnDelete);
							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
							
							btnDelete.addEventListener('click',function(e){
								Titanium.API.info('Delete');
							});
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
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						});
						btnDelete.addEventListener('click',function(e){
							
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
		return mainWindow;
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