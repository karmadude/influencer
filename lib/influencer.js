"use strict";

const stream = require("stream");

class Influencer extends stream.Readable {
  constructor(influences) {
    super({ objectMode: true });


    this.out = new stream.PassThrough({ objectMode: true });

    this._usernameStreams = {};
    this.influences = influences;
    this.influences.forEach((influence) => {
      let usernameStream = new stream.Readable({ objectMode: true });
      usernameStream._read = this._read;
      this._usernameStreams[influence.id] = usernameStream;
      usernameStream.pipe(influence).pipe(this.out);
    });
    
    this.on("data", (d) => {
      let usernameStream = this._usernameStreams[d.source];
      if (usernameStream) {
        usernameStream.push(d.username);
      }
    });
  }

  _read(size) {
    //noop
  }
}

Influencer.influences = require("./influences");

module.exports = Influencer;
