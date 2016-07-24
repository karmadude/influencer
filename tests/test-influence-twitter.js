const tape = require("tape");
const stream = require("stream");
const through2 = require("through2");
const TwitterInfluence = require("../index").influences.TwitterInfluence;

tape("TwitterInfluence", function(t) {
  t.plan(12);

  let tr = through2.obj(function(user, enc, next) {
    t.equal(user.source, influence.id, "Source is twitter");
    t.ok(user.name, "has name");
    t.ok(user.screen_name, "has screen_name");
    t.ok(user.followers_count, "has followers_count");
    t.ok(user.friends_count, "has friends_count");
    t.ok(user.statuses_count, "has statuses_count");
    this.push(user);
    next();
  });

  let usernames = ["cnn", "karmadude"];
  let usernameStream = new stream.Readable({ objectMode: true });
  usernameStream._read = function() {
    this.push(usernames.shift() || null)
  };
  
  let influence = new TwitterInfluence();
  usernameStream.pipe(influence).pipe(tr);
});
