const express = require("express");
const router = express.Router();
const request = require("request");
const { Events } = require("../models/events");

function intervalFunc() {
  console.log("new public events...");

  options_user = {
    method: "GET",
    url: "https://api.github.com/events",
    headers: {
      accept: "application/json",
      "User-Agent": "custom"
    }
  };

  request(options_user, function(ee, rr, bb) {
    // process the body
    if (bb) {
      var bo = JSON.parse(bb);

      let eventArray = [];
      bo.map(e =>
        eventArray.push({
          id: e.id,
          actor: e.actor.login,
          type: e.type,
          repoName: e.repo.name,
          repoID: e.repo.id,
          created_at: e.created_at
        })
      );

      saveEvents(aggregateDate(eventArray), aggregateName(eventArray));

      console.log(groupArrays);
      //console.log(bo);
    } else {
      console.log(er);
    }
  });
}
setInterval(intervalFunc, 100000);

function aggregateDate(eventArray) {
  // this gives an object with dates as keys
  const groups = eventArray.reduce((groups, event) => {
    const date = event.created_at.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  // to add it in the array format instead
  return (groupArrays = Object.keys(groups).map(date => {
    return {
      date,
      events: groups[date]
    };
  }));
}
function aggregateName(eventArray) {
  // this gives an object with dates as keys
  const groups = eventArray.reduce((groups, event) => {
    const repoName = event.repoName;
    if (!groups[repoName]) {
      groups[repoName] = [];
    }
    groups[repoName].push(event);
    return groups;
  }, {});

  // to add it in the array format instead
  return (groupArrays = Object.keys(groups).map(repoName => {
    return {
      repoName,
      events: groups[repoName]
    };
  }));
}

async function saveEvents(groupArrays, groupArraysbyRepo) {
  const event = new Events();
  event.byDate = groupArrays;
  event.byRepo = groupArraysbyRepo;
  await event.save();
}

router.get("/", async (req, res) => {
  const events = await Events.find();
  res.send(events);
});

module.exports = router;
