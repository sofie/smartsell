(function() {

	Smart.ui.createApplicationMainWin = function() {
		var navWindow;

		var mainWindow = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'SmartSell'
		}));
		mainWindow.setTitleControl(lblTitle);

		//Eerste scherm
		navWindow = Ti.UI.createWindow();
		
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Smart.navGroup);

		navWindow.open({
			animated : false
		});
		
		mainWindow.addEventListener('open',function(){
			getLinks();
			Ti.API.info('Main win open, personeelnummer: '+Titanium.App.personeelNummer);
		})
		
		//
		//Navigationbar
		//
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'SmartSell'
		}));
		mainWindow.setTitleControl(lblTitle);

		var addButton = Titanium.UI.createButton(style.addButton);

		addButton.addEventListener('click', function(e) {
			Ti.include("/config/barcode.js");
		
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode=data.barcode;
					addLink();
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						Ti.API.info("Barcode: "+data.barcode+", symbol: "+data.symbology);
						
					}
				},
				cancel : function() {
					Ti.API.info('TiBar cancel callback!');
				},
				error : function() {
					Ti.API.info('TiBar error callback!');
				}
			});
		});
		mainWindow.rightNavButton = addButton;

		var searchbar = Ti.UI.createSearchBar({
			barColor : 'transparent',
			showCancel : false
		});
		
		searchbar.addEventListener('return', function() {
			if(Titanium.App.datalist === 0) {
				Ti.API.info('Geen resultaten');
				var lblNo = Titanium.UI.createLabel(Smart.combine(style.textError, {
					text : 'Geen linken gevonden voor "' + searchbar.value + '". Probeer een andere zoekterm.',
					left:20,
					right:20
				}));
				mainWindow.add(lblNo);
			}
		});

		//
		//Bestaande koppeling
		//

		Titanium.App.addEventListener('app:reloadLinks', function(e) {
			getLinks();
		});
		function getLinks() {

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				getReq.open("GET", "http://localhost/smartsell/get_links.php");
			}else{
				getReq.open("GET", "http://sofiehendrickx.eu/smartsell/get_links.php");
			}	
			
			getReq.timeout = 5000;

			getReq.onload = function() {
				try {
					var links = JSON.parse(this.responseText);
					Titanium.App.list = links;
					Titanium.App.datalist = links.length;

					//Er zijn nog geen linken in de databank
					if(links.getLink === false) {
						Titanium.API.info('Geen links');

						var lblNoLinks = Titanium.UI.createLabel(Smart.combine(style.textError, {
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.'
						}));
						mainWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < links.length; i++) {
							var linkid = links[i].linkId;
							var linknaam = links[i].linkNaam;

							var row = Ti.UI.createTableViewRow(style.row);
							row.filter = links[i].linkNaam;

							var name = Ti.UI.createLabel(Smart.combine(style.textNormal, {
								text : linknaam,
								left : 15,
								width : 250
							}));

							row.add(name);
							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data,
							search : searchbar
						}));
						mainWindow.add(listLinks);

						//Open detail van window
						listLinks.addEventListener('click', function(e) {
							Titanium.App.selectedIndex = links[e.index].linkId;
							Titanium.App.selectedNaam = links[e.index].linkNaam;
							
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						});

						//Delete row
						listLinks.addEventListener('delete', function(e) {
							Ti.API.info('DELETE FROM tblLink WHERE linkId=' + links[e.index].linkId);

							var deleteReq = Titanium.Network.createHTTPClient();
							if(Ti.App.localonline==="local"){
								deleteReq.open("GET", "http://localhost/smartsell/post_removelink.php");
							}else{
								deleteReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_removelink.php");
							}
							
							deleteReq.timeout = 5000;
							deleteReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if(response.remove === true) {
										Titanium.API.info('Remove link: ' + this.responseText);

									} else {
										alert('Link kan niet verwijderd worden.');
									}
								} catch(e) {
									alert(e);
								}
							};

							var params = {
								linkId : links[e.index].linkId
							};
							deleteReq.send(params);

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
		};
		function addLink() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				createReq.open("POST", "http://localhost/smartsell/post_addlink.php");
			}else{
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addlink.php");
			}
			

			var params = {
				linkProduct1 : Ti.App.productBarcode
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Ti.API.info("Add link: "+this.responseText);
					
					if(response.bestaatAl===true){
						alert('Link bestaat al.');
					}else{
						if(response.add === true) {
							Ti.App.fireEvent('app:reloadLinks', {
								action : 'Reload links'
							});
							
							Titanium.App.prodId = response.productId;
							Titanium.App.linkId=response.linkId;
							Titanium.App.linkNaam=response.linkNaam;
							
							Titanium.App.selectedNaam=response.linkNaam;
							Titanium.App.selectedIndex=response.linkId;
							
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						} else {
							Smart.navGroup.open(Smart.ui.createAddErrorWindow(), {
								animated : false
							});
							
						}
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

		//
		//Logout
		//
		var logoutButton = Titanium.UI.createButton(style.logoutButton);
		mainWindow.add(logoutButton);

		logoutButton.addEventListener('click', function() {
			mainWindow.close();
			Smart.ui.createLoginWindow();
		});
		//return mainWindow;
	};
})();
