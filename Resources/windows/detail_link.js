(function() {

	Smart.ui.createDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(style.Window);
		detailWin.addEventListener('open',function(){
			Ti.API.info('Detail win open');
		
		});
		detailWin.addEventListener('blur',function(){
			Ti.API.info('Detail win blur');
		
		});
		detailWin.addEventListener('close',function(){
			Ti.API.info('Detail win close');
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
		
		var addButton = Titanium.UI.createButton(style.addButton);

		addButton.addEventListener('click', function() {
			Smart.navGroup.open(Smart.ui.createAddProductWindow(), {
				animated : false
			});
			
		});
		detailWin.rightNavButton = addButton;
		
		getDetail();
		
		Titanium.App.addEventListener('app:reloadDetail', function(e) {
			Ti.API.info('Reload detail');
			/*detailWin.close();*/
			getDetail();
			//detailWin.open();
		});

		function getDetail() {
			var getReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				getReq.open("GET", "http://localhost/smartsell/get_itemdetail.php");
			}else{
				getReq.open("GET", "http://sofiehendrickx.eu/smartsell/get_itemdetail.php");
			}
			Titanium.API.info('Selected link id: '+Titanium.App.selectedIndex);
			var params = {
				linkId : Titanium.App.selectedIndex
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem === false) {
						Titanium.API.info('Nog geen links '+this.responseText);
						var lblNoLink = Titanium.UI.createLabel(Smart.combine(style.textError,{
							text : 'Deze link heeft nog geen producten.',
							top : 30
						}));
						detailWin.add(lblNoLink);

					} else {
						var scrollView = Titanium.UI.createScrollView(style.scrollView);
						for(var i = 0, j = detail.length; i < j; i++) {
							Titanium.App.i = i;
						
							Ti.App.pTitle = detail[i].pMerk + ' ' + detail[i].pTitel;
							var pFoto = detail[i].pFoto;
							var id = detail[i].id;
							Ti.App.pId = detail[i].pId;
							Ti.API.info('pId: '+id+ ',pId: '+Ti.App.pId);
							var pBeschrijving = detail[i].pBeschrijving;
							var pPrijs = detail[i].pPrijs;
							Ti.App.geldigVan = detail[i].pStart;
							Ti.App.geldigTot = detail[i].pStop;
						

							var bgView = Titanium.UI.createView(style.bgProduct);

							var cropView = Titanium.UI.createView({
								width : 100,
								height : 100,
								borderColor : '#B6AFA9',
								backgroundColor : '#fff',
								borderWidth:0.5
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
								text : Ti.App.pTitle,
								left:45
							}));
							var star_btn = Titanium.UI.createButton(style.starButton);
							
							
							var delete_btn = Titanium.UI.createLabel(Smart.combine(style.textDelete,{
								text : 'X'
							}));
							
							delete_btn.addEventListener('click',function(){
								var alertDialog = Ti.UI.createAlertDialog({
									title : 'Product verwijderen',
									message : Ti.App.pTitle+' uit link verwijderen?',
									buttonNames : ['OK','Annuleer']
								});
								alertDialog.show();
								
								alertDialog.addEventListener('click', function(ev) {
								    if (ev.index == 0) { // "Ok"
										var deleteProdReq = Titanium.Network.createHTTPClient();
										if(Ti.App.localonline==="local"){
											deleteProdReq.open("GET", "http://localhost/smartsell/removeproduct.php");
										}else{
											deleteProdReq.open("GET", "http://sofiehendrickx.eu/smartsell/removeproduct.php");
										}
										
										deleteProdReq.timeout = 5000;
										deleteProdReq.onload = function() {
											try {
												var json = this.responseText;
												var response = JSON.parse(json);
												if(response.remove === true) {
													Titanium.API.info('Remove product: ' + this.responseText);
			
												} else {
													alert('Product kan niet verwijderd worden.');
												}
											} catch(e) {
												alert(e);
											}
										};
			
										var params = {
											linkId:Titanium.App.selectedIndex,
											productId : Ti.App.pId
										};
										deleteProdReq.send(params);
								    } 
								  });
								
								
								Ti.App.fireEvent('app:reloadDetail', {
									action : 'Reload detail'
								});
								
							});

							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription,{
								text:pBeschrijving
							}));
							
							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice,{
								text : '€ ' + pPrijs
							}));
							bgView.add(delete_btn);
							bgView.add(star_btn);
							bgView.add(titel);
							
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);

							scrollView.add(bgView);
						};
						star_btn.addEventListener('click',function(e){
								Ti.API.info('Product Id: '+detail[e.index].pId);
							});
						//
						//Update link
						//						
						
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
							if(Ti.App.localonline==="local"){
								deleteReq.open("GET", "http://localhost/smartsell/post_removelink.php");
							}else{
								deleteReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_removelink.php");
							}
							
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
							Smart.ui.createApplicationMainWin();
						});
						var klaarButton = Titanium.UI.createButton(style.klaarButton);
						scrollView.add(klaarButton);
						var space = Ti.UI.createView({
							height:20,
							width:320,
							top:0
						});
						scrollView.add(space);

					
						klaarButton.addEventListener('click', function() {
							
							var updateReq = Titanium.Network.createHTTPClient();
							if(Ti.App.localonline==="local"){
								updateReq.open("GET", "http://localhost/smartsell/post_updatelink.php");
							}else{
								updateReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_updatelink.php");
							}
							
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
						detailWin.add(scrollView);

		
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

		return detailWin;
	};
})();
