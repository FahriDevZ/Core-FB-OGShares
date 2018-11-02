'use strict';

const serialize = require('./libs/serialize');

class Share {
  constructor(appId, redirectUrl) {
    this.setAppId(appId);
    this.setRedirectUrl(redirectUrl);

    if (!this.appId) {
      throw new Error('missing appid!');
    }

    if (!this.redirectUrl) {
      throw new Error('missing redirect url app!');
    }
  }

  setAppId(appId) {
    this.appId = appId;
    return this;
  }

  setRedirectUrl(redirectUrl) {
    this.redirectUrl = redirectUrl;
    return this;
  }

  build(data, params) {
    if (!data.url) {
      throw new Error('Parameter URL is required');
    }

    if (!data.image) {
      throw new Error('Parameter image is required');
    }

    const connectUrl = 'https://staticxx.facebook.com/connect/xd_arbiter/r/lY4eZXm_YWu.js';
    const parameter = {
      action_properties: JSON.stringify({
        object: {
          'og:url': data.url,
          'og:title': data.title ? data.title : '',
          'og:image': data.image,
          'og:description': data.description ? data.description : ''
        }
      }),
      action_type: 'og.likes',
      app_id: this.appId,
      next: () => {
        const parameter = serialize({
          version: '42#cb=f178bb82679399',
          domain: this.redirectUrl,
          origin: 'https://' + this.redirectUrl + '/f3ec09ca44bdc94',
          relation: 'opener',
          frame: 'f295fa5752ca374',
          result: '"xxRESULTTOKENxx"'
        });
        const url = connectUrl + '?' + parameter;
        return decodeURIComponent(url);
      },
      sdk: 'joey',
      version: 'v2.11',
      '_rdc': true,
      '_rdr': ''
    };

    const url = 'https://web.facebook.com/v2.11/dialog/share_open_graph?' + serialize(parameter);

    return url;
  }
}

module.exports = Share;