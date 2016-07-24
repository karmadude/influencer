"use strict";

const Influence = require("./influence");

class InstagramInfluence extends Influence {
  constructor(options) {
    super(options);
    this.id = InstagramInfluence.ID;
    this.ProcessExternalResources = ["script"];
  }

  _transform(username, enc, next) {
    this.request(`https://www.instagram.com/${username}`, (err, window) => {
      try {
        let user = window._sharedData.entry_data.ProfilePage[0].user;

        let out = {
          source: this.id,
          name: user.full_name,
          username: user.username,
          followed_by: user.followed_by.count,
          follows: user.follows.count,
          media: user.media.count
        };

        this.push(out);
        next();
      } catch(e) {
        this.push({
          source: this.id,
          username: username,
          error: "Could not get user influence.",
          message: e.message
        });
      }
    });
  }
}

InstagramInfluence.ID = "instagram";

module.exports = InstagramInfluence;
