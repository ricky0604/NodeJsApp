var fs = require("fs");
var xmlDom = require("xmldom");

exports.getDossierPatient = function(res, noDossier){
	fs.readFile("dossierMedical.xml", function (err, data){
		var donnee = {};
		var tabAntecedant = [];
		var tabNotes = [];
		var tabVisites = [];
		var tabSuivi = [];

		if(err){
			console.log("ERROR reading XML document");
		} else {
			var domRoot = new xmlDom.DOMParser().parseFromString(data.toString());
			var dossierList = domRoot.getElementsByTagName('dossier');
			if(!dossierList.length) {
				console.log("la liste est vide ");
			} else {
				for (var i = 0; i < dossierList.length; i++) {
					var currentdossier = dossierList[i];
					if(currentdossier.getElementsByTagName('numeroDossier')[0].textContent === noDossier){
						var numeroDossier = currentdossier.getElementsByTagName('numeroDossier')[0].textContent;
						var nom = currentdossier.getElementsByTagName('nom')[0].textContent;
						var prenom = currentdossier.getElementsByTagName('prenom')[0].textContent;
						var sexe = currentdossier.getElementsByTagName('sexe')[0].textContent;
						var dateNaissance = currentdossier.getElementsByTagName('dateNaissance')[0].textContent;
						var dateOuverture = currentdossier.getElementsByTagName('dateOuverture')[0].textContent;
						var dateFermeture = currentdossier.getElementsByTagName('dateFermeture')[0].textContent;
						var numeroAssuranceMaladie = currentdossier.getElementsByTagName('numeroAssuranceMaladie')[0].textContent;
						var numeroTelephone = currentdossier.getElementsByTagName('numeroTelephone')[0].textContent;
						var adresse = currentdossier.getElementsByTagName('adresse')[0].textContent;
						var listAntecedant = currentdossier.getElementsByTagName('antecedantMedical');													
						for (var i1 = 0; i1 < listAntecedant.length; i1++) {
							var antecedant = {};
							antecedant.date = listAntecedant[i1].getElementsByTagName('date')[0].textContent;
							antecedant.description = listAntecedant[i1].getElementsByTagName('description')[0].textContent;
							tabAntecedant.push(antecedant);
						};
						var listNotes = currentdossier.getElementsByTagName('noteDossier');
						for (var i2 = 0; i2 < listNotes.length; i2++) {
							var notes = {};
							notes.date = listNotes[i2].getElementsByTagName('date')[0].textContent;
							notes.description = listNotes[i2].getElementsByTagName('description')[0].textContent;
							tabNotes.push(notes);
						};
						var listVisites = currentdossier.getElementsByTagName('visite');
						for (var i3 = 0; i3 < listVisites.length; i3++) {
							var visites = {};
							visites.date = listVisites[i3].getElementsByTagName('date')[0].textContent;
							visites.compteRendu = listVisites[i3].getElementsByTagName('compteRendu')[0].textContent;
							tabVisites.push(visites);
						};
						var listDeSuivis = currentdossier.getElementsByTagName('unSuivis');
						for (var i4 = 0; i4 < listDeSuivis.length; i4++) {
							var suivi = {};
							suivi.dateDactivation = listDeSuivis[i4].getElementsByTagName('dateDactivation')[0].textContent;
							suivi.description = listDeSuivis[i4].getElementsByTagName('description')[0].textContent;
							tabSuivi.push(suivi);
						};
					}
					
					
				}
					
			
			}
			

		}
			
		donnee.numeroDossier = numeroDossier;
		donnee.nom = nom;
		donnee.prenom = prenom;
		donnee.sexe = sexe;
		donnee.dateNaissance = dateNaissance;
		donnee.dateOuverture = dateOuverture;
		donnee.dateFermeture = dateFermeture;
		donnee.numeroAssuranceMaladie = numeroAssuranceMaladie;
		donnee.numeroTelephone = numeroTelephone;
		donnee.adresse = adresse;
		donnee.listAntecedant = tabAntecedant;
		donnee.listVisites = tabVisites;
		donnee.listNotes = tabNotes;
		donnee.listDeSuivis = tabSuivi;
		res.render('medicalDossier', donnee);
	});
}


	







