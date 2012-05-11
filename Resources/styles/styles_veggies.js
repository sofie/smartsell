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
			backgroundImage : '/img/black/bg_veggies.jpg',
			barImage : 'img/black/header_veggies.jpg'
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

			backgroundImage : 'img/black/bg_tableview.jpg',
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED
		},
		row : {
			height : 40,
			backgroundImage : 'img/bg_row.png',
			width : 280,
			selectedBackgroundColor : '#e3602b',
			backgroundSelectedColor : '#e3602b'
		},
		titleBar : {
			color : '#fff',
			font : {
				fontFamily : 'Ubuntu',
				fontSize : 22
			},
			height : 30
		},
		scrollView: {
			contentWidth : 'auto',
			contentHeight : 'auto',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			top : 0,
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
			color : '#000',
			left : 20,
			font : {
				fontSize : 12,
				fontFamily : 'Ubuntu'
			},
			textAlign : 'left',
			width : '280'
		},
		textDelete : {
			font : {
				fontSize : 13,
				fontFamily : 'Ubuntu'
			},
			color : '#AC3724',
			top : 13,
			right : 15,
			height : 20,
			width : 30,
			textAlign : 'right'
			
		},
		textProductTitle : {
			left :20,
			top : 10,
			width : 205,
			height : 25,
			textAlign : 'left',
			color : '#000',
			font : {
				fontSize : 14,
				fontFamily : 'Ubuntu'
			}
		},
		textProductDescription : {
			left : 130,
			right : 20,
			top : 46,
			height : 70,
			textAlign : 'left',
			color : '#000',
			font : {
				fontSize : 12,
				fontFamily : 'Ubuntu'
			}
		},
		textProductPrice : {
			right : 20,
			top : 120,
			height : 30,
			textAlign : 'right',
			color : '#000',
			font : {
				fontSize : 14,
				fontFamily : 'Ubuntu'
			}
		},
		
		textError : {
			font : {
				fontSize : 13,
				fontFamily : 'Ubuntu'
			},
			color : '#AC3724',
			left : 30,
			right : 50,
			height : 20
		},

		inputField : {
			paddingLeft:10,
			color : '#000',
			left : 20,
			height : 40,
			width : 280,
			right : 20,
			font : {
				fontSize : 12,
				fontFamily : 'Ubuntu'
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
			backgroundImage : '/img/black/btn_login_black.png',
			top : 90,
			right : 20,
			width : 93,
			height : 35
		},
		logoutButton : {
			backgroundImage : 'img/black/btn_logout_black.png',
			height : 35,
			width : 290,
			bottom : 10,
			left : 'auto',
			right : 'auto'
		},
		addButton : {
			backgroundImage : "img/black/btn_add_black.png",
			width : 35,
			height : 35
		},
		backButton : {
			backgroundImage : "img/black/btn_back_black.png",
			width : 58,
			height : 35
		},
		makenButton : {
			backgroundImage : 'img/black/btn_maken_black.png',
			width : 93,
			height : 35,
			right : 20,
			top : 15
		},
		voegToeButton : {
			backgroundImage : 'img/black/btn_voegtoe_black.png',
			width : 93,
			height : 35,
			right : 20,
			top : 15
		},
		verwijderenButton : {
			backgroundImage : '/img/black/btn_verwijderen_black.png',
			top : 20,
			left : 20,
			width : 128,
			height : 35
		},
		starButton : {
			backgroundImage : '/img/star_unselected.png',
			top : 10,
			left : 13,
			width : 25,
			height : 25
		},
		klaarButton : {
			backgroundImage : '/img/black/btn_klaar_black.png',
			top : -35,
			right : 20,
			width : 128,
			height : 35
		},
		
		//
		//VIEWBACKGROUNDS 
		//
		personeelsKaartImg:{
			image : "/img/kaart.jpg",
			left : 'auto',
			right : 'auto',
			top : 200,
			width : 269,
			height : 194
		}

	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
