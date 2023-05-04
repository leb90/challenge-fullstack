# Challenge Full Stack

This is a full stack project consisting of a client and a server folder. The client folder contains a React application that consumes data from the server via an API. The server folder contains a Node.js/Express application that retrieves data from an external API, processes it, and returns it to the client.

## Getting started

To get started with this project, clone the repository and install the dependencies for both the client and the server:

```sh
git clone https://github.com/your-username/challenge-fulls.git
cd challenge-fulls/client
npm install
cd ../server
npm install
```
# Client
To start the client, run the following command in the client directory:
```sh
npm run dev
```
This will start the client application in development mode.

To run the client tests, use the following command:
```sh
npm run test
```
# Server
To start the server, run the following command in the server directory:
```sh
npm run server
```
This will start the server application.

To run the server tests, use the following command:
```sh
npm run test
```

API
The server application retrieves data from the following external API:

https://echo-serv.tbxnet.com/v1/secret/

This API returns a list of files, each of which contains a CSV file with three columns: text, number, and hex.

The server application retrieves each CSV file, processes it, and returns the following JSON object to the client:

```sh
[
  {
    file: 'example.csv',
    lines: [
      {
        text: 'some text',
        number: 123,
        hex: '#FF0000'
      },
      // More lines...
    ]
  },
  // More files...
]
```