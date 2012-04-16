(function() {
	Smart.ui.theme = {
		greyColor : '#464646',
		blueColor:'#DEE7CD',
		darkGreyColor: '#474747',
		darkBlue : '#2F6885',
		font : {
			fontFamily : 'Arial'
		}
	};

	Smart.ui.properties = {
		platformWidth : Ti.Platform.displayCaps.platformWidth,
		platformHeight : Ti.Platform.displayCaps.platformHeight,

		Window : {
			width : '100%',
			backgroundColor : '#fff',
			tabBarHidden : true
		},
		DetailWindow : {
			width : '100%',
			backgroundImage:'img/bg.png',
			tabBarHidden : true,
			bottom:40
		},
		tabGroup:{
			backgroundColor : '#fff'
		},
		scrollView : {
			contentWidth : 'auto',
			contentHeight : 'auto',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			top : 0,
			bottom : 0
		},

		//
		// BUTTONS
		//
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 53,
			height : 22
		},
		searchButton : {
			backgroundImage : "img/btn_zoek.png",
			width : 53,
			height : 22
		},
		refreshButton : {
			backgroundImage : "img/btn_refresh.png",
			width : 50,
			height : 44
		},
		prevButton : {
			backgroundImage : 'img/prev.png',
			height : 14,
			width : 14,
			left : 20
		},
		nextButton : {
			backgroundImage : 'img/next.png',
			height : 14,
			width : 14,
			right : 20
		},

		//
		//IMAGEVIEWS
		//
		Img90 : {
			backgroundColor : '#fff',
			width : 105,
			height : 80,
			left : 0,
			top : 0
		},
		Img320 : {
			width : Ti.Platform.displayCaps.platformWidth,
			height : 175,
			top : 0,
			left : 0
		},

		SearchField : {
			color : '#b3b3b3',
			font : {
				fontFamily : 'Tahoma',
				fontSize : 14
			},
			returnKeyType : Titanium.UI.RETURNKEY_SEARCH,
			width : 265,
			height : 30,
			top : 7,
			left : 40,
		},

		//
		// VIEWS
		//
		TableView : {
			top : 0,
			left : 0,
			right : 0,
			bottom : 40,
			backgroundColor : '#fff'
		},
		TableViewSearch : {
			top : 44,
			left : 0,
			right : 0,
			bottom : 373,
			backgroundColor : '#fff',
			scrollable : true
		},
		tableViewRow : {
			rightImage : 'img/arrow.png',
			backgroundColor : '#fff',
			selectedBackgroundColor : '#B8DAE8',
			backgroundSelectedColor : '#B8DAE8',
			height : 100,
			bottom:65
		},
		tableViewRowNieuws : {
			rightImage : 'img/arrow.png',
			backgroundColor : '#fff',
			selectedBackgroundColor : '#B8DAE8',
			backgroundSelectedColor : '#B8DAE8',
			height : 'auto',
			bottom:65,
			layout : 'vertical'
		},

		searchBar : {
			backgroundImage : 'img/bg_search.png',
			width : Ti.Platform.displayCaps.platformWidth,
			height : 43,
			top : 0,
			left : 0
		},
		toolBar : {
			width : Ti.Platform.displayCaps.platformWidth,
			height : 25,
			top : 0,
			backgroundImage : 'img/toolbar.png'
		},
		viewTitleBg : {
			width : 300,
			backgroundColor : '#ffffff',
			height : 35,
			left:20,
			top : 0,
			right : 0
		},
		
		viewBlue : {
			width:250,
			height:10,
			backgroundColor: '#dee7cd',
			bottom:0,
			left:0
		},				
		footerView : {
			backgroundColor : '#fff',
			height : 40,
			left : 20,
			right : 0,
			top : -15,
			bottom : 10
		},
		webViewDescription : {
			backgroundColor : 'transparent',
			touchEnabled : false,
			width : 270,
			height : 'auto',
			top : 5,
			left:22
		},
		webViewFeed : {
			width : 440,
			left : 0,
			top : 25,
			bottom : 40
		},
		
		//
		// LABELS
		//
		titleBar : {
			color : '#474747',
			font : {
				fontSize : 22,
				fontFamily : 'Arial',
				fontWeight : 'bold'
			}
		},

		//TAB1
		titleNaam : {
			left : 115,
			top : 3,
			width : 190,
			height : 15,
			textAlign : 'left',
			color : '#464646',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : 14
			}
		},
		textPerformers : {
			left : 115,
			top : 20,
			width : 190,
			height : 15,
			textAlign : 'left',
			color : '#2F6885',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : 14
			}
		},
		textDescription : {
			bottom : 48,
			left : 115,
			width : 190,
			height : 14,
			textAlign : 'left',
			color : '#464646',
			font : {
				fontFamily : 'Arial',
				fontSize : 13
			}
		},
		textHeading : {
			left : 115,
			right:10,
			bottom : 32,
			height : 14,
			textAlign : 'left',
			color : '#2F6885',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : 13
			}
		},
		titleDetail : {
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 17,
				fontWeight:'bold'
			},
			color : '#464646',
			width : 280,
			height : 25,
			top : -30,
			left : 30
		},
		textBlueBold : {
			textAlign : 'left',
			color : '#2F6885',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : 13
			},
			width : 'auto',
			height : 'auto',
			left : 30,
			right : 'auto',
			top:0
		},
		textGreyBold : {
			textAlign : 'left',
			color : '#464646',
			font : {
				fontFamily : 'Arial',
				fontWeight : 'bold',
				fontSize : 13
			},
			width : 280,
			height : 'auto',
			left : 30,
			top:15,
			right : 'auto'
		},
		textPrice : {
			textAlign : 'left',
			color : '#464646',
			font : {
				fontFamily : 'Arial',
				fontSize : 12
			},
			width : 'auto',
			height : 'auto',
			left : 30,
			right : 'auto',
			top:0
		},
		textTickets1Lijn : {
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 12,
				fontWeight: 'bold'
			},
			color : '#2D6883',
			top : -17,
			right : 40,
			bottom : 40,
			width : 'auto',
			height : 'auto'
		},
		textTicketsPijl1Lijn:{
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 14
			},
			color : '#464646',
			top : -15,
			right :30,
			width : 'auto',
			height : 'auto'
		},	
		textTickets2Lijnen : {
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 12,
				fontWeight: 'bold'
			},
			color : '#2D6883',
			top : -17,
			right : 40,
			bottom : 40,
			width : 'auto',
			height : 'auto'
		},
		textTicketsPijl2Lijnen:{
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 14
			},
			color : '#464646',
			top : -33,
			right :30,
			width : 'auto',
			height : 'auto'
		},		
		textFooter : {
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 11
			},
			color : '#464646'
		},
		textInstruction : {
			width : 'auto',
			font : {
				fontFamily : 'Arial',
				fontSize : 13
			},
			color : '#555',
			left : 20,
			right : 20,
			height : 40,
			top : 60
		},

		//TAB2
		titleFeeds : {
			height : 50,
			width : 270,
			left : 20,
			top : 5,
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 18
			}
		},
		textFeed : {
			color : '#000',
			textAlign : 'left',
			top : 5,
			left : 20,
			height : 50,
			width : 270,
			font : {
				fontFamily : 'Arial',
				fontSize : 11
			}
		},
		feedDate : {
			color : '#000',
			textAlign : 'left',
			font : {
				fontFamily : 'Arial',
				fontSize : 11,
				fontWeight : 'bold'
			},
			height : 'auto',
			width : 270,
			top : 5,
			left : 20,
			bottom : 8
		},

		//
		//ACTIVITYINDICATOR
		//
		backgroundView : {
			backgroundColor : '#000',
			height : '100%',
			width : '100%',
			opacity : 0.6
		},
		activityIndicator : {
			style : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			color : '#fff',
			font : {
				fontFamily:'Arial',
				fontSize : 14
			}
		}

	};
})();

//Shortcut for UI properties
var style = Smart.ui.properties;
