"use strict";

const Influcence = require("./influence");

class TwitterInfluence extends Influcence {
  constructor(options) {
    super(options);
    this.id = TwitterInfluence.ID;
  }

  _transform(username, enc, next) {
    this.request(`https://twitter.com/${username}`, (err, window) => {
      try {
        let user = JSON.parse(window.document.getElementById("init-data").value).profile_user;

        let out = {
          source: this.id,
          name: user.name,
          screen_name: user.screen_name,
          followers_count: user.followers_count,
          friends_count: user.friends_count,
          statuses_count: user.statuses_count
        };

        this.push(out);        
        next();
      } catch(e) {
        this.push({
          source: this.id,
          screen_name: username,
          error: "Could not get user influence.",
          message: e.message
        });
      }
    });
  }
}

TwitterInfluence.ID = "twitter";

module.exports = TwitterInfluence;
