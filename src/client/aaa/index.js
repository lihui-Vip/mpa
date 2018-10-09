import $ from 'jquery';

const render = require('./index.art');

const data = {

    title: 'My Page',

    msg: '模板测试信息'

};

const html = render(data);
$('.atemplate').html(html);
console.log(html)
$.getJSON('/api/users', function (data) {
  $('#target').html(JSON.stringify(data));
});
