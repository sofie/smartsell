(function() {

	Smart.ui.createDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(style.Window);

		var lblTitle = Titanium.UI.createLabel(Smart.combine(style.titleBar, {
			text : Titanium.App.selectedNaam
		}));
		detailWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(style.backButton);

		backButton.addEventListener('click', function() {
			Smart.navGroup.close(detailWin, {
				animated : false
			});
			Smart.ui.createApplicationMainWin();
		});
		detailWin.leftNavButton = backButton;

		var addButton = Titanium.UI.createButton(style.addButton);

		addButton.addEventListener('click', function() {
			Ti.include("/config/barcode.js");
		
			Ti.API.debug(JSON.stringify(config));
			TiBar.scan({
				configure : config,
				success : function(data) {
					Ti.App.productBarcode=data.barcode;
					addProduct();
					Ti.API.info('TiBar success callback!');
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
		detailWin.rightNavButton = addButton;

		getDetail();

		Titanium.App.addEventListener('app:reloadProducts', function(e) {
			getDetail();
		});
		Titanium.App.addEventListener('app:reloadProductsStar', function(e) {
			getDetail();
			Ti.App.van.value="";
			Ti.App.tot.value="";
		});

		function getDetail() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();

			if (Ti.App.localonline === "local") {
				getReq.open("GET", "http://localhost/smartsell/get_linkdetail.php");
			} else {
				getReq.open("GET", "http://sofiehendrickx.eu/smartsell/get_linkdetail.php");
			}
			var params = {
				linkId : Titanium.App.selectedIndex
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if (detail.getItem === false) {
						Titanium.API.info('Nog geen links ' + this.responseText);
						var lblNoLink = Titanium.UI.createLabel(Smart.combine(style.textError, {
							text : 'Deze link heeft nog geen producten.',
							top : 30
						}));
						detailWin.add(lblNoLink);

					} else {
						var scrollView = Titanium.UI.createView(style.scrollView);
						for (var i = 0, j = detail.length; i < j; i++) {
							Titanium.App.i = i;

							Ti.App.pTitle = detail[i].pMerk + ' ' + detail[i].pTitel;
							Ti.App.linkId = detail[i].linkId;
							var id = detail[i].id;
							Ti.App.pId = detail[i].pId;
							Ti.API.info('pId: ' + id + ',linkId: ' + Ti.App.linkId);
							var pBeschrijving = detail[i].pBeschrijving;
							var pPrijs = detail[i].pPrijs;
							var favourite = detail[i].hoofdProduct;
							Ti.App.geldigVan = detail[i].pStart;
							Ti.App.geldigTot = detail[i].pStop;
							
							
							
							var row = Ti.UI.createTableViewRow(style.rowDetail);

							var titel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
								text : Ti.App.pTitle,
								left : 45
							}));
							var star_btn = Titanium.UI.createLabel(style.starButton);
							if(favourite==Ti.App.pId){
								star_btn.backgroundImage='/img/star.png'
							}
							
							star_btn.addEventListener('click', function(e) {
								Ti.API.info('Favourite: '+ detail[e.index].pId);
								var updateReq = Titanium.Network.createHTTPClient();
								if (Ti.App.localonline === "local") {
									updateReq.open("GET", "http://localhost/smartsell/post_favourite.php");
								} else {
									updateReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_favourite.php");
								}
	
								updateReq.timeout = 5000;
								updateReq.onload = function() {
									try {
										var json = this.responseText;
										var response = JSON.parse(json);
										if (response.update === true) {
											Titanium.API.info('Update favourite: ' + this.responseText);
											
											Ti.App.fireEvent('app:reloadProductsStar', {
												action : 'Reload products'
											});
	
										} else {
											alert('Product kan niet gefavorite worden.');
										}
									} catch(e) {
										alert(e);
									}
								};
	
								var params = {
									productId:detail[e.index].pId,
									linkId:Titanium.App.selectedIndex
								};
								updateReq.send(params);
							});

							var delete_btn = Titanium.UI.createLabel(Smart.combine(style.textDelete, {
								text : 'X'
							}));

							delete_btn.addEventListener('click', function(e) {
								var alertDialog = Ti.UI.createAlertDialog({
									title : 'Product verwijderen',
									message : detail[e.index].pMerk + ' uit link verwijderen?',
									buttonNames : ['OK', 'Annuleer']
								});
								alertDialog.show();

								alertDialog.addEventListener('click', function(ev) {
									if (ev.index == 0) {// "Ok"
										var deleteProdReq = Titanium.Network.createHTTPClient();
										if (Ti.App.localonline === "local") {
											deleteProdReq.open("GET", "http://localhost/smartsell/removeproduct.php");
										} else {
											deleteProdReq.open("GET", "http://sofiehendrickx.eu/smartsell/removeproduct.php");
										}

										deleteProdReq.timeout = 5000;
										deleteProdReq.onload = function() {
											try {
												var json = this.responseText;
												var response = JSON.parse(json);
												if (response.remove === true) {
													Titanium.API.info('Remove product: ' + this.responseText);

													Ti.App.fireEvent('app:reloadProducts', {
														action : 'Reload products'
													});

												} else {
													alert('Product kan niet verwijderd worden.');
												}
											} catch(e) {
												alert(e);
											}
										};

										var params = {
											linkId : Titanium.App.selectedIndex,
											productId : detail[e.index].pId
										};
										deleteProdReq.send(params);
									}
								});
							});

							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription, {
								text : pBeschrijving
							}));

							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice, {
								text : '€ ' + pPrijs
							}));

							row.add(delete_btn);
							row.add(star_btn);
							row.add(titel);
							row.add(beschrijving);
							row.add(prijs);
							row.className = 'item' + i;
							data[i] = row;

						};
						var listLinks = Titanium.UI.createTableView(Smart.combine(style.tableView, {
							data : data,
							bottom : 230
						}));
						detailWin.add(listLinks);

						//
						//Update link
						//
						var geldigVanLabel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
							text : 'Geldig van',
							top : 40
						}));
						scrollView.add(geldigVanLabel);

						var geldigVanInput = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 0,
							value : Ti.App.geldigVan,
							editable : false
						}));
						Ti.App.van=geldigVanInput;

						geldigVanInput.addEventListener('focus', function() {
							geldigVanInput.blur();
							var pickerView = Ti.UI.createView({
								width : '100%',
								height : '100%',
								top : 0,
								left : 0,
								backgroundColor : 'black',
								opacity : 0.82
							});
							
							var value = new Date();
							value.setFullYear(value.getFullYear());
							value.setMonth(value.getMonth());
							value.setDate(value.getDate()-1);

							var picker = Ti.UI.createPicker({
								type : Ti.UI.PICKER_TYPE_DATE,
								minDate : new Date(2012, 1, 1),
								value : value
							});

							// turn on the selection indicator (off by default)
							picker.selectionIndicator = true;

							var pickerKlaarButton = Titanium.UI.createButton({
								backgroundImage : '/img/btn_klaar.png',
								bottom : 15,
								right : 20,
								width : 128,
								height : 37
							});
							var annulerenButton = Titanium.UI.createButton(Smart.combine(style.verwijderenButton,{
								top:365,
								backgroundImage : '/img/btn_annuleren.png',
							}));
							
							pickerView.add(picker);
							pickerView.add(annulerenButton);
							pickerView.add(pickerKlaarButton);
							detailWin.add(pickerView);
							
							picker.addEventListener('change',function(e){
								var pickerdate = e.value;
								Ti.App.pickerDate=e.value;
							 
							    var day = pickerdate.getDate();
							    day = day.toString();
							    if (day.length < 2) {
							        day = '0' + day;
							    }
							     Ti.App.day=day;
							    
							    var month = pickerdate.getMonth();
							    month = month + 1;
							    month = month.toString();
							    if (month.length < 2) {
							        month = '0' + month;
							    }
							    Ti.App.month=month;
							 
							    var year = pickerdate.getFullYear();
							    Ti.App.inputDate = year + "-" + month + "-" + day+" 00:00:00";
							});
							
							pickerKlaarButton.addEventListener('click',function(e){
					            geldigVanInput.setValue(''+ Ti.App.inputDate);
					            detailWin.remove(pickerView);
					       });
					       annulerenButton.addEventListener('click',function(e){
					       		 detailWin.remove(pickerView);
					       });

						});
						if (Ti.App.geldigVan === null) {
							geldigVanInput.hintText = "Geef datum in"
						}
						scrollView.add(geldigVanInput);

						var geldigTotLabel = Titanium.UI.createLabel(Smart.combine(style.textProductTitle, {
							text : 'Geldig tot',
							top : 15
						}));
						scrollView.add(geldigTotLabel);

						var geldigTotInput = Titanium.UI.createTextField(Smart.combine(style.inputField, {
							top : 0,
							value : Ti.App.geldigTot
						}));
						Ti.App.tot=geldigTotInput;
						
						geldigTotInput.addEventListener('focus', function() {
							geldigTotInput.blur();
							var pickerView = Ti.UI.createView({
								width : '100%',
								height : '100%',
								top : 0,
								left : 0,
								backgroundColor : 'black',
								opacity : 0.82
							});
							
							var value = new Date();
							value.setFullYear(value.getFullYear());
							value.setMonth(value.getMonth());
							value.setDate(value.getDate());

							var picker = Ti.UI.createPicker({
								type : Ti.UI.PICKER_TYPE_DATE,
								minDate : new Date(2012, Ti.App.month-1, Ti.App.day),
								value : value
							});

							// turn on the selection indicator (off by default)
							picker.selectionIndicator = true;

							var pickerKlaarButton = Titanium.UI.createButton({
								backgroundImage : '/img/btn_klaar.png',
								bottom : 15,
								right : 20,
								width : 128,
								height : 37
							});
							var annulerenButton = Titanium.UI.createButton(Smart.combine(style.verwijderenButton,{
								top:365,
								backgroundImage : '/img/btn_annuleren.png',
							}));
							
							pickerView.add(picker);
							pickerView.add(pickerKlaarButton);
							pickerView.add(annulerenButton);
							detailWin.add(pickerView);
							
							picker.addEventListener('change',function(e){
								var pickerdate = e.value;
							 
							    var day = pickerdate.getDate();
							    day = day.toString();
							    if (day.length < 2) {
							        day = '0' + day;
							    }
							    
							    var month = pickerdate.getMonth();
							    month = month + 1;
							    month = month.toString();
							    if (month.length < 2) {
							        month = '0' + month;
							    }
							 
							    var year = pickerdate.getFullYear();
							    Ti.App.inputDate = year + "-" + month + "-" + day+" 00:00:00";
							});
							
							pickerKlaarButton.addEventListener('click',function(e){
								if(Ti.App.inputDate==undefined){
									Ti.App.inputDate="Geef datum opnieuw in."
								}
					            geldigTotInput.setValue(''+ Ti.App.inputDate);
					            detailWin.remove(pickerView);
					       });
					       annulerenButton.addEventListener('click',function(e){
					       		 detailWin.remove(pickerView);
					       });
						});
						
						if (Ti.App.geldigTot === null) {
							geldigTotInput.hintText = "Geef datum in"
						}
						scrollView.add(geldigTotInput);

						var verwijderenButton = Titanium.UI.createButton(style.verwijderenButton);
						scrollView.add(verwijderenButton);

						verwijderenButton.addEventListener('click', function() {
							var deleteReq = Titanium.Network.createHTTPClient();
							if (Ti.App.localonline === "local") {
								deleteReq.open("GET", "http://localhost/smartsell/post_removelink.php");
							} else {
								deleteReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_removelink.php");
							}

							deleteReq.timeout = 5000;
							deleteReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if (response.remove === true) {
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
							height : 20,
							width : 320,
							top : 0
						});
						scrollView.add(space);

						klaarButton.addEventListener('click', function() {

							var updateReq = Titanium.Network.createHTTPClient();
							if (Ti.App.localonline === "local") {
								updateReq.open("GET", "http://localhost/smartsell/post_updatelink.php");
							} else {
								updateReq.open("GET", "http://sofiehendrickx.eu/smartsell/post_updatelink.php");
							}

							updateReq.timeout = 5000;
							updateReq.onload = function() {
								try {
									var json = this.responseText;
									var response = JSON.parse(json);
									if (response.update === true) {
										Titanium.API.info('Update link: ' + this.responseText);
										detailWin.close();
										Smart.ui.createApplicationMainWin();

									} else {
										alert('Link kan niet geüpdatet worden.');
									}
								} catch(e) {
									alert(e);
								}
							};

							var params = {
								linkId : Titanium.App.selectedIndex,
								linkStart : geldigVanInput.value,
								linkStop : geldigTotInput.value
							};
							updateReq.send(params);
							
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
		function addProduct() {
			var createReq = Titanium.Network.createHTTPClient();
			if(Ti.App.localonline==="local"){
				createReq.open("POST", "http://localhost/smartsell/post_addproduct.php");
			}else{
				createReq.open("POST", "http://sofiehendrickx.eu/smartsell/post_addproduct.php");
			}
			

			var params = {
				productBarcode : Ti.App.productBarcode,
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
							Ti.App.fireEvent('app:reloadProducts', {
								action : 'Reload products'
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

		return detailWin;
	};
})();
