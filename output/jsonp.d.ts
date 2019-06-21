export interface IOpt {
    param?: string;
    timeout?: number;
    prefix?: string;
    name?: string;
}
declare type jsonpCallback = (error: any, data?: any) => any;
declare type TCancel = (...args: any[any]) => any;
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
declare function jsonp(url: string, opts?: IOpt, fn?: jsonpCallback): TCancel;
export default jsonp;
