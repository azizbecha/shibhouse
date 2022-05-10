<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://shibatoken.com/images/shib-logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Shibhouse</h3>

  <p align="center">
    Re-taking voice conversations to the moon 🚀
    <br />
    <a href="https://github.com/azizbecha/shibhouse"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/azizbecha/shibhouse">View Demo</a>
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
![shibhouse-demo](https://user-images.githubusercontent.com/63454940/167589979-c6726540-e74e-4e70-a1e3-453e39d001fd.PNG)

Shibhouse is a clone of Dogehouse which is a clone of Clubhouse trying to re-take voice conversations to the moon.

### Built With

Big shout out to the creators of those tools

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Tailwind css](https://tailwindcss.com)
* [Firebase](https://firebase.google.com)
* [React icons](https://react-icons.github.io/)

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

Project Link: [https://github.com/azizbechae/shibhouse](https://github.com/azizbechae/shibhouse)

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
