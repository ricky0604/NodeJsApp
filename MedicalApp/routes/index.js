
var dossiersMedical = require("./dossierMedical/dossiersMedical");
var homePageMedical = require("./dossierMedical/homePageMedical");
var creerDossierMedical = require("./dossierMedical/creerDossierMedical");

exports.index = function(req, res){
	homePageMedical.getListPatient(res);
};


exports.nouveau = function(req, res){
	res.render('medicalForm',{title: 'Formulaire Medical'});
};

exports.dossierMedical = function(req, res){
	var patient = req.params.noDossier;
	dossiersMedical.getDossierPatient(res, patient);
};

exports.creerDossier = function(req, res){
	var dataPost = req.body;
	creerDossierMedical.createMedicalFolder(res, dataPost);
};