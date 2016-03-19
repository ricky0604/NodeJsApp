
mongo = require("mongodb");

module.exports = function(app, db) {
  app.get('/', function(req, res) {
    generateList(db, function(postsSort) {
      res.render('index', postsSort);
    });
  });

  app.get('/admin/publier', function(req, res) {
  	res.render('publier');
  });

  app.post('/admin/creer', function(req,res){
  	savePost(db,req,function(post) {
  		res.redirect("/" + post._id);
  	});
  });

  app.get('/:id', function(req,res){
  	findData(db,req,function(post){
      if(post){
        res.render('consulter',post);
      } else {
        res.send(404);
      }
  		
  	});
  	
  });

  app.put('/admin/updateTitre', function(req,res){
    updateTitre(db,req,function(nb){
      if(nb > 0){
        res.send(200);
      } else {
        res.send(500);
      }
    });
  });


  app.put('/admin/updateAuteur', function(req,res){
    updateAuteur(db,req,function(nb){
      if(nb > 0){
        res.send(200);
      } else {
        res.send(500);
      }
    });
  });

  app.put('/admin/updateTexte', function(req,res){
    updateTexte(db,req,function(nb){
      if(nb > 0){
        res.send(200);
      } else {
        res.send(500);
      }
    });
  });


  app.delete('/admin/delete', function(req,res){
    deleteArticle(db,req,function(nb){
      if(nb > 0){
        res.send(200);
      } else {
        res.send(500);
      }
    });
  });

  app.get('/admin/:id', function(req,res){
    modifierPost(db,req,function(post){
      if(post){
        res.render('modifier',post);
      } else {
        res.send(404);
      } 
    });
  });





};

function generateList(db, callback) {
  db.collection('blog', function(err, blog) {
    if (err) {
      console.log("Erreur : " + err);
      callback([]);
    } else {
      blog.find({},{'sort': [['date', 'desc']]}).toArray(function(err, posts) {
        if (err) {
          console.log("Erreur : " + err);
          callback([]);
        } else {
          postsSort = {};
          tabAll =[];
          tabFirst3 = [];
          var cont = 0;
          for(var i = 0; i< posts.length ; i++){
            if(cont < 3){
              tabFirst3[i] = posts[i];
              cont++;
            }
            tabAll[i] = posts[i];
          }
          postsSort.listAll = tabAll;
          postsSort.listThree = tabFirst3;
          callback(postsSort);
        }
      });
    }
  });
};


function savePost(db, req, callback){
	db.collection('blog', function(err, blog){
		if(err){
			console.log("Erreur : " + err);
		} else {
			var posts = [{"titre":req.body.titre,"texte":req.body.texte,"auteur":req.body.auteur,"date": new Date().toISOString()}];
			blog.insert(posts, {safe: true}, function(err, post) {
			callback(post[0]);
			});
		}
	});
}

function findData(db, req, callback){
	db.collection('blog', function(err,blog){
		if(err){
			console.log("Erreur : " + err);
		} else {
			curseur = blog.find({'_id': new mongo.BSONPure.ObjectID(req.params.id)});
      curseur.toArray(function(err, posts){
       if(err){
            console.log("error ");
        }else {
           callback(posts[0]);
        }
      });
		}
	});
}


function modifierPost(db,req, callback){
  db.collection('blog', function(err,blog){
    if(err){
      console.log("Erreur: " + err);
    } else {
      curseur = blog.find({'_id': new mongo.BSONPure.ObjectID(req.params.id)});
      curseur.toArray(function(err,posts){
        if(err){
          console.log("error");
        } else {
          callback(posts[0]);
        }
      });
    }

  });

}

function updateTitre(db,req,callback){
  db.collection('blog',function(err,blog){

    if(err){
      console.log("Erreur:" + err);
    } else {
      blog.update({'_id': new mongo.BSONPure.ObjectID(req.body.id)}, {$set:{'titre': req.body.titre}}, {'safe': true,'multi':false}, function(err,nb){
        if(err){
          console.log("err");
        } else {
          console.log(nb+" update");
          callback(nb);
        }
      });
    }
  });

}


function updateAuteur(db,req,callback){
  db.collection('blog',function(err,blog){

    if(err){
      console.log("Erreur:" + err);
    } else {
      blog.update({'_id': new mongo.BSONPure.ObjectID(req.body.id)}, {$set:{'auteur': req.body.auteur}}, {'safe': true,'multi':false}, function(err,nb){
        if(err){
          console.log("err");
        } else {
          console.log(nb+" update");
          callback(nb);
        }
      });
    }
  });

}


function updateTexte(db,req,callback){
  db.collection('blog',function(err,blog){

    if(err){
      console.log("Erreur:" + err);
    } else {
      blog.update({'_id': new mongo.BSONPure.ObjectID(req.body.id)}, {$set:{'texte': req.body.texte}}, {'safe': true,'multi':false}, function(err,nb){
        if(err){
          console.log("err");
        } else {
          console.log(nb+" update");
          callback(nb);
        }
      });
    }
  });

}


function deleteArticle(db,req,callback){
  db.collection('blog',function(err,blog){
    if(err){
      console.log("Erreur:" + err);
    } else {
      blog.remove({'_id': new mongo.BSONPure.ObjectID(req.body.id)},function(err,nb){
        if(err){
          console.log("Erreur:" + err);
        } else {
          callback(nb);
        }
      });
    }
  });

}
