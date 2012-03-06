(function() {
	var navWindow;

	var loginWin = Titanium.UI.createWindow({
		barImage : 'img/header.png',
		fullscreen : false,
		tabBarHidden : true,
		modal : true,
		backgroundImage:'img/bg.png'
	});

	var lblTitle = Titanium.UI.createLabel({
		text : 'Inloggen',
		color : '#fff',
		font : {
			fontFamily : 'Bree Serif',
			fontSize : 24
		}
	});
	loginWin.setTitleControl(lblTitle);

	//Eerste scherm
	navWindow = Ti.UI.createWindow();
	Smart.navGroup = Ti.UI.iPhone.createNavigationGroup({
		window : loginWin
	});
	navWindow.add(Smart.navGroup);

	navWindow.open({
		transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	
	//
	//Inloggen via scannen
	//
	var labelPersoneelskaart = Titanium.UI.createLabel({
		color : '#474240',
		text : 'Scan de barcode van uw personeelskaart om in te loggen.',
		left : 20,
		top : -350,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif',
		},
		textAlign : 'left',
		width : '280'

	})
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
	var labelPersoneelsnummer = Titanium.UI.createLabel({
		color : '#474240',
		text : 'Inloggen via scannen lukt niet? Log hier in.',
		left : 20,
		top : 180,
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		textAlign : 'left',
		width : '300'
	})
	loginWin.add(labelPersoneelsnummer);

	var widthTxtField = Titanium.Platform.displayCaps.platformWidth - 40;
	var personeelNummer = Titanium.UI.createTextField({
		color : '#474240',
		top : 320,
		left : 20,
		height : 40,
		width : widthTxtField,
		height : 40,
		hintText : 'Personeelsnummer',
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		opacity : 0.65,
		keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
	});
	loginWin.add(personeelNummer);

	var loginBtn = Titanium.UI.createButton({
		backgroundImage : '/img/btn_inloggen.png',
		title : 'Inloggen',
		top : 370,
		right : 20,
		width : 90,
		height : 35,
		font : {
			fontFamily : 'Bree Serif',
			fontWeight : 'bold',
			fontSize : 17
		}
	});
	loginWin.add(loginBtn);
	
	//
	//Login Service
	//
	
	//request
	var loginReq = Titanium.Network.createHTTPClient();

	//json response
	loginReq.onload = function() {
		var json = this.responseText;
		var response = JSON.parse(json);
		if(response.logged == true) {
			loginWin.close();
			mainWin = Smart.ui.createApplicationMainWin();
			mainWin.open();

		} else {
			alert(response.message);
		}
	};
	//verbinding met phpfile en database
	loginBtn.addEventListener('click', function() {
		if(personeelNummer.value != '') {
			loginReq.open("POST", "http://localhost/AuthSmartsell/post_auth.php");
			var params = {
				personeelNummer : personeelNummer.value,
			};
			loginReq.send(params);
		} else {
			alert("Gelieve uw personeelskaart te scannen of uw personeelsnummer in te geven.");
		}
	});
	
	//
	//Logout
	//
	Titanium.App.addEventListener('app:logout', function(e) {
		personeelNummer.value = '';
		loginWin.open();
	});
})();
