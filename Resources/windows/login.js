    var win = Titanium.UI.currentWindow;  
      
      //label
 	   var labelPersoneelskaart = Titanium.UI.createLabel({
    	color:'#888',
		text:'Scan de barcode van uw personeelskaart om in te loggen.',
		left: 10,
		top:-350,
		font:{
			fontSize:15,
			fontFamily:'Bree Serif'
			},
		textAlign:'left',
		width:'250'
    	
    })
    
    win.add(labelPersoneelskaart);
    
    //foto personeelskaart
    var afbPersoneelskaart = Titanium.UI.createImageView({
    	image:"/img/personeelskaart.png",
    	left:30,
    	top: 60,
    	width:247,
    	height:181
    	
    	
    })
    
    win.add(afbPersoneelskaart); 
    
    
    //label
    var labelPersoneelsnummer = Titanium.UI.createLabel({
    	color:'#888',
		text:'Inloggen via scannen lukt niet? Log hier in.',
		left: 10,
		top:140,
		font:{
			fontSize:15,
			fontFamily:'Bree Serif'
			},
		textAlign:'left',
		width:'290'
    	
    })
    
    win.add(labelPersoneelsnummer);
    
    
    //inputveld
    var personeelNummer = Titanium.UI.createTextField({  
        color : '#888',  
        top:300,  
        left:10,  
        width:300,  
        height:40,  
        //width : widthTxtField,
		height : 40,
		hintText : 'Personeelsnummer',
		font : {
			fontSize : 15,
			fontFamily : 'Bree Serif'
		},
		opacity : 0.65,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS  
    });  
    win.add(personeelNummer);  
      
    //loginbutton
    var loginBtn = Titanium.UI.createButton({
    	backgroundImage : '/img/btn_inloggen.png',  
        title:'Inloggen',  
        top:360,
        right:10,  
        width:90,  
        height:35,  
        borderRadius:1,  
        font:{
        	fontFamily:'Bree Serif',
        	fontWeight:'bold',
        	fontSize:14}  
    });  
    win.add(loginBtn);  
    
    
    
    
    
    
	//request
	var loginReq = Titanium.Network.createHTTPClient();  
  
  
    //json response
    loginReq.onload = function()  
    {  
        var json = this.responseText;  
        var response = JSON.parse(json);  
        if (response.logged == true)  
        {  
            //alert("Welcome " + response.personeelNummer + ".");  
            personeelNummer.blur();   
	        Ti.App.fireEvent('grantEntrance', {  
           	 	personeelNummer:response.personeelNummer  
        	}); 	 
       	 	win.close();
        }  
        else  
        {  
            alert(response.message);  
        }  
    };  
  
  
  	//verbinding met phpfile en database
	loginBtn.addEventListener('click',function(e)  
	{  
	    if (personeelNummer.value != '')  
	    {  
	        loginReq.open("POST","http://localhost/AuthSmartsell/post_auth.php");  //aanpassen!!!
	        var params = {  
	            personeelNummer: personeelNummer.value,   
	        };  
	        loginReq.send(params);  
	    }  
	    else  
	    {  
	        alert("Gelieve uw personeelskaart te scannen of uw personeelsnummer in te geven.");  
	    }  
	});