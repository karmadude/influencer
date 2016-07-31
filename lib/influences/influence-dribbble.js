"use strict";

const Influcence = require("./influence");

class DribbbleInfluence extends Influcence {
  constructor(options) {
    super(options);
    this.id = DribbbleInfluence.ID;
  }

  _transform(username, enc, next) {
    this.request(`https://dribbble.com/${username}`, (err, window) => {
      try {
        let out = {
          source: this.id,
          username: username,
          shots: parseInt(window.document.querySelector(".shots .count").textContent),
          followers: parseInt(window.document.querySelector(".followers .count").textContent),
          following: parseInt(window.document.querySelector(".following .count").textContent),
          likes: parseInt(window.document.querySelector(".likes .count").textContent),
          tags: parseInt(window.document.querySelector(".tags .count").textContent)
        };

        let website = window.document.querySelector(".elsewhere-website");
        if (website) {
          out.website = website.getAttribute("data-url");
        }

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

DribbbleInfluence.ID = "dribbble";

module.exports = DribbbleInfluence;
