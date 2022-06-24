# Aireum - Web App Server

> A webapp to browse and play audio/video media files, provides main functions like user login/register, user preference and locale settings, media files real time search/filter and play, watching list and history management.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Project Status](#project-status)
<!-- * [Acknowledgements](#acknowledgements)  -->
- [Contact](#contact)
<!-- * [License](#license) -->

## General Information

> This repo is the server side codes, including login/register apis, contents/posts/user apis, etc.

## Technologies Used

- express - version 4.17.2
- firebase - version 9.1.1
- firebase-admin - version 10.0.2
- cors - version 2.8.5
- dotenv - version 15.0.0
- algoliasearch - version 4.12.1
- @google-cloud/logging - version 9.8.0
- lodash - version 4.17.21

## Features

List the ready features here:

- Get/Create posts apis
- Get/Create contents(including data type audio and video) apis
- Search/Filter Algolis apis
- Log to Google Logging apis

## Setup

- Clone this repo to your desktop.

- Update AgoliaSearch. Follow this video instructions [here](https://www.youtube.com/watch?v=ZNVAPpTpKpk&t=1182s)(watch the first 27 minutes for set up, replace with your own info in ./seed.sh), also update `.env` the fields: `ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME`, with your own.

- Update Firebase and Google Logging.To use the Google Logging services and firebase admin functions, please replace with your own service account file, get service account file from `Firebase-Project Overview-Project settings-Service accounts-Generate new private key`,change name to `service-account-file.json` and save it locally in the parent folder of this server folder. Make sure grant the `Owner` role to this service account [here](https://console.cloud.google.com/iam-admin)

## Usage

- After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

- Once the dependencies are installed, you can run `npm start` to start the application. When you see `Server is listening on port 5000` in the terminal, the server is launched successfully!

## Testing

- Once have both [client](https://github.com/Diting-Lab/Aireum_01_Client) and server side codes cloned and set up correctly, please follow the [testing guide](https://docs.google.com/document/d/1xepbCo5pPROmnnxAJuL6T3_z86CJXICfyPDbyZI7irQ/edit?usp=sharing) to test if all the pages and functions are working well.

## Project Status

Project is: _in progress_ , more features will be added, including apis of manage watching history and list, social functions like chat and sharing, etc.

<!-- ## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to... -->

## Contact

Ditinglab (support@ditinglab.com)

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
