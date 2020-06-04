# SimilarWeb

> This package provides a standardized layer for accessing [SimilarWeb services](https://www.similarweb.com/corp/developer/) along with data types.

# Usage

## Installation

Install the service in your own project

```
npm install @torch-ai/similar-web
```

## Initialization

At the top of your application, or in an imported configuration file:

```ts
// Import the service definition and environment constants
import Service, { IServiceOptions }  from "@torch-ai/similar-web";

// Create an instance of the service
const onInvalidCredentials = jest.fn(() => {});
const options: IServiceOptions = {
    apiKey: process.env.API_KEY,
    onInvalidCredentials: onInvalidCredentials,
};
export default new Service(options);
```

## Calls

```ts
import service from "./similar-web.ts";

try {
  const capabilities = await service.utilities.capabilities();
} catch (error) {}
```

There is a limitation of 10 API request per second per SimilarWeb account; if 2 API keys belong to the same account,
this limitation applies to both keys.

## License and agreements

This package is provided through an MIT license. Usage of this package is freely available without restriction.

SimilarWeb itself has its [own requirements](https://www.similarweb.com/corp/legal/terms/). Please contact them for your account and terms.

# Contributing

## Installation

Clone the package from the [repository]().

```
npm install
```

## Testing

A local file `.env` file will need to be created with credentials for the api:

```text
API_KEY=****
```

You may run tests in a continuous watch mode:

```
npm run-script test:watch
```

## Publishing

Open an issue requesting a version to publish.
