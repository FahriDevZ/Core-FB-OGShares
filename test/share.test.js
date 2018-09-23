const Share = require('../');

/**
 * Nothing about this test, is simple.. we add advanced soon
 **/

describe('share class', () => {

  it('share class constructor', done => {
    done();
  });

  it('new class share', done => {
    try {
      new Share('87741124305', 'www.youtube.com');
      done();
    } catch(error) {
      done(error);
    }
  });

  it('build', done => {
    try {
      const share = new Share('87741124305', 'www.youtube.com');
      share.build({
        'url': 'https://google.com',
        'image': 'https://i.ytimg.com/vi/CW52cjJcNi0/maxresdefault.jpg'
      });
      done();
    } catch(error) {
      done(error);
    }
  });

});