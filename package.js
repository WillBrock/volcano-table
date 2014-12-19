Package.describe({
  name: 'wilbur:volcano-table',
  summary: 'Volcano Table - an editable datatable for Meteor',
  version: '0.0.2',
  git: 'https://github.com/WillBrock/volcano-table'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('reactive-var@1.0.3');

  api.addFiles('lib/volcanotable.js', ['client', 'server']);

  api.addFiles('lib/volcanotable.html', 'client');
  api.addFiles('lib/volcanotable_client.js', 'client');
  api.addFiles('lib/volcanotable.css', 'client');
  api.addFiles('lib/img/delete.png', 'client');
  api.addFiles('lib/img/excel.png', 'client');

  api.addFiles('lib/volcanotable_server.js', ['server', 'client']);

  api.export('VolcanoTable','server');

});
