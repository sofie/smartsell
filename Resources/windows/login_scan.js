(function() {
	var navWindow;

	Smart.ui.createScanWin = function() {

		var scanWindow = Titanium.UI.createWindow(Smart.combine(style.Window,{
			 tabBarHidden:true
		}));
		scanWindow.addEventListener('open', function() {
			Ti.API.info('Scan win open');
		});
/*
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(scanWindow, {
				animated : false
			});
		});
		scanWindow.leftNavButton = backButton;

		//
		//Navigationbar
		//
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Scan personeelskaart'
		}));
		scanWindow.setTitleControl(lblTitle);
*/
		// TiBar module
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

		scanWindow.addEventListener('open', function() {
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
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						Ti.UI.createAlertDialog({
							title : "Scan result",
							message : "Barcode: " + data.barcode + " Symbology:" + data.symbology
						}).show();
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
		return scanWindow;
	};
})();
