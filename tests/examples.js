function exampleInfluencer() {
  const through2 = require("through2");
  const Influencer = require("../index");

  let tr = through2.obj(function(user, enc, next) {
      console.log("Influencer: ", user);
      next(null, user);
  });

  // Sources for influence stats
  let twitter = new Influencer.influences.TwitterInfluence();
  let instagram = new Influencer.influences.InstagramInfluence();

  let influencer = new Influencer([twitter, instagram]);
  influencer.out.pipe(tr);

  influencer.push({ username: "vice", source: Influencer.influences.TwitterInfluence.ID });
  influencer.push({ username: "vicenews", source: Influencer.influences.InstagramInfluence.ID });
  influencer.push(null);
}

function exampleDribbbleInfluence() {
  const stream = require("stream");
  const through2 = require("through2");
  const Influencer = require("../index");

  let tr = through2.obj(function(user, enc, next) {
      console.log("DribbbleInfluence: ", user);
      next(null, user);
  });

  let usernames = ["yoga", "SA9527"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new Influencer.influences.DribbbleInfluence();
  usernameStream.pipe(influence).pipe(tr);
}

function exampleTwitterInfluence() {
  const stream = require("stream");
  const through2 = require("through2");
  const Influencer = require("../index");

  let tr = through2.obj(function(user, enc, next) {
      console.log("TwitterInfluence: ", user);
      next(null, user);
  });

  let usernames = ["cnn", "vice"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new Influencer.influences.TwitterInfluence();
  usernameStream.pipe(influence).pipe(tr);
}

function exampleInstagramInfluence() {
  const stream = require("stream");
  const through2 = require("through2");
  const Influencer = require("../index");

  let tr = through2.obj(function(user, enc, next) {
      console.log("InstagramInfluence: ", user);
      next(null, user);
  });

  let usernames = ["cnn", "vicenews"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new Influencer.influences.InstagramInfluence();
  usernameStream.pipe(influence).pipe(tr);
}

exampleInfluencer();
exampleDribbbleInfluence();
exampleTwitterInfluence();
exampleInstagramInfluence();
