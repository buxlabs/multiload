'use strict';

var fs = require('fs');
var path = require('path');

function pad (value, pad, left = true) {
  if (!pad) { return value }
  if (Object.is(pad, Number(pad))) {
    pad = ' '.repeat(pad);
  }
  return String(value).split(/\r\n|\n/).map(line => {
    if (!line) return line
    return left ? pad + line : line + pad
  }).join('\n')
}

var pad_1 = pad;

function trim (string) {
  return string.trim()
}

var trim_1 = trim;

function ltrim (string, characters = ' ') {
  let counter;
  let character;

  while (true) {
    counter = 0;

    for (let i = 0, ilen = characters.length; i < ilen; i++) {
      character = characters[i];

      if (string.startsWith(character)) {
        counter += 1;
        string = string.substring(1);
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

var ltrim_1 = ltrim;

function rtrim (string, characters = ' ') {
  let counter;
  let character;
  let indexEnd = string.length - 1;

  while (true) {
    counter = 0;

    for (let i = characters.length - 1; i >= 0; i--) {
      character = characters[i];

      if (string.endsWith(character)) {
        counter += 1;
        string = string.substring(0, indexEnd);
        indexEnd -= 1;
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

var rtrim_1 = rtrim;

function strip (string, pattern) {
  if (!pattern) return string.trim()
  if (!Array.isArray(pattern)) {
    if (pattern.length === 1) {
      const regExp = new RegExp(pattern, 'g');
      return string.replace(regExp, '')
    }
    const start = string.indexOf(pattern);
    const end = start + pattern.length;
    return string.substr(0, start - 1) + '' + string.substr(end)
  }
  const regExp = new RegExp(pattern.join('|'), 'g');
  return string.replace(regExp, '')
}

var strip_1 = strip;

function uppercase (string) {
  return string.toUpperCase()
}

var uppercase_1 = uppercase;

function underscore (string) {
  string = string.trim();
  const specialCharacters = /[^a-zA-Z0-9]/g;

  for (let i = 1; i < string.length; i += 1) {
    const character = string[i];
    const previousCharacter = string[i - 1];

    if (character === ' ') {
      string = string.substr(0, i) + '_' + string.substr(i).trim();
    } else if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1);
    } else if (Number.isInteger(Number(previousCharacter)) && !Number.isInteger(Number(character))) {
      string = string.substr(0, i) + '_' + string.substr(i);
    } else if ((previousCharacter.toUpperCase() !== previousCharacter) && character.toUpperCase() === character) {
      string = string.substr(0, i) + '_' + string.substr(i);
    }
  }
  return string.toLowerCase()
}

var underscore_1 = underscore;

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.substr(1)
}

var capitalize_1 = capitalize;

function unescape (string) {
  const entities = new Map([
    ['&amp;', '&'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&quot;', '"'],
    ['&39;', '\'']
  ]);

  entities.forEach((value, key) => {
    if (string.includes(key)) {
      string = string.replace(new RegExp(key, 'g'), value);
    }
  });

  return string
}

var _unescape = unescape;

function lowerfirst (string) {
  return string.charAt(0).toLowerCase() + string.substr(1)
}

var lowerfirst_1 = lowerfirst;

function lowercase (string) {
  return string.toLowerCase()
}

var lowercase_1 = lowercase;

function humanize (string, capitalize = true) {
  string = string.replace(/_/g, ' ');
  return capitalize ? string.charAt(0).toUpperCase() + string.substr(1) : string
}

var humanize_1 = humanize;

function titleize (string) {
  return string.split(' ').map(word => word.substr(0, 1).toUpperCase() + word.substr(1)).join(' ')
}

var titleize_1 = titleize;

function dasherize (string) {
  return string.replace(/_/g, '-')
}

var dasherize_1 = dasherize;

function classify (string) {
  if (string.endsWith('s')) {
    return string.charAt(0).toUpperCase() + string.substr(1, string.length - 2)
  }
  return string.charAt(0).toUpperCase() + string.substr(1)
}

var classify_1 = classify;

function pluralize (string) {
  const endings = ['ch', 's', 'ss', 'sh', 'x', 'o'];
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const last = string.charAt(string.length - 1);
  const lasts = string.substr(string.length - 2);

  if (endings.includes(last) || endings.includes(lasts)) {
    return string.concat('es')
  }

  if (string.endsWith('f')) {
    return string.replace(last, 'ves')
  }

  if (string.endsWith('fe')) {
    return string.replace(lasts, 'ves')
  }

  if (string.endsWith('y') && !vowels.includes(string.charAt(string.length - 2))) {
    return string.replace(last, 'ies')
  }

  return string.concat('s')
}

var pluralize_1 = pluralize;

function singularize (string, appendix = '') {
  if (string.endsWith('ves')) {
    return string.substr(0, string.length - 3).concat(appendix || 'fe')
  }

  if (string.endsWith('ies')) {
    return string.substr(0, string.length - 3).concat(appendix || 'y')
  }

  if (string.endsWith('es')) {
    return string.substr(0, string.length - 2).concat(appendix)
  }

  return string.substr(0, string.length - 1)
}

var singularize_1 = singularize;

function swapcase (string) {
  return [...string].map(character => {
    return character.toUpperCase() === character ? character.toLowerCase() : character.toUpperCase()
  }).join('')
}

var swapcase_1 = swapcase;

function camelize (string, lowercased = false) {
  const endings = /[^(a-zA-Z0-9)]|_|\s/g;
  string = string.trim();
  string = string.charAt(0)[lowercased ? 'toUpperCase' : 'toLowerCase']() + string.substr(1);

  for (let i = 1, ilen = string.length; i < ilen; i += 1) {
    if (endings.test(string[i])) {
      string = string.substr(0, i) + string.charAt(i + 1).toUpperCase() + string.substr(i + 2);
    }
  }

  return string
}

var camelize_1 = camelize;

function constantize (string) {
  const specialCharacters = /[^a-zA-Z0-9]/g;
  string = string.replace(/\s+/g, ' ');

  for (let i = 1; i < string.length; i += 1) {
    const character = string.charAt(i);
    const previousCharacter = string.charAt(i - 1);

    if (character === '_' || previousCharacter === '_') continue

    if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1);
    } else if (character.toUpperCase() === character && previousCharacter.toLowerCase() === previousCharacter) {
      string = string.substr(0, i) + '_' + string.substr(i);
    }
  }

  return string.toUpperCase()
}

var constantize_1 = constantize;

function truncate (string, length = 30, ending = '...') {
  if (string.length > length) {
    return string.substr(0, length - ending.length).concat(ending)
  }
  return string
}

var truncate_1 = truncate;

function repeat (string, count) {
  return string.repeat(count)
}

var repeat_1 = repeat;

function singlespace (string) {
  return string.replace(/\s\s+/g, ' ')
}

var singlespace_1 = singlespace;

function whitespacestrip (string) {
  return string.replace(/\s/g, '')
}

var whitespacestrip_1 = whitespacestrip;

function quote (string, lang = 'en') {
  return lang === 'en' ? `"${string}"` : `„${string}”`
}

var quote_1 = quote;

function unquote (string) {
  if (string.startsWith('"') && string.endsWith('"')) return string.substr(1, string.length - 2)
  if (string.startsWith('„') && string.endsWith('”')) return string.substr(1, string.length - 2)
  return string
}

var unquote_1 = unquote;

function squeeze (string, pattern = 'a-zA-Z') {
  string = string.replace(/\s+/g, ' ');
  const regExp = new RegExp(`[${pattern}]`);
  for (let i = 1; i < string.length; i++) {
    const currentCharacter = string[i];
    const previousCharacter = string[i - 1];
    if (regExp.test(currentCharacter) && currentCharacter === previousCharacter) {
      string = string.substr(0, i) + string.substr(i + 1);
      i--;
    }
  }
  return string
}

var squeeze_1 = squeeze;

function summarize (string, length = 100) {
  return string.length >= length ? string.concat('...') : string
}

var summarize_1 = summarize;

function wrap (string, first, last = first) {
  if (!first) return string
  return first + string + last
}

var wrap_1 = wrap;

function unwrap (string, first, last = first) {
  if (!first) return string
  if (string.startsWith(first)) string = string.substr(1);
  if (string.endsWith(last)) string = string.substr(0, string.length - 1);

  return string
}

var unwrap_1 = unwrap;

function replace (string, pattern, newString) {
  return string.replace(pattern, newString)
}

var replace_1 = replace;

function chop (string) {
  if (!string) return string
  const match = string.match(/(\r\n)+$/);
  return match ? string.substr(0, match.index) : string.substr(0, string.length - 1)
}

var chop_1 = chop;

function chomp (string, pattern) {
  if (!string) return string
  if (!pattern) {
    const match = string.match(/(\r\n)+$/);
    if (match) return string.substr(0, match.index)
    if (string.endsWith('\n') || string.endsWith('\r')) return string.substr(0, string.length - 1)
  }

  const match = string.match(new RegExp(`${pattern}+$`), '');
  return match ? string.substr(0, match.index) : string
}

var chomp_1 = chomp;

function dot (string) {
  return string.endsWith('.') ? string : string.concat('.')
}

var dot_1 = dot;

function crop (string, length, append = '...') {
  if (string.length < length) return string
  string = string.substr(0, length + 1);
  return string.substr(0, string.lastIndexOf(' ')) + append
}

var crop_1 = crop;

function hyphenate (string) {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;
  const camelCase = /[a-z]{1}[A-Z]{1}/g;
  const group = string.match(camelCase);

  string = string.replace(nonWords, '');
  string = string.trim();
  string = string.replace(/\s+/g, '-');

  if (group) {
    group.forEach(element => {
      const index = string.indexOf(element);
      string = string.substring(0, index + 1) + '-' + string.substr(index + 1);
    });
  }

  return string.toLowerCase()
}

var hyphenate_1 = hyphenate;

function slugify (string, separator = '-') {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;
  string = string.replace(nonWords, '');
  string = string.trim();
  string = string.replace(/\s+/g, separator);

  return string.toLowerCase()
}

var slugify_1 = slugify;

function initials (string, separator = '') {
  if (!Array.isArray(string)) {
    string = string.replace('-', ' ');
    return string.split(' ').map(name => name[0].toUpperCase()).join(separator)
  }
  return string.map(element => {
    element = element.replace('-', ' ');
    return element.split(' ').map(name => name[0].toUpperCase()).join(separator)
  })
}

var initials_1 = initials;

function htmlstrip (string) {
  string = string.replace(/'|:|\/|\./g, '');
  return string.replace(/(<[a-z]+((\s?)(([a-z]-?)+="(\/?[a-z]*\s?)+(|\s?)")?)+>)|<\/[a-z]*>/g, '')
}

var htmlstrip_1 = htmlstrip;

function tail (string, length = 30, ending = '...') {
  if (string.length > length) {
    return ending + string.substr(string.length - length + ending.length)
  }
  return string
}

var tail_1 = tail;

function split (string, separator) {
  return string.split(separator)
}

var split_1 = split;

function celsius (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')));
    return Math.round(string - 273.15) + '°C'
  }
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')));
    return Math.round((string - 32) * 5 / 9) + '°C'
  }
  if (string.endsWith('°C')) {
    return string
  }
  return string + '°C'
}

var celsius_1 = celsius;

function fahrenheit (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')));
    return Math.round((string - 273.15) * 1.8000 + 32) + '°F'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')));
    return Math.round(string * 9 / 5 + 32) + '°F'
  }
  if (string.endsWith('°F')) {
    return string
  }
  return string + '°F'
}

var fahrenheit_1 = fahrenheit;

function kelvin (string) {
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')));
    return Math.round((string + 459.67) * 5 / 9) + 'K'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')));
    return Math.round(string + 273.15) + 'K'
  }
  if (string.endsWith('K')) {
    return string
  }
  return string + 'K'
}

var kelvin_1 = kelvin;

function uid (length = 32) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}

