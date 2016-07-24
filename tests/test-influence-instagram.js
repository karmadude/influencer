const tape = require("tape");
const stream = require("stream");
const through2 = require("through2");
const InstagramInfluence = require("../index").influences.InstagramInfluence;

tape("InstagramInfluence", function(t) {
  t.plan(12);

  let tr = through2.obj(function(user, enc, next) {
    t.equal(user.source, influence.id, "Source is twitter");
    t.ok(user.name, "has name");
    t.ok(user.username, "has username");
    t.ok(user.followed_by, "has followed_by");
    t.ok(user.follows, "has follows");
    t.ok(user.media, "has media");
    this.push(user);
    next();
  });

  let usernames = ["cnn", "karmadude"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new InstagramInfluence();
  usernameStream.pipe(influence).pipe(tr);
});
