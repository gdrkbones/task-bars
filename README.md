# Install

```bash
$ yarn add
```

# Database

Change the DATABASE_URL .env variable to a valid MongoDB URL.

## Setup

In order to configure the database run

```bash
$ yarn prisma db push
```

This will ensure all Schema rules for current DB, such as unique fields and default values

## Populate with sample Data

```bash
$ yarn prisma db seed
```

This command will populate the database with moch Data.

# Check Online
