(function() {

	Smart.ui.createAddErrorWindow = function() {
		var addKoppelingWin = Titanium.UI.createWindow(Smart.combine(style.Window, {
			layout : 'vertical'
		}));

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : 'Voeg link toe'
		}));
		addKoppelingWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addKoppelingWin, {
				animated : false
			});
		});
		addKoppelingWin.leftNavButton = backButton;
		var lblError = Titanium.UI.createLabel(Smart.combine(style.textError, {
			text : 'De barcode die u gescand heeft is fout. Probeer het product opnieuw te scannen of geef de barcode hieronder in.',
			top : 10,
			height:60,
			right:20,
			left:20
		}));
		addKoppelingWin.add(lblError);
		
		var btnScanProduct = Titanium.UI.createButton(style.scanBarcodeButton);
		addKoppelingWin.add(btnScanProduct);
		btnScanProduct.addEventListener('click',function(e){
			Ti.include("/config/barcode.js");
		
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode=data.barcode;
					addLinkBarcode();
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
		
		var bg_lijn = Ti.UI.createView({
			width:280,
			height:11,
			left:20,
			top:20,
			opacity:0.6,
			backgroundImage:'img/of.png'
		});
		addKoppelingWin.add(bg_lijn);

		var barcodeProduct = Titanium.UI.createTextField(Smart.combine(style.inputField, {
			top : 20,
			hintText : 'Product barcode'
		}));
		addKoppelingWin.add(barcodeProduct);

		var btnAddProduct = Titanium.UI.createButton(style.maakLinkButton);
		addKoppelingWin.add(btnAddProduct);

		btnAddProduct.addEventListener('click', function(e) {
			addLink();
		});

		function addLinkBarcode() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				createReq.open("POST", "http://localhost/smartsell/post_addlink.php");
			}else{
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addlink.php");
			}
			

			var params = {
				linkProduct1 : Ti.App.productBarcode
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Ti.API.info("Add link: "+this.responseText);
					
					if(response.bestaatAl===true){
						alert('Link bestaat al.');
					}else{
						if(response.add === true) {
							Ti.App.fireEvent('app:reloadLinks', {
								action : 'Reload links'
							});
							
							Titanium.App.prodId = response.productId;
							Titanium.App.linkId=response.linkId;
							Titanium.App.linkNaam=response.linkNaam;
							
							Titanium.App.selectedNaam=response.linkNaam;
							Titanium.App.selectedIndex=response.linkId;
							
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						} else {
							Smart.navGroup.open(Smart.ui.createAddErrorWindow(), {
								animated : false
							});
							
						}
					}
					
					
				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};
		function addLink() {
			var createReq = Titanium.Network.createHTTPClient();
			if (Ti.App.localonline === "local") {
				createReq.open("POST", "http://localhost/smartsell/post_addlink.php");
			} else {
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addlink.php");
			}

			var params = {
				linkProduct1 : barcodeProduct.value
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Ti.API.info("Add link: " + this.responseText);

					if (response.bestaatAl === true) {
						alert('Link bestaat al.');
					} else {
						if (response.add === true) {
							Ti.App.fireEvent('app:reloadLinks', {
								action : 'Reload links'
							});
							Smart.navGroup.close(addKoppelingWin, {
								animated : false
							});
							Titanium.App.prodId = response.productId;
							Titanium.App.linkId = response.linkId;
							Titanium.App.linkNaam = response.linkNaam;
							
							Titanium.App.selectedNaam=response.linkNaam;
							Titanium.App.selectedIndex=response.linkId;

							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
								animated : false
							});
						} else {
							alert('Link kan niet toegevoegd worden.');
						}
					}

				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};

		return addKoppelingWin;
	};
})();
