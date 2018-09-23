## About Core FB OGShares

Nothing, we only test and love make something that is not clear xD

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

`share.build()` Params Api...

| Key  | Type | Description
| ------------- | ------------- | ------------- |
| title  | string | Title content  |
| url  | string | url redirect, is required! |
| image  | string | Url image, is required!  |
| description | string | Description content  |

Share Constructor arg1 is app id, and arg2 is url hostname(without scheme/http/https) app id.

This package uses (jquery-param)[https://github.com/knowledgecode/jquery-param] from knowledgecode for `jQuery.param()` alternative

## License

The Core FB OGShares is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).