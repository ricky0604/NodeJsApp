var fs = require("fs");
var xmlDom = require("xmldom");
var underScore = require("underscore");

exports.createMedicalFolder = function(res, dataPost){
	
	fs.readFile("dossierMedical.xml", function (err, data){
		if(err){
			console.log("ERROR reading XML document");
		} else {
			var domRoot = new xmlDom.DOMParser().parseFromString(data.toString());

			//
			var nomUser = dataPost.nom.toUpperCase();
			var prenomUser = dataPost.prenom.toUpperCase();
			var sexeUser = dataPost.sexe;
			var dateNaissanceUser = dataPost.anneeNaissance+'-'+dataPost.moisNaissance+'-'+dataPost.jourDeNaissance;
			var numeroAssuranceMaladieUser = dataPost.assuranceMaladie;
			var numeroTelephoneUser = dataPost.numeroDeTelephone;
			var adresseUser = dataPost.adresse;
			var antecedantMedicalDescription = dataPost.decriptionMedical;
			var antecedantMedicalDate = dataPost.anneeAntecedant+'-'+dataPost.moisAntecedant+'-'+dataPost.jourAntecedant;
			//

			var dossierList = domRoot.getElementsByTagName('dossier');
			var dossierMedicalComplet = domRoot.getElementsByTagName('dossierMedical')[0];
			var nombreDeDossier = dossierList.length;
			var numeroDeDossier = nombreDeDossier + 1;
			//
			var nodeDossier = domRoot.createElement('dossier');
			var nodeNumeroDossier = domRoot.createElement('numeroDossier');
			var nodePatient = domRoot.createElement('patient');
			var nodeNom = domRoot.createElement('nom');
			var nodePrenom = domRoot.createElement('prenom');
			var nodeSexe = domRoot.createElement('sexe');
			var nodeDateNaissance = domRoot.createElement('dateNaissance');
			var nodeDateDOuverture = domRoot.createElement('dateOuverture');
			var nodeDateFermeture = domRoot.createElement('dateFermeture');
			var nodeNumeroAssuranceMaladie = domRoot.createElement('numeroAssuranceMaladie');
			var nodeNumeroTelephone = domRoot.createElement('numeroTelephone');
			var nodeAdresse = domRoot.createElement('adresse');
			var nodeAntecedantMedicaux = domRoot.createElement('antecedantMedicaux');
			var nodeAntecedantMedical = domRoot.createElement('antecedantMedical');
			var nodeDateAntecedant = domRoot.createElement('date');
			var nodeDescriptionAntecedant = domRoot.createElement('description');
			var nodeLesNotesDossiers = domRoot.createElement('lesNotesDossiers');
			var nodeNoteDossier = domRoot.createElement('noteDossier');
			var nodeNoteDossierDate = domRoot.createElement('date');
			var nodeNoteDossierDescription = domRoot.createElement('description');
			var nodeVisites = domRoot.createElement('visites');
			var nodeVisite = domRoot.createElement('visite');
			var nodeVisiteDate = domRoot.createElement('date');
			var nodeVisiteCompteRendu = domRoot.createElement('compteRendu');
			var nodeListeDeSuivis = domRoot.createElement('listeDeSuivis');
			var nodeUnSuivis = domRoot.createElement('unSuivis');
			var nodeUnSuivisDate = domRoot.createElement('dateDactivation');
			var nodeUnSuivisDescription = domRoot.createElement('description');
			//
			var textNumeroDossier = domRoot.createTextNode(numeroDeDossier);
			var textNom = domRoot.createTextNode(nomUser);
			var textPrenom = domRoot.createTextNode(prenomUser);
			var textSexe = domRoot.createTextNode(sexeUser);
			var textDateNaissance = domRoot.createTextNode(dateNaissanceUser);
			var textAssuranceMaladie = domRoot.createTextNode(numeroAssuranceMaladieUser);
			var textNumeroTelephone = domRoot.createTextNode(numeroTelephoneUser);
			var textAdresse = domRoot.createTextNode(adresseUser);
			var textAntecedantMedicalDescription = domRoot.createTextNode(antecedantMedicalDescription);
			var textAntecedantMedicalDate = domRoot.createTextNode(antecedantMedicalDate);
			var textNoteDescription = domRoot.createTextNode("");
			var textNoteDate = domRoot.createTextNode("");
			var textVisiteCompteRendu = domRoot.createTextNode("");
			var textVisiteDate = domRoot.createTextNode("");
			var textUnSuivisDate = domRoot.createTextNode("");
			var textUnSuivisDescription = domRoot.createTextNode("");
			//
			nodeNumeroDossier.appendChild(textNumeroDossier);
			nodeNom.appendChild(textNom);
			nodePrenom.appendChild(textPrenom);
			nodeSexe.appendChild(textSexe);
			nodeDateNaissance.appendChild(textDateNaissance);
			nodeNumeroAssuranceMaladie.appendChild(textAssuranceMaladie);
			nodeNumeroTelephone.appendChild(textNumeroTelephone);
			nodeAdresse.appendChild(textAdresse);
			nodeDescriptionAntecedant.appendChild(textAntecedantMedicalDescription);
			nodeDateAntecedant.appendChild(textAntecedantMedicalDate);
			nodeNoteDossierDescription.appendChild(textNoteDescription);
			nodeNoteDossierDate.appendChild(textNoteDate);
			nodeVisiteCompteRendu.appendChild(textVisiteCompteRendu);
			nodeVisiteDate.appendChild(textVisiteDate);
			nodeUnSuivisDate.appendChild(textUnSuivisDate);
			nodeUnSuivisDescription.appendChild(textUnSuivisDescription);
			//
			nodeDossier.appendChild(nodeNumeroDossier);
			nodePatient.appendChild(nodeNom);
			nodePatient.appendChild(nodePrenom);
			nodePatient.appendChild(nodeSexe);
			nodePatient.appendChild(nodeDateNaissance);
			nodeDossier.appendChild(nodePatient);
			nodeDossier.appendChild(nodeDateDOuverture);
			nodeDossier.appendChild(nodeDateFermeture);
			nodeDossier.appendChild(nodeNumeroAssuranceMaladie);
			nodeDossier.appendChild(nodeNumeroTelephone);
			nodeDossier.appendChild(nodeAdresse);
			nodeAntecedantMedical.appendChild(nodeDateAntecedant);
			nodeAntecedantMedical.appendChild(nodeDescriptionAntecedant);
			nodeAntecedantMedicaux.appendChild(nodeAntecedantMedical);
			nodeDossier.appendChild(nodeAntecedantMedicaux);
			nodeNoteDossier.appendChild(nodeNoteDossierDate);
			nodeNoteDossier.appendChild(nodeNoteDossierDescription);
			nodeLesNotesDossiers.appendChild(nodeNoteDossier);
			nodeDossier.appendChild(nodeLesNotesDossiers);
			nodeVisite.appendChild(nodeVisiteDate);
			nodeVisite.appendChild(nodeVisiteCompteRendu);
			nodeVisites.appendChild(nodeVisite);
			nodeDossier.appendChild(nodeVisites);
			nodeUnSuivis.appendChild(nodeUnSuivisDate);
			nodeUnSuivis.appendChild(nodeUnSuivisDescription);
			nodeListeDeSuivis.appendChild(nodeUnSuivis);
			nodeDossier.appendChild(nodeListeDeSuivis);

			dossierMedicalComplet.appendChild(nodeDossier);

			fs.writeFile("dossierMedical.xml", domRoot, function(err){
				if (err){
					console.log("ERROR writing XML document");
				}
				console.log('It\'s saved!');
				res.redirect('/'+numeroDeDossier);
			});

		}
	});

};