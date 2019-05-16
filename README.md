# node-aggregated-statistics

Small Web application with only one API processing input binary data and returning aggregated statistics for this data.

## Getting Started

To get started, in config/ directory, you need to create a config file to the needed environment (based on default.json). For example "development.json". Configure them in accordance with your environment.

**Install dependency modules**

```
npm install
```

**Running app**

```
npm start
```

**Running dev**

```
npm run dev
```

**Running tests**

```
npm start
npm run test
```

## How it works

On the server we now have the following endpoints:

Endpoint | Description
----------|------------
POST /api/v1/process | Gets binary data about the history of payment transactions and returns aggregated statistics.
