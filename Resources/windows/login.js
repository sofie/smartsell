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

		//
		//Inloggen via personeelsnummer
		//
		var labelPersoneelsnummer = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text : 'Inloggen via scannen lukt niet? Log hier in.',
			top : -380
		}));
		loginWin.add(labelPersoneelsnummer);

		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
		var personeelNummer = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 40,
			hintText : 'Personeelsnummer'
		}));
		loginWin.add(personeelNummer);
		
		var loginBtn = Titanium.UI.createButton(style.loginButton);
		loginWin.add(loginBtn);

		//
		//Inloggen via scannen
		//
		var labelPersoneelskaart = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text : 'Scan de barcode van uw personeelskaart om in te loggen.',
			top : -75
		}));
		loginWin.add(labelPersoneelskaart);

		var afbPersoneelskaart = Titanium.UI.createImageView(style.personeelsKaartImg);
		loginWin.add(afbPersoneelskaart);


		//
		//Login Service
		//

		//request
		function login() {
			var loginReq = Titanium.Network.createHTTPClient();
			loginReq.open("POST", "http://localhost/smartsell/auth.php");
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
						mainWin.open({
							animated : false
						});

					} else {
						alert('Onjuiste login.');
					}
				} catch(e) {
					alert(e);
				}
			};
			loginReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
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