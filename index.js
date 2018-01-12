'use strict';

const util    = require(`util`);
const fs      = require(`fs`);
const path    = require(`path`);
const _       = require(`lodash`);
const readdir = util.promisify(fs.readdir);

let ms = null;

async function getFilesInBozzDir () {
  const bozzFolderPath    = path.resolve(process.cwd(), `bozz`);
  let bozzFiles           = [];

  try {
    bozzFiles = (await readdir(bozzFolderPath)).map(file => path.resolve(bozzFolderPath, file));
  } catch (e) {
    console.log(`[bozz-load-dir] warning - No "bozz" directory found`);
  }

  return bozzFiles;
}

async function loadDir () {
  const bozzFiles         = await getFilesInBozzDir();
  const bozzEventsFiles   = bozzFiles.filter(file => file.match(/\.events\.js$/g)).map(file => require(file));
  const bozzRequestsFiles = bozzFiles.filter(file => file.match(/\.requests\.js$/g)).map(file => require(file));

  try {
    _.forEach(bozzEventsFiles, events => {
      let eventsObj = events;
      if (typeof events === `function`) { eventsObj = events(ms); }
      ms.onEvents(eventsObj);
    })
    _.forEach(bozzRequestsFiles, requests => {
      let requestsObj = requests;
      if (typeof requests === `function`) { requestsObj = requests(ms); }
      ms.onRequests(requestsObj);
    })
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  attach (bozzMs) {
    ms = bozzMs;
    ms.afterInit(loadDir);
  },
};
