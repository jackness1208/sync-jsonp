import syncJsonp from '../../../../output/sync-jsonp';
import wDemo from '../../components/widget/demo/demo';
import './index.scss';
wDemo();

// test usage
const reqUrl = 'http://w.yy.com/task/center/signininfo';
syncJsonp(reqUrl).then((data) => {
  console.log('test 01 back', data);
});

syncJsonp(reqUrl, {a: +new Date()}).then((data) => {
  console.log('test 02 back', data);
});

syncJsonp(reqUrl, null, {timeout: 100}).then((data) => {
  console.log('test 03 back', data);
});