(function() {

	Smart.ui.createDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			//layout:'vertical'
		}));
		detailWin.addEventListener('open',function(){
			getDetail();
		});

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar,{
			text : Titanium.App.selectedNaam
		}));
		detailWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;
		
		var scrollView = Titanium.UI.createScrollView(style.scrollView);

		function getDetail() {
			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/smartsell/get_itemdetail.php");
			Titanium.API.info(Titanium.App.selectedIndex);
			var params = {
				linkId : Titanium.App.selectedIndex
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem === false) {
						Titanium.API.info(this.responseText);
						var lblNoLink = Titanium.UI.createLabel(Smart.combine(style.textError,{
							text : 'Deze link heeft nog geen producten.',
							top : 30
						}));
						detailWin.add(lblNoLink);

					} else {
						for(var i = 0, j = detail.length; i < j; i++) {
							Titanium.App.i = i;
						
							var pTitel = detail[i].pMerk + ' ' + detail[i].pTitel;
							var pFoto = detail[i].pFoto;
							var pBeschrijving = detail[i].pBeschrijving;
							var pPrijs = detail[i].pPrijs;
							Ti.App.geldigVan = detail[i].pStart;
							Ti.App.geldigTot = detail[i].pStop;
						

							var bgView = Titanium.UI.createView(style.bgProduct);

							var cropView = Titanium.UI.createView({
								width : 100,
								height : 100,
								borderColor : '#B6AFA9',
								backgroundColor : '#fff'
							});

							var baseImg = Titanium.UI.createImageView({
								image : pFoto
							});
							cropView.add(baseImg);

							var croppedImage = cropView.toImage();

							var imageView = Titanium.UI.createImageView({
								image : croppedImage,
								width : 100,
								height : 100,
								left : 20,
								top : 45
							});

							var titel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle,{
								text : pTitel
							}));
							
							var delete_btn = Titanium.UI.createLabel(Smart.combine(style.textDelete,{
								text : 'X'
							}));
							bgView.add(delete_btn);
							delete_btn.addEventListener('click',function(){
								
							});

							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription,{
								text:pBeschrijving
							}));
							
							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice,{
								text : '€ ' + pPrijs
							}));
							bgView.add(titel);
							
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);

							//detailWin.add(bgView);
							scrollView.add(bgView);
						};
						
						var hoofdProductLabel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle,{
							text:'Hoofdproduct',
							top:20
						}));
						scrollView.add(hoofdProductLabel);
						
						var geldigVanLabel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle,{
							text:'Geldig van',
							top:20
						}));
						scrollView.add(geldigVanLabel);
						
						
						var geldigVanInput = Titanium.UI.createTextField(Smart.combine(style.inputField,{
							top : 10,
							value : Ti.App.geldigVan
						}));
						if(Ti.App.geldigVan===null){
							geldigVanInput.hintText="Geef datum in"
						}
						scrollView.add(geldigVanInput);
						
						var geldigTotLabel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle,{
							text:'Geldig tot',
							top:20
						}));
						scrollView.add(geldigTotLabel);
						
						var geldigTotInput = Titanium.UI.createTextField(Smart.combine(style.inputField,{
							top : 10,
							value : Ti.App.geldigTot
						}));
						if(Ti.App.geldigTot===null){
							geldigTotInput.hintText="Geef datum in"
						}
						scrollView.add(geldigTotInput);
						
						var verwijderenButton = Titanium.UI.createButton(style.verwijderenButton);
						scrollView.add(verwijderenButton);
					
						verwijderenButton.addEventListener('click', function() {
							var deleteReq = Titanium.Network.createHTTPClient();
							deleteReq.open("GET", "http://localhost/smartsell/post_removelink.php");
							deleteReq.timeout = 5000;
							deleteReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if(response.remove === true) {
										Titanium.API.info('Remove link: ' + this.responseText);

									} else {
										alert('Link kan niet verwijderd worden.');
									}
								} catch(e) {
									alert(e);
								}
							};

							var params = {
								linkId : Titanium.App.selectedIndex
							};
							deleteReq.send(params);
							Smart.navGroup.close(detailWin, {
								animated : false
							});
						});
						var klaarButton = Titanium.UI.createButton(style.klaarButton);
						scrollView.add(klaarButton);
					
						klaarButton.addEventListener('click', function() {
							
							var updateReq = Titanium.Network.createHTTPClient();
							updateReq.open("GET", "http://localhost/smartsell/post_updatelink.php");
							updateReq.timeout = 5000;
							updateReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if(response.update === true) {
										Titanium.API.info('Update link: ' + this.responseText);

									} else {
										alert('Link kan niet geüpdatet worden.');
									}
								} catch(e) {
									alert(e);
								}
							};

							var params = {
								linkId : Titanium.App.selectedIndex,
								linkStart :geldigVanInput.value ,
								linkStop:geldigTotInput.value
							};
							updateReq.send(params);
							Smart.navGroup.close(detailWin, {
								animated : false
							});
						});
		
					}

				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		};
		
		
		detailWin.add(scrollView);

		return detailWin;
	};
})();
