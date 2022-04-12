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

## Database Schemas:

### model Gateway:

- **id**: Identifier provided by database
- **serial**: Gateway serial. Unique
- **name**: Gateway human readable name. Unique
- **IPV4**: Valid IPV4 address. Unique
- **devices**: Array of Devices. No more than 10.

### model Device :

- **id**: Identifier provided by database
- **UID**: UID of the Device. Number. Unique
- **vendor**: Device Vendor.
- **dateCreated**: Date Created. Defaults to _Date Created_.
- **status**: OFFLINE | ONLINE. Defaults to OFFLINE.
- **Gateway**: Reffers to related Gateway.
- **gatewayId**: Identifier of related Gateway.

# Endpoints

## Gateway Endpoints

### List Gateways:

**GET** _/api/gateways_

Query params:

- page: page of current request.

- limit: max number of items per page. \*It return a value with max `limit + 1` in order to know if there is a next page.

Returns:

- Array of _Gateways_ with populated field **devices**

### Create Gateway:

**POST** _/api/gateways_

Body params:

- **name**: Human readable name of gateway.
- **serial**: Serial of the Gateway.
- **IPV4**: Valid IPV4 address.

Returns:

- The created _Gateway_.

### Detail of Gateway:

**GET** _/api/gateways/[id]_

Query params:

- **id**: _id_ of desired Gateway.

Returns:

- A _Gateway_ with populated field **devices**

### Update Gateway:

**PUT** _/api/gateways/[id]_

Body params:

- **name**?: New name of gateway.
- **serial**?: New serial of the Gateway.
- **IPV4**?: New valid IPV4 address.

Returns:

- The updated _Gateway_

### Delete Gateway:

**DELETE** _/api/gateways/[id]_

Query params:

- **id**: _id_ of desired Gateway.

Returns:

- The deleted _Gateway_

## Device Endpoints

### Create Device:

**POST** _/api/devices_

Body params:

- **gatewayId**: Id of parent Gateway
- **UID**: UID of the Device.
- **vendor**: Device's vendor.

Returns:

- The created _Device_

### Update Device:

**PUT** _/api/devices/[id]_

Query params:

- **id**: _id_ of desired Device.

Body params:

- **UID**?: New UID of the Device.
- **vendor**?: New Device's vendor.

Returns:

- The created _Device_

### Delete Device:

**DELETE** _/api/devices/[id]_

Query params:

- **id**: _id_ of desired Device.

Returns:

- The created _Device_

# Test

Just run

```bash
$ yarn jest
```

# Check Online

you can Check the online version at [GatewayManager](https://task-gateways.vercel.app/)
