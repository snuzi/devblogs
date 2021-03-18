docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/../data.ms:/data.ms \
    --name meili-eng-blogs \
    getmeili/meilisearch