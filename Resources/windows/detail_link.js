(function() {

	Smart.ui.createDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(Smart.combine(style.Window,{
			layout:'vertical'
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
						
							var pTitel = detail[i].pMerk + ' ' + detail[i].pTitel;
							var pFoto = detail[i].pFoto;
							var pBeschrijving = detail[i].pBeschrijving;
							var pPrijs = detail[i].pPrijs

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
							delete_btn.addEventListener('click',function(){
								
							});

							var beschrijving = Titanium.UI.createLabel(Smart.combine(style.textProductDescription,{
								text:pBeschrijving
							}));
							
							var prijs = Titanium.UI.createLabel(Smart.combine(style.textProductPrice,{
								text : '€ ' + pPrijs
							}));
							bgView.add(titel);
							bgView.add(delete_btn);
							bgView.add(imageView);
							bgView.add(beschrijving);
							bgView.add(prijs);

							detailWin.add(bgView);
						//data.push(row);
						};
						
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
