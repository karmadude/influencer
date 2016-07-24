const tape = require("tape");
const through2 = require("through2");
const Influencer = require("../index");
const influences = Influencer.influences;

const SOURCE_USERNAME_KEYS = {
  twitter: "screen_name",
  instagram: "username"
};

tape("Influencer", function(t) {

  t.plan(4);

  const data = {
    cnn_twitter: { username: "CNN", source: "twitter" },
    cnn_instagram: { username: "CNN", source: "instagram" },
    vice_twitter: { username: "VICE", source: "twitter" },
    vicenews_instagram: { username: "vicenews", source: "instagram" }
  };

  let tr = through2.obj(function(user, enc, next) {
    let username = user[SOURCE_USERNAME_KEYS[user.source]].toLowerCase();
    let dataKey = `${username}_${user.source}`;

    t.ok(data[dataKey], `${dataKey} influence received`);

    next(null, user);
  });

  let twitter = new influences.TwitterInfluence();
  let instagram = new influences.InstagramInfluence();
  
  let influencer = new Influencer([twitter, instagram]);
  influencer.out.pipe(tr);

  influencer.push(data.cnn_twitter);
  influencer.push(data.cnn_instagram);
  influencer.push(data.vice_twitter);
  influencer.push(data.vicenews_instagram);
  influencer.push(null);

});
