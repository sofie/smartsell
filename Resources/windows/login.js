(function() {

	Smart.ui.createLoginWindow = function() {
		var navWindow;

		var loginWin = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'SmartSell'
		}));
		loginWin.setTitleControl(lblTitle);

		//Eerste scherm
		navWindow = Ti.UI.createWindow();
		Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : loginWin
		});
		navWindow.add(Smart.navGroup);

		navWindow.open({
			animated : false
		});
		loginWin.addEventListener('open',function(){
			Ti.API.info('Login win open');
		})

		//
		//Inloggen via personeelsnummer
		//
		var labelPersoneelsnummer = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Geef je personeelsnummer in om in te loggen.',
			top : -380
		}));
		loginWin.add(labelPersoneelsnummer);

		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
		var personeelNummer = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 40,
			hintText : 'Personeelsnummer'
		}));
		loginWin.add(personeelNummer);

		var loginBtn = Titanium.UI.createButton(style.loginButton);
		loginWin.add(loginBtn);

		//
		//Inloggen via scannen
		//
		var labelPersoneelskaart = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Of scan de barcode van uw personeelskaart om in te loggen.',
			top : -75
		}));
		loginWin.add(labelPersoneelskaart);

		var afbPersoneelskaart = Titanium.UI.createImageView(style.personeelsKaartImg);
		
		var TiBar = require('tibar');
		Ti.API.info("module is => " + TiBar);

		var allConfigWithDefaults = {
			classType : [{
				"ZBarReaderController" : true
			}],
			sourceType : [{
				"Library" : false
			}, {
				"Camera" : false
			}, {
				"Album" : true
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
		afbPersoneelskaart.addEventListener('click', function() {
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
					personeelNummer.value=data.barcode;
					login();
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
		loginWin.add(afbPersoneelskaart);

		//
		//Login Service
		//

		//request
		function login() {
			var loginReq = Titanium.Network.createHTTPClient();
			Ti.API.info('Local or online? '+Ti.App.localonline);
			if(Ti.App.localonline==="local"){
				loginReq.open("POST", "http://localhost/smartsell/auth.php");
			}else{
				loginReq.open("POST", "http://sofiehendrickx.eu/smartsell/auth.php");
			}	
			loginReq.timeout = 5000;

			var params = {
				personeelNummer : personeelNummer.value,
			};

			loginReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					if(response.logged == true) {
						Titanium.App.personeelNummer = personeelNummer.value;
						loginWin.close({
							animated : false
						});
						mainWin = Smart.ui.createApplicationMainWin();

					} else {
						var alertDialog = Ti.UI.createAlertDialog({
							title : 'Login',
							message : 'Onjuiste login. Personeelsnummer staat op achterkant van personeelskaart.',
							buttonNames : ['OK']
						});
						alertDialog.show();
					}
				} catch(e) {
					alert(e);
				}
			};
			loginReq.onerror = function(e) {
				var alertDialog = Ti.UI.createAlertDialog({
					title : 'Login',
					message : 'Kan niet inloggen. Controleer uw internetverbinding.',
					buttonNames : ['OK']
				});
				alertDialog.show();
				//personeelNummer.blur();

				//alert('Er is iets mis met de databank.');
			}

			loginReq.send(params);
		};

		//verbinding met phpfile en database
		loginBtn.addEventListener('click', function() {
			if(personeelNummer.value != '') {
				login();
			} else {
				alert("Gelieve uw personeelskaart te scannen of uw personeelsnummer in te geven.");
			}
		});
	}
})();
