"use strict";

const jsdom = require("jsdom");
const request = require("request");
const stream = require("stream");

const CommonOptions = { objectMode: true, hightWaterMark: 16 };

class Influcence extends stream.Transform {
  constructor(options) {
    super(Object.assign(CommonOptions, options));
  }

  request(url, cb) {
    request(url, (err, response, body) => {
      jsdom.env({
        html: body, 
        features: {
          FetchExternalResources: this.FetchExternalResources || false,
          ProcessExternalResources: this.ProcessExternalResources || false
        },
        done: (err, window) => {
          cb(null, window);
        }
      })
    });
  }

  _transform(chunk, enc, next) {
    this.push(chunk);
    next();
  }
}

module.exports = Influcence;
