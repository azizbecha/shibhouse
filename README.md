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

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#structure">Structure</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation & usage</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
![image](https://user-images.githubusercontent.com/63454940/175101998-d36f8c15-071e-457a-9c0c-c3a1cb46ecdd.png)

Shibhouse is a clone of Dogehouse which is a clone of Clubhouse trying to re-take voice conversations to the moon.

### Built With

Big shout out to the creators of those tools

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [React Native](https://reactnative.dev)
* [Tailwind CSS](https://tailwindcss.com)
* [Firebase](https://firebase.google.com)
* [React Icons](https://react-icons.github.io/)

## Structure

| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [pixie](pixie)        |   Next.js frontend        |
| [poppy](poppy)        |   React Native App        |

<!-- GETTING STARTED -->
## Getting Started

To install the project in your machine, please follow the instructions below:

### Install & usage

Clone the repository
  ```sh
  git clone https://github.com/azizbecha/shibhouse.git
  ```
  
Install dependencies
  ```sh
  npm install
  ```
Add Firebase app config:
1. Go to `/auth` folder and create a file named `config.ts` then add this piece of code and don't forget to replace the `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`'s with your data
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
    
Run locally
  ```sh
  npm run dev
  ```

<!-- CONTRIBUTING -->
## Contributing

**Shibhouse** is open-source and open to contributors. We apperciate all of your efforts making Shibhouse a reliable environment.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push`)
5. Open a Pull Request with adding a feature explaining to make it easy to understand

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<!-- CONTACT -->
## Contact

Aziz Becha - [@azizbechaa](https://twitter.com/azizbechaa) - aziz07becha@gmail.com

Project Link: [https://github.com/azizbecha/shibhouse](https://github.com/azizbecha/shibhouse)

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

## Thanks
1. <a href='https://github.com/CortexTN'>@CortexTN</a> for the logo and your improvements.
2. <a href='https://instagram.com/zeriab666'>Zeriab</a> for paying the hosting costs
