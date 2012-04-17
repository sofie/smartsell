(function() {
	var navWindow;

	var loginWin = Titanium.UI.createWindow({
		barImage : 'img/header.png',
		tabBarHidden : true,
		modal : true,
		navBarHidden : false,
		backgroundImage : 'img/bg.png'
	});

	var lblTitle = Titanium.UI.createLabel({
		text : 'SmartSell',
		color : '#fff',
		font : FontTitle
	});
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
	var labelPersoneelsnummer = Titanium.UI.createLabel({
		color : '#474240',
		text : 'Inloggen via scannen lukt niet? Log hier in.',
		left : 20,
		top : -380,
		font : FontNormal,
		textAlign : 'left',
		width : '300'
	})
	loginWin.add(labelPersoneelsnummer);

	var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
	var personeelNummer = Titanium.UI.createTextField({
		color : '#474240',
		top : 40,
		left : 20,
		height : 40,
		width : widthTxtField,
		height : 40,
		hintText : 'Personeelsnummer',
		font : FontTextField,
		opacity : 0.65,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	loginWin.add(personeelNummer);
	
	//
	//Inloggen via scannen
	//
	var labelPersoneelskaart = Titanium.UI.createLabel({
		color : '#474240',
		text : 'Scan de barcode van uw personeelskaart om in te loggen.',
		left : 20,
		top : -150,
		font : FontNormal,
		textAlign : 'left',
		width : '280'

	})
	loginWin.add(labelPersoneelskaart);

	var afbPersoneelskaart = Titanium.UI.createImageView({
		image : "/img/personeelskaart.png",
		left : 'auto',
		right : 'auto',
		top : 160,
		width : 247,
		height : 181
	})
	loginWin.add(afbPersoneelskaart);

	var loginBtn = Titanium.UI.createButton({
		backgroundImage : '/img/btn_login.png',
		top : 369,
		right : 20,
		width : 90,
		height : 37
	});
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
	
	//
	//Logout
	//
	Titanium.App.addEventListener('app:logout', function(e) {
		personeelNummer.value = '';
		loginWin.open({
			animated : false
		});
	});
})();
