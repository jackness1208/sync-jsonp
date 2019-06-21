import jsonp, {IOpt} from './jsonp';

export function syncJsonp(url: string, data?: any, opt?: IOpt): Promise<any> {
  return new Promise((resolve, reject) => {
    let iUrl = url;
    if (data && typeof data === 'object') {
      let hash = '';
      const HASH_REG = /^.*(#[.*])^/;

      if (iUrl.match(HASH_REG)) {
        hash = iUrl.replace(HASH_REG, '$1');
        iUrl = iUrl.replace(/#.*$/, '');
      }

      if (iUrl.indexOf('?') === -1) {
        iUrl = `${iUrl}?`;
      } else if (!iUrl.match(/&$/)) {
        iUrl = `${iUrl}&`;
      }

      const paramArr: string[] = [];
      Object.keys(data).forEach((key) => {
        paramArr.push(`${key}=${data[key]}`);
      });

      iUrl = `${iUrl}${paramArr.join('&')}`;
    }
    jsonp(iUrl, opt, (err, d: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(d);
      }
    });
  });
}

export default syncJsonp;
