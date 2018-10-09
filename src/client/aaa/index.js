import $ from 'jquery';

$.getJSON('/api/users', function (data) {
  $('#target').html(JSON.stringify(data));
});
