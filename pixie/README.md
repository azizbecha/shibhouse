<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://github.com/azizbecha/shibhouse">
    <img src="https://user-images.githubusercontent.com/63454940/168051960-7da5c959-07f7-4fbb-be91-53e42054cc56.png" alt="Logo" width="130" height="250">
  </a>

  <h3 align="center">Shibhouse</h3>

  <p align="center">
    Re-taking voice conversations to the moon 🚀
    <br />
    <a href="https://github.com/azizbecha/shibhouse"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://shibhouse.tv">View Demo</a>
    ·
    <a href="https://github.com/azizbecha/shibhouse/issues">Report Bug</a>
    ·
    <a href="https://github.com/azizbecha/shibhouse/issues">Request Feature</a>
  </p>
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
</div>

# What is this folder
This folder is called pixie (/ˈpɪksi/), it is currently used for our Next.js frontend.

It's live on 👉 shibhouse.tv

# Folder structure
Here you find how we organize our files and folders

| Folder                   |      Description          |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------: |
| [auth](auth)             | Contains everything related to Authentication, such as Firebase config, Private/Public routes and the AuthContext |
| [components](components) | Contains various page components such as Navbar, Footer, LoadingScreen ...                                        |
| [contexts](contexts)     | Contains the most used React.Contexts like PeerContext                                                            |
| [forms](forms)           | Contains Login/Register forms components                                                                          |
| [hooks](hooks)           | Contains various hooks like usePeer hook                                                                          |
| [interface](interface)   | Contains TypeScript common used interfaces                                                                        |
| [lib](lib)               | Contains various most used functions like createRoom, isChatCommand, getBrightColor and much more                 |
| [modules](modules)       | Contains various organised page components such as sidebars                                                       |
| [pages](pages)           | Contains the whole website pages (Default Next.JS Folder for routing)                                             |
| [styles](styles)         | Contains the CSS files                                                                                            |
| [utils](utils)           | Contains other useful components like SEO.tsx                                                                     |

# How to run locally

Clone the repository
  ```sh
  git clone https://github.com/azizbecha/shibhouse.git
  ```

Install dependencies
  ```sh
  npm install
  ```
 
Add Firebase app config:
1. Go to `/auth` folder and create a file named `config.ts` then add this piece of code and don't forget to replace the `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`'s with your credentials
```ts
export const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};
```

Run the project 
```sh
cd shibhouse
cd pixie
```  

Or
  
```sh
npm run web
```
if you are in the `/shibhouse` folder.

[contributors-shield]: https://img.shields.io/github/contributors/azizbecha/shibhouse.svg?style=for-the-badge
[contributors-url]: https://github.com/azizbecha/shibhouse/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/azizbecha/shibhouse.svg?style=for-the-badge
[forks-url]: https://github.com/azizbecha/shibhouse/network/members
[stars-shield]: https://img.shields.io/github/stars/azizbecha/shibhouse.svg?style=for-the-badge
[stars-url]: https://github.com/azizbecha/shibhouse/stargazers
[issues-shield]: https://img.shields.io/github/issues/azizbecha/shibhouse.svg?style=for-the-badge
[issues-url]: https://github.com/azizbecha/shibhouse/issues
[license-shield]: https://img.shields.io/github/license/azizbecha/shibhouse.svg?style=for-the-badge
[license-url]: https://github.com/azizbecha/shibhouse/blob/master/LICENSE.md