var uid_1 = uid;

function bytes (string) {
  const [, size, dimension] = string.match(/^(\d+)(B|KB|MB|GB|TB|PB|EB|ZB|YB)$/i) || [null, null, null];

  if (!size || !dimension) {
    return null
  }

  const dimensions = {
    B: 2 ** 0,
    KB: 2 ** 10,
    MB: 2 ** 20,
    GB: 2 ** 30,
    TB: 2 ** 40,
    PB: 2 ** 50,
    EB: 2 ** 60,
    ZB: 2 ** 70,
    YB: 2 ** 80
  };

  return size * dimensions[dimension]
}

var bytes_1 = bytes;

function index (string, pattern, start = 0) {
  return string.indexOf(pattern, start)
}
















































var string = {
  pad: pad_1,
  trim: trim_1,
  ltrim: ltrim_1,
  rtrim: rtrim_1,
  strip: strip_1,
  uppercase: uppercase_1,
  underscore: underscore_1,
  capitalize: capitalize_1,
  unescape: _unescape,
  lowerfirst: lowerfirst_1,
  lowercase: lowercase_1,
  humanize: humanize_1,
  titleize: titleize_1,
  dasherize: dasherize_1,
  classify: classify_1,
  pluralize: pluralize_1,
  singularize: singularize_1,
  swapcase: swapcase_1,
  camelize: camelize_1,
  constantize: constantize_1,
  truncate: truncate_1,
  repeat: repeat_1,
  singlespace: singlespace_1,
  whitespacestrip: whitespacestrip_1,
  quote: quote_1,
  unquote: unquote_1,
  squeeze: squeeze_1,
  summarize: summarize_1,
  wrap: wrap_1,
  unwrap: unwrap_1,
  replace: replace_1,
  index,
  chop: chop_1,
  chomp: chomp_1,
  dot: dot_1,
  crop: crop_1,
  hyphenate: hyphenate_1,
  slugify: slugify_1,
  initials: initials_1,
  htmlstrip: htmlstrip_1,
  tail: tail_1,
  split: split_1,
  celsius: celsius_1,
  fahrenheit: fahrenheit_1,
  kelvin: kelvin_1,
  uid: uid_1,
  bytes: bytes_1
};
var string_6 = string.uppercase;
var string_8 = string.capitalize;
var string_10 = string.lowercase;
var string_18 = string.camelize;

