# user-list-app

Little application for the study of new features on Angular 19 and Unit Tests with Jest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Components](#components)
- [Services](#services)
- [Testing](#testing)
- [Semantic Commits](#semantic-commits)
- [License](#license)

## Installation

To install the project dependencies, run:

```sh
npm install
```

## Usage

To start the development server, run:

```sh
npm start
```

The application will be available at [`http://localhost:4200`](http://localhost:4200).

## Available Scripts

- `npm start`: Starts the development server.
- `npm run build`: Compiles the application for production.
- `npm run watch`: Compiles the application in watch mode.
- `npm test`: Runs unit tests with coverage.
- `npm run test:watch`: Runs unit tests in watch mode.

## Project Structure

```plaintext
.
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── card-user/
│   │   │   ├── user-list/
│   │   ├── services/
│   │   ├── interface/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
├── .editorconfig
├── .gitignore
├── angular.json
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── tsconfig.spec.json
```

## Components

### `CardUserComponent`

Component that represents a user card.

- **Selector**: `app-card-user`
- **Template**: `src/app/components/card-user/card-user.component.html`
- **Styles**: `src/app/components/card-user/card-user.component.scss`

### `UserListComponent`

Component that displays a list of users with search functionality and responsive layout.

- **Selector**: `app-user-list`
- **Template**: `src/app/components/user-list/user-list.component.html`
- **Styles**: `src/app/components/user-list/user-list.component.scss`

## Services

### `UserService`

Service responsible for fetching user data from the API.

- **Methods**:
  - `getUsers()`: Returns a list of users.

## Testing

Unit tests are written using Jest. To run the tests, use:

```sh
npm test
```

## Semantic Commits

This project uses Commitizen to standardize commit messages. Follow these steps to set up and use semantic commits:

### Installation

Commitizen and related dependencies are already included in the `devDependencies` of the project. To install them, run:

```sh
npm install
```

## License

This project is licensed under the MIT License.
