# Product C.R.U.D

Create, read, update and remove products from a configured store

> Check out the printscreens on the `/public` folder.

## Getting Started

### Setup local development environment

1. Install pnpm

If you don’t already have pnpm installed, you can install it globally via npm:

```bash
npm install -g pnpm
```

Verify the installation:

```bash
pnpm --version
```

2. Clone the Repository

```bash
git clone git@github.com:soujvnunes/product-crud--demo.git
cd product-crud--demo
```

3. Install Dependencies

In the root of the repository, install the dependencies with pnpm:

```bash
pnpm install
```

4. Start the application

Check the scripts section in the repository’s `package.json` file:

```bash
pnpm dev
```

### Environment variables

Create a `.env` file with the following content:

```
API_BASE_URL=https://fakestoreapi.com
API_PRODUCTS_PATH=/products
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
