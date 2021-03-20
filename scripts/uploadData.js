const { MeiliSearch } = require('meilisearch')
const dataset = require('./data.json')
const { setupFunctions } = require('./setup')
const dataProcessing = setupFunctions.dataProcessing
const batch = setupFunctions.batch
const populateIndex = setupFunctions.populateIndex
const meiliUpdates = setupFunctions.meiliUpdates
require('dotenv').config()

const fetch = require('node-fetch');


const run = async (settings) => {
  // Create client
  const client = new MeiliSearch({
    host: process.env.REACT_APP_HOST_NAME,
    apiKey: process.env.REACT_APP_HOST_KEY
  })

  const indexName = process.env.REACT_APP_INDEX_NAME;

  // Get or create indexes
  const index = await client.getOrCreateIndex(indexName)

  // Create Indexes array
  const indexArray = [
    { name: indexName, index: index, rules: defaultRankingRules }
  ]

  const filteredArray = await Promise.all(
    indexArray.map(async index => await index.index.getStats()))
    .then(res =>
      indexArray.filter((index, i) => {
        if (res[i].numberOfDocuments === dataset.length) {
          return console.log(`Index "${index.name}" already exists`)
        } else return true
      })
    )

  await Promise.all(filteredArray.map(async index => await populateIndex(settings, index, dataset)))
  const waitForProcessing = filteredArray.map(async index => await meiliUpdates(client, index.name))
  Promise.all(waitForProcessing)
};

let settingsUrl = "https://raw.githubusercontent.com/snuzi/engineering-blogs-aggregator/main/src/MeiliSearch/index-settings.json";

let config = { method: "Get" };

fetch(settingsUrl, config)
    .then(res => res.json())
    .then((indexSettings) => {
        run(indexSettings)
    });