## About Core FB OGShares

Nothing, we only test and love make something that is not clear xD.
This package use to create a Facebook share url with ease

## Usage

Simple usage...

```
const Share = require('core-fb-ogshares'),
  share = new Share('appid', 'url app redirect');

share.build({
  'url': 'url redirect',
  'image': 'url image'
});
```

#### Constructor
Share Constructor have 2 argument.

| argument  | Type | Description
| ------------- | ------------- | ------------- |
| 1  | string | Your app's unique identifier  |
| 2  | string | This not redirect url, but this is url in your app, only use becaus is required. (without scheme/http/https) |

#### Build parameters `share.build(data, options)`
In build function have 2 object parameter, `data` and `options`

build `data` parameter use for `action_properties`

| Key  | Type | Description
| ------------- | ------------- | ------------- |
| title  | string | Title content |
| url  | string | url redirect, is required! |
| image  | string | Url image, is required!  |
| description | string | Description content  |

build `options` parameter is optionals

| Key  | Type | Description
| ------------- | ------------- | ------------- |
| action_type  | string | Avaiable `og.shares` and `og.likes`, default is `og.likes` |
| display  | string | Avaiable `popup` and `touch`, default is `popup` |
| version  | string | App version, default is `v2.11` |

This package uses [https://github.com/knowledgecode/jquery-param](jquery-param) from knowledgecode for `jQuery.param()` alternative

## License

The Core FB OGShares is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).