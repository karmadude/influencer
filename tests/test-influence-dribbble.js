const tape = require("tape");
const stream = require("stream");
const through2 = require("through2");
const DribbbleInfluence = require("../index").influences.DribbbleInfluence;

tape("DribbbleInfluence", function(t) {
  t.plan(16);

  let tr = through2.obj(function(user, enc, next) {
    t.equal(user.source, influence.id, "Source is dribbble");
    t.ok(user.username, "has username");
    t.ok(user.shots, "has shots");
    t.ok(user.followers, "has followers");
    t.ok(user.following, "has following");
    t.ok(user.likes, "has likes");
    t.ok(user.tags, "has tags");
    t.ok(user.website, "has website");
    this.push(user);
    next();
  });

  let usernames = ["yoga", "SA9527"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new DribbbleInfluence();
  usernameStream.pipe(influence).pipe(tr);
});
