(function() {

	Smart.ui.createLoginWindow = function() {
		var navWindow;

		var loginWin = Titanium.UI.createWindow(Smart.combine(style.Window, {
			layout : 'vertical'
		}));
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
			top : 10,
			height:15
		}));
		loginWin.add(labelPersoneelsnummer);

		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
		var personeelNummer = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 10,
			hintText : 'Personeelsnummer'
		}));
		loginWin.add(personeelNummer);

		var loginBtn = Titanium.UI.createButton(style.loginButton);
		loginWin.add(loginBtn);
		
		var bg_lijn = Ti.UI.createView({
			width:280,
			height:11,
			left:20,
			top:20,
			opacity:0.6,
			backgroundImage:'img/of.png'
		});
		loginWin.add(bg_lijn);
		//
		//Inloggen via scannen
		//
		var labelPersoneelskaart = Titanium.UI.createLabel(Smart.combine(style.textNormal, {
			text : 'Tik hieronder en log in door de barcode van je personeelskaart te scannen.',
			top : 10,
			height:35
		}));
		loginWin.add(labelPersoneelskaart);

		var afbPersoneelskaart = Titanium.UI.createImageView(style.personeelsKaartImg);
		
		var TiBar = require('tibar');

		
		afbPersoneelskaart.addEventListener('click', function() {
			Ti.include("/config/barcode.js");

			Ti.API.debug(JSON.stringify(config));
			
			TiBar.scan({
				configure : config,
				success : function(data) {
					personeelNummer.value=data.barcode;
					login();
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
