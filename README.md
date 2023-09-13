# kitameraki_recruitment_pras

## Folder Structure

    ├── config
    ├── controller/
    │   ├── helper
    |   └── validation
    ├── docs
    ├── middleware
    ├── models
    ├── repository
    ├── routes
    └── utils

| Directory                 | Descriptio                                            |
| ------------------------- | ----------------------------------------------------- |
| **config**                | Define configuration and get value from `.env`        |
| **controller**            | Business logic function                               |
| **controller/helper**     | Function Helper that is only needed in the controller |
| **controller/validation** | Validate request                                      |
| **docs**                  | API documentation                                     |
| **middleware**            | Middleware authorization                              |
| **models**                | Define models structure                               |
| **repository**            | Query logic function                                  |
| **routes**                | Routing endpoint                                      |
| **utils**                 | Common function and constanta                         |

## 🚀 Step to Run (First Time)

- Clone the kitameraki_recruitment_pras repository

```
git clone git@github.com:Hulhay/kitameraki_recruitment_pras.git
```

- install all dependency

```
npm install
```

- create .env file

```
cp .env.example .env
```

- fill the .env file with your configuration

```
DATABASE_URL=

JWT_PRIVATE_ACCESS_KEY=
JWT_EXP_ACCESS_TOKEN=1h
```

- run the project

```
npm start
```

## 🚀 Step to Run (Second Time and So On)

- run the project

```
npm start
```

## 🔬 Step to Run Unit Test

- run the unit test

```
npm test
```

## 📝 Step to Open Docs

- run the project

```
npm start
```

- open docs here

```
localhost:8080/api-docs
```
