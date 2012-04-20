(function() {
	Smart.ui.theme = {
		redColor : '#AC3724',
		darkColor : '#474240',
	};

	Smart.ui.properties = {
		platformWidth : Ti.Platform.displayCaps.platformWidth,
		platformHeight : Ti.Platform.displayCaps.platformHeight,

		Window : {
			width : '100%',
			height : '100%',
			backgroundImage : '/img/bg.png',
			barImage : 'img/header.png'
		},
		tableView : {
			top : 0,
			left : 0,
			right : 0,
			bottom : 64,

			editable : true,
			allowsSelectionDuringEditing : true,

			filterAttribute : 'filter',
			hideSearchOnSelection : false,

			backgroundImage : 'img/bg.png',
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		},

		titleBar : {
			color : '#fff',
			font : {
				fontFamily : 'Bree serif',
				fontSize : 24
			},
			height : 30
		},
		bgProduct : {
			left : 'auto',
			right : 'auto',
			width : 288,
			top : 20,
			backgroundImage : 'img/bg_product.png',
			height : 179
		},
		
		//
		//LABELS
		//
		textNormal : {
			color : '#3A3737',
			left : 20,
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			textAlign : 'left',
			width : '280'
		},
		textDelete : {
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			top : 13,
			right : 15,
			height : 20,
			width : 'auto'
		},
		textProductTitle : {
			left : 20,
			top : 10,
			width : 230,
			height : 25,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 16,
				fontFamily : 'Bree serif'
			}
		},
		textProductDescription : {
			left : 130,
			right : 20,
			top : 46,
			height : 70,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 13,
				fontFamily : 'Merge'
			}
		},
		textProductPrice : {
			right : 20,
			top : 120,
			height : 30,
			textAlign : 'right',
			color : '#474240',
			font : {
				fontSize : 16,
				fontFamily : 'Bree serif'
			}
		},
		textError : {
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			color : '#AC3724',
			left : 30,
			right : 30,
			width : 300,
			height : 'auto'
		},

		inputField : {
			color : '#3A3737',
			left : 20,
			height : 40,
			width : Ti.Platform.displayCaps.platformWidth - 40,
			font : {
				fontSize : 13,
				fontFamily : 'Bree Serif'
			},
			opacity : 0.9,
			keyboardType : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		},

		//
		//BUTTONS
		//
		loginButton : {
			backgroundImage : '/img/btn_login.png',
			top : 90,
			right : 20,
			width : 90,
			height : 37
		},
		logoutButton : {
			backgroundImage : 'img/btn_logout.png',
			height : 37,
			width : 280,
			bottom : 10,
			left : 'auto',
			right : 'auto'
		},
		addButton : {
			backgroundImage : "img/btn_add.png",
			width : 33,
			height : 31
		},
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 52,
			height : 31
		},
		makenButton : {
			backgroundImage : 'img/btn_maken.png',
			width : 95,
			height : 37,
			right : 20,
			top : 15
		},
		
		//
		//VIEWBACKGROUNDS 
		//
		personeelsKaartImg:{
			image : "/img/personeelskaart.png",
			left : 'auto',
			right : 'auto',
			top : 200,
			width : 247,
			height : 181
		}

	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
