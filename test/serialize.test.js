const expect = require('expect.js'),
  serialize = require('../libs/serialize'),
  jQuery = require('jquery'),
  jsdom = require('jsdom');

let $ = null,
  test = null;

describe('Equivalence serialize and jQuery.param()', () => {

  before((done) => {
    if (global.jQuery) {
      $ = global.jQuery;
    } else {

    const _window = (new (jsdom.JSDOM)()).window;
      $ = jQuery(_window);
      _window.close();
    }

    test = (done, obj) => {
      try {
        expect(decodeURIComponent(serialize(obj))).to.eql(decodeURIComponent($.param(obj)));
        done();
      }
      catch (error) {
        done(error);
      }
    };

    done();
  });

  it('ascii', done => {
    const obj = {
      foo: 'bar'
    };

    test(done, obj);
  });

  it('non-ascii', done => {
    const obj = {
      foo: 'こんにちは'
    };

    test(done, obj);
  });

  it('number', done => {
    const obj = {
      foo: 12345
    };

    test(done, obj);
  });

  it('boolean', done => {
    const obj = {
      foo: true
    };

    test(done, obj);
  });

  it('String', done => {
    const obj = {
      foo: new String()   // eslint-disable-line no-new-wrappers
    };

    test(done, obj);
  });

  it('Number', done => {
    const obj = {
      foo: new Number()   // eslint-disable-line no-new-wrappers
    };

    test(done, obj);
  });

  it('Boolean', done => {
    const obj = {
      foo: new Boolean()  // eslint-disable-line no-new-wrappers
    };

    test(done, obj);
  });

  it('Date', done => {
    const obj = {
      foo: new Date()
    };

    test(done, obj);
  });

  it('Error', done => {
    const obj = {
      foo: new Error()
    };

    test(done, obj);
  });

  it('Function', done => {
    const obj = {
      foo: new Function() // eslint-disable-line no-new-func
    };

    test(done, obj);
  });

  it('RegExp', done => {
    const obj = {
      foo: /[[]]/
    };

    test(done, obj);
  });

  it('null', done => {
    const obj = {
      foo: null
    };

    test(done, obj);
  });

  it('undefined', done => {
    const obj = {
      foo: undefined
    };

    test(done, obj);
  });

  it('NaN', done => {
    const obj = {
      foo: NaN
    };

    test(done, obj);
  });

  describe('Array', () => {
    it('Array #1 (ascii)', done => {
      const obj = {
        foo: ['hello', 'world', '!']
      };

      test(done, obj);
    });

    it('Array #2 (non-ascii)', done => {
      const obj = {
          foo: ['こんにちは', '世界', '！']
      };

      test(done, obj);
    });

    it('Array #3 Array #3 (number)', done => {
      const obj = {
        foo: [0, 1, 2]
      };

      test(done, obj);
    });

    it('Array #4 (boolean)', done => {
      const obj = {
        foo: [true, false, true]
      };

      test(done, obj);
    });

    it('Array #5 (Array)', done => {
      const obj = {
        'foo': ['[]', '[]', '[]']
      };

      test(done, obj);
    });

    it('Array #6 (Object)', done => {
      const obj = {
        foo: [{}, {}, {}]
      };

      test(done, obj);
    });

    it('Array #7 (Date)', done => {
      const obj = {
        foo: [new Date(), new Date(), new Date()]
      };

      test(done, obj);
    });

    it('Array #8 (Error)', done => {
      const obj = {
        foo: [new Error(), new Error(), new Error()]
      };

      test(done, obj);
    });

    it('Array #9 (Function)', done => {
      const obj = {
        foo: [new Function(), new Function(), new Function()]   // eslint-disable-line no-new-func
      };

      test(done, obj);
    });

    it('Array #10 (RegExp)', done => {
      const obj = {
        foo: [/[[]]/, /[[]]/, /[[]]/]
      };

      test(done, obj);
    });

    it('Array #11 (function)', done => {
      const obj = {
        foo: [function () {}, function () {}, function () {}]
      };

      test(done, obj);
    });

    it('Array #12 (null)', done => {
      const obj = {
        foo: [null, null, null]
      };

      test(done, obj);
    });

    it('Array #13 (undefined)', done => {
      const obj = {
        foo: [undefined, undefined, undefined]
      };

      test(done, obj);
    });

    it('Array #14 (NaN)', done => {
      const obj = {
        foo: [NaN, NaN, NaN]
      };
      test(done, obj);
    });
  });

  describe('Object', () => {
    it('Object #1 (ascii)', done => {
      const obj = {
        foo: { bar: 'hello' }
      };

      test(done, obj);
    });

    it('Object #2 (non-ascii)', done => {
      const obj = {
        foo: { bar: 'こんにちは' }
      };

      test(done, obj);
    });

    it('Object #3 (number)', done => {
      const obj = {
        foo: { bar: 3.14 }
      };

      test(done, obj);
    });

    it('Object #4 (boolean)', done => {
      const obj = {
        foo: { bar: false }
      };

      test(done, obj);
    });

    it('Object #5 (Array)', done => {
      const obj = {
        foo: { bar: [1, 2, 3] }
      };

      test(done, obj);
    });

    it('Object #6 (Object)', done => {
      const obj = {
        foo: { bar: {} }
      };

      test(done, obj);
    });

    it('Object #7 (Date)', done => {
      const obj = {
        foo: { bar: new Date() }
      };

      test(done, obj);
    });

    it('Object #8 (Error)', done => {
      const obj = {
        foo: { bar: new Error() }
      };

      test(done, obj);
    });

    it('Object #9 (Function)', done => {
      const obj = {
        foo: { bar: new Function() }    // eslint-disable-line no-new-func
      };

      test(done, obj);
    });

    it('Object #10 (RegExp)', done => {
      const obj = {
        foo: { bar: /[[]]/ }
      };

      test(done, obj);
    });

    it('Object #11 (function)', done => {
      const obj = {
        foo: { bar: function () {} }
      };

      test(done, obj);
    });

    it('Object #12 (null)', done => {
      const obj = {
        foo: { bar: null }
      };

      test(done, obj);
    });

    it('Object #13 (undefined)', done => {
      const obj = {
        foo: { bar: undefined }
      };

      test(done, obj);
    });

    it('Object #14 (NaN)', done => {
      const obj = {
        foo: { bar: NaN }
      };

      test(done, obj);
    });
  });

  describe('Function', () => {
    it('function #1 (ascii)', done => {
      const obj = {
        foo: () => {
          return 'hello';
        }
      };

      test(done, obj);
    });

    it('function #2 (non-ascii)', done => {
      const obj = {
        foo: () => {
          return 'こんにちは';
        }
      };

      test(done, obj);
    });

    it('function #3 (number)', done => {
      const obj = {
        foo: () => {
          return 0;
        }
      };

      test(done, obj);
    });

    it('function #4 (boolean)', done => {
      const obj = {
        foo: () => {
          return false;
        }
      };

      test(done, obj);
    });

    it('function #5 (Array)', done => {
      const obj = {
        foo: () => {
          return [];
        }
      };

      test(done, obj);
    });

    it('function #6 (Object)', done => {
      const obj = {
        foo: () => {
          return {};
        }
      };

      test(done, obj);
    });

    it('function #7 (Date)', done => {
      const obj = {
        foo: () => {
          return new Date();
        }
      };

      test(done, obj);
    });

    it('function #8 (Error)', done => {
      const obj = {
        foo: () => {
          return new Error();
        }
      };

      test(done, obj);
    });

    it('function #9 (Function)', done => {
      const obj = {
        foo: () => {
          return new Function();  // eslint-disable-line no-new-func
        }
      };

      test(done, obj);
    });

    it('function #10 (RegExp)', done => {
      const obj = {
        foo: () => {
          return /[[]]/;
        }
      };

      test(done, obj);
    });

    it('function #11 (function)', done => {
      const obj = {
        foo: () => {
          return () => {
            return undefined;
          };
        }
      };

      test(done, obj);
    });

    it('function #12 (null)', done => {
      const obj = {
        foo: () => {
          return null;
        }
      };

      test(done, obj);
    });

    it('function #13 (undefined)', done => {
      const obj = {
        foo: () => {
          return undefined;
        }
      };

      test(done, obj);
    });

    it('function #14 (NaN)', done => {
      const obj = {
        foo: () => {
          return NaN;
        }
      };

      test(done, obj);
    });
  });

  describe('Array in Array', () => {
    it('Array in Array #1 (ascii)', done => {
      const obj = {
        foo: [
          ['hello', 'world', '!'],
          ['hello', 'world', '!'],
          ['hello', 'world', '!']
        ]
      };

      test(done, obj);
    });

    it('Array in Array #2 (non-ascii)', done => {
      const obj = {
        foo: [
          ['こんにちは', '世界', '！'],
          ['こんにちは', '世界', '！'],
          ['こんにちは', '世界', '！']
        ]
      };

      test(done, obj);
    });

    it('Array in Array #3 (number)', done => {
      const obj = {
        foo: [
          [-1, 0, 1],
          [-1, 0, 1],
          [-1, 0, 1]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #4 (boolean)', done => {
      const obj = {
        foo: [
          [true, false, true],
          [true, false, true],
          [true, false, true]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #5 (Array)', done => {
      const obj = {
        foo: [
          [[], [], []],
          [[], [], []],
          [[], [], []]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #6 (Object)', done => {
      const obj = {
        foo: [
          [{}, {}, {}],
          [{}, {}, {}],
          [{}, {}, {}]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #7 (Date)', done => {
      const obj = {
        foo: [
          [new Date(), new Date(), new Date()],
          [new Date(), new Date(), new Date()],
          [new Date(), new Date(), new Date()]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #8 (Error)', done => {
      const obj = {
        foo: [
          [new Error(), new Error(), new Error()],
          [new Error(), new Error(), new Error()],
          [new Error(), new Error(), new Error()]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #9 (Function)', done => {
      const obj = {
        foo: [
          [new Function(), new Function(), new Function()],   // eslint-disable-line no-new-func
          [new Function(), new Function(), new Function()],   // eslint-disable-line no-new-func
          [new Function(), new Function(), new Function()]    // eslint-disable-line no-new-func
        ]
      };

      test(done, obj);
    });

    it('Array in Array #10 (RegExp)', done => {
      const obj = {
        foo: [
          [/[[]]/, /[[]]/, /[[]]/],
          [/[[]]/, /[[]]/, /[[]]/],
          [/[[]]/, /[[]]/, /[[]]/]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #11 (function)', done => {
      const obj = {
        foo: [
          [function () {}, function () {}, function () {}],
          [function () {}, function () {}, function () {}],
          [function () {}, function () {}, function () {}]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #12 (null)', done => {
      const obj = {
        foo: [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #13 (undefined)', done => {
      const obj = {
        foo: [
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined]
        ]
      };

      test(done, obj);
    });

    it('Array in Array #14 (NaN)', done => {
      const obj = {
        foo: [
          [NaN, NaN, NaN],
          [NaN, NaN, NaN],
          [NaN, NaN, NaN]
        ]
      };

      test(done, obj);
    });
  });

  describe('Object in Object', () => {
    it('Object in Object #1 (ascii)', done => {
      const obj = {
        foo: {
          'hello': 'hello',
          'world': 'world',
          '!': '!'
        }
      };

      test(done, obj);
    });

    it('Object in Object #2 (non-ascii)', done => {
      const obj = {
        foo: {
          'こんにちは': 'こんにちは',
          '世界': '世界',
          '！': '！'
        }
      };

      test(done, obj);
    });

    it('Object in Object #3 (number)', done => {
      const obj = {
        foo: {
          '-1': -1,
          '0': 0,
          '1': 1
        }
      };

      test(done, obj);
    });

    it('Object in Object #4 (boolean)', done => {
      const obj = {
        foo: {
          'true': true,
          'false': false
        }
      };

      test(done, obj);
    });

    it('Object in Object #5 (Array)', done => {
      const obj = {
        foo: {
          '[]': [],
          '[[]]': [[]],
          '[[[]]]': [[[]]]
        }
      };

      test(done, obj);
    });

    it('Object in Object #6 (Object)', done => {
      const obj = {
        foo: {
          '{}': {},
          '{{}}': { '{}': {} },
          '{{{}}}': { '{}': { '{}': {} } }
        }
      };

      test(done, obj);
    });

    it('Object in Object #7 (Date)', done => {
      const obj = {
        foo: {
          'date1': new Date(),
          'date2': new Date(),
          'date3': new Date()
        }
      };

      test(done, obj);
    });

    it('Object in Object #8 (Error)', done => {
      const obj = {
        foo: {
          'error1': new Error(),
          'error2': new Error(),
          'error3': new Error()
        }
      };

      test(done, obj);
    });

    it('Object in Object #9 (Function)', done => {
      const obj = {
        foo: {
          'Function1': new Function(),    // eslint-disable-line no-new-func
          'Function2': new Function(),    // eslint-disable-line no-new-func
          'Function3': new Function()     // eslint-disable-line no-new-func
        }
      };

      test(done, obj);
    });

    it('Object in Object #10 (RegExp)', done => {
      const obj = {
        foo: {
          '/[[]]/': /[[]]/,
          '/[[[]]]/': /[[[]]]/,
          '/[[[[]]]]/': /[[[[]]]]/
        }
      };

      test(done, obj);
    });

    it('Object in Object #11 (function)', done => {
      const obj = {
        foo: {
          'function1': function () {},
          'function2': function () {},
          'function3': function () {}
        }
      };

      test(done, obj);
    });

    it('Object in Object #12 (null)', done => {
      const obj = {
        foo: {
          'null1': null,
          'null2': null,
          'null3': null
        }
      };

      test(done, obj);
    });

    it('Object in Object #13 (undefined)', done => {
      const obj = {
        foo: {
          'undefined1': undefined,
          'undefined2': undefined,
          'undefined3': undefined
        }
      };
      test(done, obj);
    });

    it('Object in Object #14 (NaN)', done => {
      const obj = {
        foo: {
          'NaN1': NaN,
          'NaN2': NaN,
          'NaN3': NaN
        }
      };

      test(done, obj);
    });
  });

  it('Extended Object', done => {
    const Prototype = function () {},
      obj = Object.create(Prototype.prototype);

    Prototype.prototype.foo = function () { return [1, 2, 3]; };
    obj.bar = { 'undefined': 'null' };

    test(done, obj);
  });

  it('Mixed Array #1', done => {
    const obj = {
      foo: [undefined, null, NaN, new Date(), / /],
      bar: {
        1: undefined,
        2: null,
        3: NaN,
        4: new Date(),
        5: / /
      }
    };

    test(done, obj);
  });

  it('Mixed Array #2', done => {
    const obj = [
      { name: 'foo', value: 'bar' },
      { name: 'foo', value: 'bar' },
      { name: 'name', value: 'value' },
      { name: null, value: null },
      { name: undefined, value: undefined },
      { foo: 'name', bar: 'value' },
      { foo: null, bar: null },
      { foo: undefined, bar: undefined },
      { foo: '', bar: '' },
      { foo: 0, bar: 0 },
      { foo: NaN, bar: NaN }
    ];

    test(done, obj);
  });

  it('empty', done => {
    const obj = '';
    test(done, obj);
  });

  it('zero', done => {
    const obj = 0;
    test(done, obj);
  });

  it('false', done => {
    const obj = false;
    test(done, obj);
  });

  it('Date only', done => {
    const obj = new Date();
    test(done, obj);
  });

  it('String only', done => {
    const obj = new String(); // eslint-disable-line no-new-wrappers
    test(done, obj);
  });

  it('Number only', done => {
    const obj = new Number(); // eslint-disable-line no-new-wrappers
    test(done, obj);
  });

  it('Boolean only', done => {
    const obj = new Boolean();    // eslint-disable-line no-new-wrappers
    test(done, obj);
  });

  it('Error only', done => {
    const obj = new Error();
    test(done, obj);
  });

  it('Function only', done => {
    const obj = new Function();   // eslint-disable-line no-new-func
    test(done, obj);
  });

  it('RegExp only', done => {
    const obj = /[[]]/;
    test(done, obj);
  });

  it('NaN only', done => {
    const obj = NaN;
    test(done, obj);
  });

});