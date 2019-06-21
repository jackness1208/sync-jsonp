# sync-jsonp

## 安装
```bash
npm install sync-jsonp --save
```
## 使用
```javascript
import syncJsonp from 'sync-jsonp'
```

## api
### syncJsonp(url, data, opts): Promise
- `url` (string) url to fetch
- `data` (object) send param, optional
- `opts` (`Object`), optional
  - `param` (`String`) name of the query string parameter to specify
    the callback (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. `0` to
    disable (defaults to `60000`)
  - `prefix` (`String`) prefix for the global callback functions that
    handle jsonp responses (defaults to `__jp`)
  - `name` (`String`) name of the global callback functions that
    handle jsonp responses (defaults to `prefix` + incremented counter)


