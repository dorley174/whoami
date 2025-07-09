# Who Am I?

### Game description

Who Am I? is a web representation of the same board game. Its essence is to make some creature to everyone, and then guess it with the help of **Yes/No** questions.

### How to install

#### 1. Clone this repository to any folder in your PC

```bash
git clone https://github.com/dorley174/whoami
cd whoami
```

#### 2. Place Environment Variables

For this project, I use **Redis Database** to store rooms and enable users from other devices connect to the same room. **The database is necessarily needed for the code performance!**

So, you need to create your own database. My recomendation is to use **Redis**
When you create a database, you will get an environment variables:

- UPSTASH_REDIS_REST_URL - URL address for all future requests
- UPSTASH_REDIS_REST_TOKEN - an unique token to connect with db

Make new file called _.env.local_ and place this variables:

```txt
UPSTASH_REDIS_REST_URL=https://some/redis/rest/url
UPSTASH_REDIS_REST_TOKEN=someRedisRestToken

```

_Note: if you will deploy this website to Vercel or other hosting platform, you also will need to add this **Environment Variables** to this platform_

#### 3. Install dependencies described in _package.json_

```bash
npm install
```

#### 4. Run website locally

```bash
npm run dev
```

### Useful commands

- To format all code

```bash
npm run format
```

- To build and run project for production

```bash
npm run build
npm run start
```
