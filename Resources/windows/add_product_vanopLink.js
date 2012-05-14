(function() {

	Smart.ui.createAddProductVanOpLinkWindow = function() {
		var addProductWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			layout:'vertical'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : 'Voeg product toe'
		}));
		addProductWin.setTitleControl(lblTitle);
		addProductWin.addEventListener('open',function(){
			Ti.API.info('Product toevoegen vanop overzicht link.');
		});
		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(addProductWin, {
				animated : false
			});
		});
		addProductWin.leftNavButton = backButton;

		var linkProduct1 = Titanium.UI.createTextField(Smart.combine(style.inputField,{
			top : 10,
			hintText : 'Product barcode'
		}));
		addProductWin.add(linkProduct1);


		var btnAddProduct = Titanium.UI.createButton(style.voegToeButton);
		addProductWin.add(btnAddProduct);


		btnAddProduct.addEventListener('click', function(e) {
			if(linkProduct1.value != '') {
				addProduct();
			} else {
				alert('Gelieve een barcode in te vullen.');
			}
		});
		
		function addProduct() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				createReq.open("POST", "http://localhost/smartsell/post_addproduct.php");
			}else{
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addproduct.php");
			}
			

			var params = {
				productId : linkProduct1.value,
				linkId:Ti.App.linkId
			};

			createReq.onload = function() {
				try {
					var json = this.responseText;
					var response = JSON.parse(json);
					Ti.API.info('Product toevoegen: '+response);
					if(response.noProduct===true){
						alert('Product niet gevonden. Probeer opnieuw.');
					}else{
						if(response.add === true) {
							Titanium.API.info('Add product: ' + this.responseText);
							Ti.App.fireEvent('app:reloadDetail', {
								action : 'Reload detail'
							});
							Smart.navGroup.close(addProductWin, {
								animated : false
							});
							Smart.navGroup.open(Smart.ui.createDetailWindow(), {
									animated : false
							});
						} else {
							alert('Product kan niet worden toegevoegd.');
						}
					}
					
				} catch(e) {
					alert(e);
				}
			};
			createReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + JSON.parse(this.responseText));
				alert('Er is iets mis met de databank.');
			}

			createReq.send(params);
		};
		
		return addProductWin;
	};
})();