var decorators = {
  capitalize: string_8,
  lowercase: string_10,
  uppercase: string_6,
  camelize: string_18,
  eventize (string$$1) {
    return string$$1.replace('/', ':').replace('\\', ':').replace(/([A-Z])/g, ':$1').toLowerCase()
  },
  uppercase (string$$1) {
    return string$$1.toUpperCase()
  }
};

var decorators$1 = {

  predefined (modules, name) {
    var decorator = decorators[name];
    if (!decorator) {
      throw new Error('Decorator: ' + name + " doesn't exist")
    }
    return this.decorate(modules, decorator)
  },

  decorate (modules, decorator) {
    Object.keys(modules).forEach(function (key) {
      var result = decorator(key, modules[key]);
      modules[result] = modules[key];
      delete modules[key];
    });
    return modules
  }
};

var files = {

  walk (dir, subdir) {
    var results = [];

    var list = fs.readdirSync(dir);
    list.forEach(function (asset) {
      var route = path.join(dir, asset);

      var filepath = subdir ? path.join(subdir, asset) : asset;

      var stat = fs.statSync(route);
      if (stat.isDirectory()) {
        results = results.concat(this.walk(route, filepath));
      } else {
        results.push(filepath);
      }
    }, this);
    return results
  },

  load (dir, cfg) {
    if (cfg.recursive) {
      return this.walk(dir)
    }
    return fs.readdirSync(dir)
  },

  each (dir, cfg, callback, context) {
    var assets, asset, i, ilen, name;

    assets = this.load(dir, cfg);
    for (i = 0, ilen = assets.length; i < ilen; i += 1) {
      name = assets[i];
      asset = fs.statSync(dir + '/' + name);
      callback(asset, name);
    }
  }

};

