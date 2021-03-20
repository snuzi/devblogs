const { MeiliSearch } = require('meilisearch')
const dataset = require('./data.json')
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local')});

const fetch = require('node-fetch');

async function populateIndex (settings, index, name, data) {
    await index.updateSettings({ ...settings});
    console.log(`Settings added to ${name} index.`);
    console.log(`Adding documents to ${name}...`);
    await index.addDocuments(data);
    console.log(`Documents added`);
}

const run = async (settings) => {
    const client = new MeiliSearch({
        host: process.env.REACT_APP_HOST_NAME,
        apiKey: process.env.REACT_APP_HOST_KEY
    })

    const indexName = process.env.REACT_APP_INDEX_NAME;
    const index = await client.getOrCreateIndex(indexName)

    await populateIndex(settings, index, indexName, dataset);
};

let settingsUrl = "https://raw.githubusercontent.com/snuzi/engineering-blogs-aggregator/main/src/MeiliSearch/index-settings.json";

let config = { method: "Get" };

fetch(settingsUrl, config)
    .then(res => res.json())
        .then((indexSettings) => {
            run(indexSettings)
        });