var fs = require("fs");
var xmlDom = require("xmldom");
var underScore = require("underscore");

exports.getListPatient = function(res){
	fs.readFile("dossierMedical.xml", function (err, data){
		var listPatient = [];
			if(err){
				console.log("ERROR reading XML document");
			} else {
				var domRoot = new xmlDom.DOMParser().parseFromString(data.toString());
				var dossierList = domRoot.getElementsByTagName('dossier');
				if(!dossierList.length) {
					console.log("la liste est vide ");
				} else {
					for (var i = 0; i < dossierList.length; i++) {
						var patient = {};
						patient.numeroDossier = dossierList[i].getElementsByTagName('numeroDossier')[0].textContent;
						patient.nom = dossierList[i].getElementsByTagName('nom')[0].textContent;
						patient.prenom = dossierList[i].getElementsByTagName('prenom')[0].textContent;
						var listVisites = dossierList[i].getElementsByTagName('visite');
						patient.dateVisite = listVisites[listVisites.length - 1].getElementsByTagName('date')[0].textContent;
						listPatient.push(patient);
					}

				}
			}
			
	        var sortPatientList = underScore._(listPatient).sortBy("nom");
			var dossierPatient = {};
			
			dossierPatient.listPatient = sortPatientList;
	        res.render('index', dossierPatient);
	});
}