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
		row : {
			height : 40,
			backgroundImage : 'img/bg_row.png',
			width : 280,
			selectedBackgroundColor : '#e3602b',
			backgroundSelectedColor : '#e3602b'
		},
		rowDetail : {
			left : 'auto',
			right : 'auto',
			width : 288,
			top : 20,
			backgroundImage : 'img/bg_product.png',
			backgroundColor : '#fff',
			height : 86
		},
		titleBar : {
			color : '#fff',
			font : {
				fontFamily : 'Bree serif',
				fontSize : 22
			},
			height : 30
		},
		scrollView: {
			contentWidth : 'auto',
			contentHeight : 'auto',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			top : 160,
			bottom : 0,
			verticalBounce:true
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
			color : '#4C4C4C',
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
			top : 5,
			right : 15,
			height : 20,
			width : 30,
			textAlign : 'right'
			
		},
		textProductTitle : {
			left :20,
			top : 2,
			width : 210,
			height : 25,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 16,
				fontFamily : 'Bree serif'
			}
		},
		textProductDescription : {
			left : 45,
			right : 25,
			top : 25,
			height : 35,
			textAlign : 'left',
			color : '#474240',
			font : {
				fontSize : 13,
				fontFamily : 'Merge'
			}
		},
		textProductPrice : {
			left : 45,
			top : 50,
			height : 30,
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
			right : 50,
			height : 20
		},

		inputField : {
			paddingLeft:10,
			color : '#3A3737',
			left : 20,
			height : 40,
			width : 280,
			right : 20,
			font : {
				fontSize : 13,
				fontFamily : 'Bree serif'
			},
			opacity : 0.9,
			autocapitalization : false,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			backgroundImage : '/img/bg_textInput.png'
		},

		//
		//BUTTONS
		//
		loginButton : {
			backgroundImage : '/img/btn_login.png',
			top : 10,
			right : 20,
			width : 280,
			height : 36
		},
		logoutButton : {
			backgroundImage : 'img/btn_logout.png',
			height : 37,
			width : 280,
			bottom : 10,
			left : 'auto',
			right : 'auto'
		},
		maakLinkButton : {
			backgroundImage : 'img/btn_maakLink.png',
			height : 37,
			width : 280,
			top : 15,
			left : 'auto',
			right : 'auto'
		},
		scanBarcodeButton : {
			backgroundImage : 'img/btn_scanBarcode.png',
			height : 37,
			width : 280,
			top : 15,
			left : 'auto',
			right : 'auto'
		},
		addButton : {
			backgroundImage : "img/btn_add.png",
			width : 28,
			height : 28
			
		},
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 49,
			height : 28
		},
		makenButton : {
			backgroundImage : 'img/btn_maken.png',
			width : 95,
			height : 37,
			right : 20,
			top : 15
		},
		voegToeButton : {
			backgroundImage : 'img/btn_maken.png',
			width : 95,
			height : 37,
			right : 20,
			top : 15
		},
		verwijderenButton : {
			backgroundImage : '/img/btn_verwijderen.png',
			top : 20,
			left : 20,
			width : 128,
			height : 37
		},
		starButton : {
			backgroundImage : '/img/star_unselected.png',
			top : 4,
			left : 13,
			width : 25,
			height : 25
		},
		klaarButton : {
			backgroundImage : '/img/btn_klaar.png',
			top : -37,
			right : 20,
			width : 128,
			height : 37
		},
		
		//
		//VIEWBACKGROUNDS 
		//
		personeelsKaartImg:{
			image : "/img/kaart.jpg",
			left : 'auto',
			right : 'auto',
			top : 10,
			width : 269,
			height : 194
		}

	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
