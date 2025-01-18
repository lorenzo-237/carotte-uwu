# Titre

## Exemple .env.delopment.local

```bash
# PORT
PORT = 3000

# LOG
LOG_FORMAT = dev
LOG_DIR = "C:\Users\Lorenzo\Documents\workspace\elia\carotte-uwu\carotte-api\logs"

# TOKEN
# You can use: `openssl rand -base64 32` or `openssl rand -hex 64` to generate one
SECRET_KEY = "test_secret"

# CORS
ORIGIN = *
CREDENTIALS = true

```

## Exemple .env

```bash
DATABASE_URL="postgresql://postgres:admin@localhost:5432/db_example?schema=test"
```

## TODO

[] funny routes tests
[] cli script
[] testing examples
[] PM2