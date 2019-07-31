# Drupal JSON:API Entities

[![CircleCI](https://circleci.com/gh/Realityloop/drupal_jsonapi_entities.svg?style=svg)](https://circleci.com/gh/Realityloop/drupal_jsonapi_entities)

Pull Drupal Entity form and field schemas into your Node.js app with ease.

## Installation

`$ npm install drupal_jsonapi_entities`

## Documentation

### new drupalJSONAPIEntities()

```js
import drupalJSONAPIEntities from 'drupal_jsonapi_entities'

const drupalEntities = new drupalJSONAPIEntities(url, options)
```

The constructor takes two arguments:

- `url`: The base URL of the Drupal instance.
- `options`: The API options.

#### Available API options (`options` argument)

- **auth**: An array for use authorizing the client with the Drupal instance.
  Currently only supports OAuth2 password flow.
  - **clientId**: The Oauth 2 Client ID.
  - **clientSecret**: The Oauth 2 Client secret.
  - **user**: The Drupal username.
  - **pass**: The Drupal user passsword.

### getFormSchema()

```js
const schema = await drupalEntities.getFormSchema(entityType, bundle, mode)
```

The method takes three arguments:

- `entityType`: The Drupal entity type ID.
- `bundle`: The Drupal bundle ID for the entity type.
- `mode`: The form display mode. Default: `default`.

Returns a JSON object:

- **fields**: An array of field objects, sorted by weight.
  - **cardinality**: Allowed number of values.
  - **description**: Help text.
  - **id**: Machine name.
  - **label**: Label.
  - **required**: Required field.
  - **settings**: Merged object of field settings.
  - **type**: Field type machine name.
  - **weight**: Form display field weight.
  - **group**: (optional) Group.
- **groups**: An array of Drupal Field Group module group objects, sorted by weight.
  - **children**: Array of fields in group.
  - **id**: Machine name.
  - **label**: Label.
  - **weight**: Form display weight.
- **keys**: An array of field keys.

#### Drupal requirements

JSON:API resources:

- `entity_form_display--entity_form_display`
- `field_config--field_config`
- `field_storage_config--field_storage_config`

Permissions:

- `administer display modes`
- `administer ENTITY_TYPE fields`

## Nuxt.js module

Drupal JSON:API Entities provides a Nuxt.js module for easily caching the
schema.

### Getting started with Nuxt.js

Add `drupal_jsonapi_entities/nuxt` to the modules section of your
`nuxt.config.js` file.

```js
module.exports = {
  modules: [
    // Drupal JSON:API entities.
    [
      'drupal_jsonapi_entities/nuxt',
      {
        baseUrl: process.env.API_URL,
        auth: {
          clientId: process.env.API_CONSUMER_CLIENT_ID,
          clientSecret: process.env.API_CONSUMER_CLIENT_SECRET,
          user: process.env.API_CONSUMER_USERNAME,
          pass: process.env.API_CONSUMER_PASSWORD
        }
      }
    ],
  ]
}
```

Add a `drupalJSONAPIEntities` section to your `nuxt.config.js` file.

```js
module.exports = {
  drupalJSONAPIEntities: {
    'entityType': { 'bundle': ['mode'] }
  }
}
```

The module provides a plugin, which returns the Drupal JSON:API Entities schema.

```js
this.$drupalJSONAPIEntities()
```
