export interface IOpt {
  param?: string;
  timeout?: number;
  prefix?: string;
  name?: string;
}

type jsonpCallback = (error: any, data?: any) => any;
type TCancel = (...args: any[any]) => any;

let count = 0;

function noop() {
  // empty
}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */
function jsonp(url: string, opts?: IOpt, fn?: jsonpCallback): TCancel {
  if ('function' === typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) {
    opts = {};
  }

  const prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  const id: string = opts.name || (prefix + (count++));

  const param = opts.param || 'callback';
  const timeout = null != opts.timeout ? opts.timeout : 60000;
  const enc = encodeURIComponent;
  const target = document.getElementsByTagName('script')[0] || document.head;
  let script: any;
  let timer: any;

  if (timeout) {
    timer = setTimeout(() => {
      cleanup();
      if (fn) {
        fn(new Error('Timeout'));
      }
    }, timeout);
  }

  function cleanup() {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
    window[id] = noop;
    if (timer) {
      clearTimeout(timer);
    }
  }

  function cancel() {
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = (data: any) => {
    cleanup();
    if (fn) {
      fn(null, data);
    }
  };

  // add qs component
  url += (url.indexOf('?') !== -1 ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  // create script
  script = document.createElement('script');
  script.src = url;
  if (target && target.parentNode) {
    target.parentNode.insertBefore(script, target);
  }

  return cancel;
}

export default jsonp;
