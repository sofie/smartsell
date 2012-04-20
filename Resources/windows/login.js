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
		//Inloggen via scannen
		//
		var labelPersoneelskaart = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text : 'Scan de barcode van uw personeelskaart om in te loggen.',
			top : -350
		}));
		loginWin.add(labelPersoneelskaart);

		var afbPersoneelskaart = Titanium.UI.createImageView({
			image : "/img/personeelskaart.png",
			left : 'auto',
			right : 'auto',
			top : 70,
			width : 247,
			height : 181
		})
		loginWin.add(afbPersoneelskaart);

		//
		//Inloggen via personeelsnummer
		//
		var labelPersoneelsnummer = Titanium.UI.createLabel(Smart.combine(style.textNormal,{
			text : 'Inloggen via scannen lukt niet? Log hier in.',
			top : 180
		}));
		loginWin.add(labelPersoneelsnummer);

		var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
		var personeelNummer = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 320,
			hintText : 'Personeelsnummer'
		}));
		loginWin.add(personeelNummer);

		var loginBtn = Titanium.UI.createButton(style.loginButton);
		loginWin.add(loginBtn);

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
						Smart.ui.createApplicationMainWin();

					} else {
						Titanium.UI.createAlertDialog({
							title : 'Foute login.',
							message : 'Personeelsnummer is niet juist. Je vindt het nummer achteraan je personeelskaart.'
						}).show();
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
	};
})();
