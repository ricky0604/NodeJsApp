function verification(){

	var checkTitre = verifierCaseVide('titre');
	var checkAuteur = verifierCaseVide('auteur');
	var checkTexte = verifierCaseVide('texte');
	var checkId = verifierCaseVide('id');

	var check_final = (checkTitre && checkAuteur && checkTexte && checkId);

    showErrorMessage(check_final);
    if(checkTexte){
    	formaterParagraphe('texte');
    }
	
	return check_final;

}


function showErrorMessage(code_verification){

	if(!code_verification){
		document.getElementById('error').style.display = 'block';
		document.getElementById('error').innerHTML = 'formulaire avec erreur';
		document.getElementById('error').style.color = 'red';
	} else {

		document.getElementById('error').style.display = 'none';
	}

}


function verifierCaseVide(id){

	var id_a_verifier = document.getElementById(id).value.trim();
    var result = false
    if (id_a_verifier){
    	result = true;
    } 
    return appliquerStyle(id, result);
}


function appliquerStyle(id , result){

	if(result){

		return appliquerCorrect(id);

	} else {

		return appliquerErreur(id);

	}

	return false;

}


function appliquerCorrect(id){

	var id_to_check = document.getElementById(id);
	id_to_check.style.backgroundColor = 'white';
	return true;

}

function appliquerErreur(id){

	var id_to_check = document.getElementById(id);
	id_to_check.style.backgroundColor = 'red';
	return false;
}


function formaterParagraphe(id){

	var text = document.getElementById(id).value.trim();
	var tab = text.split('\n\n');
	var result = "";
	if(tab.length > 1 ){
		for(var i = 0 ; i < tab.length ; i++){
	        var temp = "<p>"+tab[i]+"</p>";
	        result = result + temp;
	        console.log(result);
		}

		document.getElementById(id).value = result.trim();
	}
}