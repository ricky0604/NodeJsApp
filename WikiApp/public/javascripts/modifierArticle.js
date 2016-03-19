
function verificationChampTitre(){
	var data = {};
	data.id = getId();

	var element = document.getElementById('titre');
	if(element.value === ''){
		element.style.backgroundColor = 'red';
		document.getElementById('messageTitre').innerHTML = "Titre vide !";
		document.getElementById('messageTitre').style.color = 'red';
		return false;

	} else {
		element.style.backgroundColor = 'white';
		document.getElementById('messageTitre').style.color = 'black';
		document.getElementById('messageTitre').innerHTML = "";
		data.titre = element.value;
		var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/admin/updateTitre", true);
        xhr.onreadystatechange = function(infoConnection) {
	        if (xhr.readyState === 4 && xhr.status === 200) {
		        document.getElementById('messageTitre').innerHTML = "Titre Sauvegarder";
		        console.log("on a une reponse 200");
		    } else if (xhr.readyState === 4 && xhr.status !== 200){
		    	document.getElementById('messageTitre').innerHTML = "Titre non sauvagarder";
		    }
	    };
		var json = JSON.stringify(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
	}
}


function verificationChampAuteur(){
	var data = {};
	data.id = getId();

	var element = document.getElementById('auteur');
	if(element.value === ''){
		element.style.backgroundColor = 'red';
		document.getElementById('messageAuteur').innerHTML = "nom Auteur vide !";
		document.getElementById('messageAuteur').style.color = 'red';
		return false;

	} else {
		element.style.backgroundColor = 'white';
		document.getElementById('messageAuteur').style.color = 'black';
		document.getElementById('messageAuteur').innerHTML = "";
		data.auteur = element.value;
		var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/admin/updateAuteur", true);
        xhr.onreadystatechange = function(infoConnection) {
	        if (xhr.readyState === 4 && xhr.status === 200) {
		        document.getElementById('messageAuteur').innerHTML = "Auteur Sauvegarder";
		        console.log("on a une reponse 200");
		    } else if (xhr.readyState === 4 && xhr.status !== 200){
		    	document.getElementById('messageAuteur').innerHTML = "Auteur non sauvagarder";
		    }
	    };
		var json = JSON.stringify(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
	}
}



function verificationChampTexte(){
	var data = {};
	data.id = getId();

	var element = document.getElementById('texte');
	if(element.value.trim() === ''){
		element.style.backgroundColor = 'red';
		document.getElementById('messageTexte').innerHTML = "Texte vide !";
		document.getElementById('messageTexte').style.color = 'red';
		return false;

	} else {
		element.style.backgroundColor = 'white';
		document.getElementById('messageTexte').style.color = 'black';
		document.getElementById('messageTexte').innerHTML = "";
		data.texte = formaterParagraphe();
		var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/admin/updateTexte", true);
        xhr.onreadystatechange = function(infoConnection) {
	        if (xhr.readyState === 4 && xhr.status === 200) {
		        document.getElementById('messageTexte').innerHTML = "Texte Sauvegarder";
		        console.log("on a une reponse 200");
		    } else if (xhr.readyState === 4 && xhr.status !== 200){
		    	document.getElementById('messageTexte').innerHTML = "Texte non sauvagarder";
		    }
	    };
		var json = JSON.stringify(data);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
	}
}


function deletePost(){
	var data = {};
	data.id = getId();
	var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/admin/delete", true);
    xhr.onreadystatechange = function(infoConnection) {
        if (xhr.readyState === 4 && xhr.status === 200) {
	        var article = document.getElementById('article');
	        var button = document.getElementById('supprimer');
	        var body = document.getElementById('page');
	        var pageTitre = document.getElementById('pageTitre');
	        var consulter = document.getElementById('consulter');
	        body.removeChild(article);
	        body.removeChild(button);
	        body.removeChild(pageTitre);
	        body.removeChild(consulter);
	        document.getElementById('messageDelete').innerHTML = "Article Supprimé";
	        console.log("on a une reponse 200");
	    } else if (xhr.readyState === 4 && xhr.status !== 200){
	    	document.getElementById('messageDelete').innerHTML = "Article non supprimé";
	    }
    };
	var json = JSON.stringify(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(json);
	
}



function getId(){
	var urlTab = window.location.href.split('/');
	var tailleURL = urlTab.length;
	return urlTab[tailleURL - 1];
}

function formaterParagraphe(){

	var text = document.getElementById('texte').value.trim();
	var tab = text.split('\n\n');
	var result = "";
		for(var i = 0 ; i < tab.length ; i++){
			var temp = ""
			if(tab[i].indexOf("<p>") === -1 && tab.length > 1){
		        temp = "<p>"+tab[i]+"</p>";
		        result = result + temp;
		    } else {
		    	temp = tab[i];
		        result = result + temp;
		    }
	        console.log(result);
		}

		return result.trim();
}