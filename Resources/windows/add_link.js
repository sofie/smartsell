(function() {

	Smart.ui.createNieuweKoppelingWindow = function() {
		var addKoppelingWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			layout:'vertical'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Nieuwe koppeling'
		}));
		addKoppelingWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addKoppelingWin, {
				animated : false
			});
		});
		addKoppelingWin.leftNavButton = backButton;

		
		var btnCreateLijstje = Titanium.UI.createButton(style.makenButton);
		addKoppelingWin.add(btnCreateLijstje);

		var TiBar = require('tibar');
		Ti.API.info("module is => " + TiBar);

		var allConfigWithDefaults = {
			classType : [{
				"ZBarReaderController" : true
			}],
			sourceType : [{
				"Library" : false
			}, {
				"Camera" : true
			}, {
				"Album" : false
			}],
			cameraMode : [{
				"Default" : true
			}],
			config : {
				"showsCameraControls" : true,
				"showsZBarControls" : true,
				"tracksSymbols" : true,
				"enableCache" : true,
				"showsHelpOnFail" : true,
				"takesPicture" : false
			},
			symbol : {
				"QR-Code" : false,
				"CODE-128" : false,
				"CODE-39" : false,
				"I25" : false,
				"DataBar" : false,
				"DataBar-Exp" : false,
				"EAN-13" : true,
				"EAN-8" : true,
				"UPC-A" : false,
				"UPC-E" : false,
				"ISBN-13" : false,
				"ISBN-10" : false
			}
		};
		btnCreateLijstje.addEventListener('click', function(e) {
			/*if(linkProduct1.value != '') {
				addLink();
			} else {
				alert('Gelieve een naam in te vullen.');
			}*/
			
			var config = {};
			for(var section in allConfigWithDefaults) {
				if( typeof allConfigWithDefaults[section] === 'object' && allConfigWithDefaults[section] instanceof Array) {
					for(var itemix in allConfigWithDefaults[section]) {
						for(var labelname in allConfigWithDefaults[section][itemix]) {

							if(allConfigWithDefaults[section][itemix][labelname]) {
								config[section] = labelname;
							}
						}
					}
				} else {
					config[section] = allConfigWithDefaults[section];
				}
			}

			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode=data.barcode;
					addLink();
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						Ti.API.info("Barcode: "+data.barcode+", symbol: "+data.symbology);
						/*Ti.UI.createAlertDialog({
							title : "Scan result",
							message : "Inloggen gelukt."
						}).show();*/
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
							Smart.navGroup.close(addKoppelingWin, {
								animated : false
							});
							Titanium.App.prodId = response.productId;
							Titanium.App.linkId=response.linkId;
							Titanium.App.linkNaam=response.linkNaam;
							
							Smart.navGroup.open(Smart.ui.createDetailProductWindow(), {
								animated : false
							});
						} else {
							alert('Link kan niet toegevoegd worden.');
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
		
		return addKoppelingWin;
	};
})();
