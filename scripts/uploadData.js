const { MeiliSearch } = require('meilisearch')
const dataset = require('./data.json')
const { setupFunctions } = require('./setup')
const dataProcessing = setupFunctions.dataProcessing
const batch = setupFunctions.batch
const populateIndex = setupFunctions.populateIndex
const meiliUpdates = setupFunctions.meiliUpdates
require('dotenv').config()

const fetch = require('node-fetch');

const settings = {
  distinctAttribute: null,
  searchableAttributes: [
    'Artist',
    'Title',
    'ArtistBio',
    'Nationality',
    'Gender',
    'Date',
    'Medium',
    'Department',
    'MultipleArtists',
    'DateToSortBy'
  ],
  displayedAttributes: [
    'Title',
    'Artist',
    'ArtistBio',
    'Nationality',
    'Gender',
    'Date',
    'Medium',
    'Dimensions',
    'URL',
    'Department',
    'Classification',
    'ThumbnailURL',
    'MultipleArtists',
    'DateToSortBy'
  ],
  stopWords: ['a', 'an', 'the'],
  synonyms: { },
  attributesForFaceting: [
    'Nationality', 'Gender', 'Classification'
  ]
}

const rankingRulesAsc = [
  'typo',
  'words',
  'proximity',
  'attribute',
  'wordsPosition',
  'exactness',
  'asc(DateToSortBy)'
]
const rankingRulesDesc = [
  'typo',
  'words',
  'proximity',
  'attribute',
  'wordsPosition',
  'exactness',
  'desc(DateToSortBy)'
]
const defaultRankingRules = [
  'typo',
  'words',
  'proximity',
  'attribute',
  'wordsPosition',
  'exactness'
]

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