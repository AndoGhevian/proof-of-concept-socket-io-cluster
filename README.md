# Socket IO Clustering Proof Of Concept

First of all make sure that the ports used in docker compose file of corresponding example, and the socket io server ports 3000, 4000 are free.

Then run corresponding compose file with `docker compose up`.

After that, run appropriate scripts for server and client from root package json, e.g.
  - `npm run redis-single` - need to be added for each proof of concept
  - `npm run client-1` - always the same
  - `npm run client-2` - always the same

Clients are always the same, so you need to implement and add appropriate script only for adapter injection.

## Contribute
if you want to open proof of concept for some adapter, open the corresponding folder and follow the examples that already exist.