var multiload = {
  extensionLoad (path$$1, cfg) {
    var ret = {};
    files.each(path$$1, cfg, function (asset, name) {
      if (!asset.isDirectory()) {
        var content = fs.readFileSync(path$$1 + '/' + name, 'utf8');

        var moduleName = name.replace('.' + cfg.extension, '');
        ret[moduleName] = content;
      }
    });
    return ret
  },

  exclude (modules, exclude) {
    if (Array.isArray(exclude)) {
      for (var i = 0, ilen = exclude.length; i < ilen; i += 1) {
        delete modules[exclude[i]];
      }
    } else {
      delete modules[exclude];
    }
    return modules
  },

  decorate (modules, cfg) {
    var method = cfg.decorate;

    if (typeof method === 'function') {
      return decorators$1.decorate(modules, method)
    }
    return decorators$1.predefined(modules, method)
  }

};

function load (path$$1, cfg) {
  var modules;

  if (typeof path$$1 !== 'string' || !path$$1) {
    throw new Error('multiload: path has to be defined properly')
  }

  cfg = typeof cfg === 'object' && !Array.isArray(cfg) ? cfg : {};

  if (typeof cfg.extension === 'string') {
    modules = multiload.extensionLoad(path$$1, cfg);
  }

  if (cfg.decorate) {
    multiload.decorate(modules, cfg);
  }

  if (cfg.exclude) {
    modules = multiload.exclude(modules, cfg.exclude);
  }

  // check if there's at least one module that has been loaded
  // otherwise throw an error
  if (Object.keys(modules).length === 0) {
    throw new Error('multiload: no modules found, check folder and options')
  }
  // we want to return the modules as an array
  if (cfg.as === 'values') {
    return Object.keys(modules).map(function (key) { return modules[key] })
  }

  return modules
}

module.exports = load;
