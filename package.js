Package.describe({
  name: 'willbrock:volcano-table',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('reactive-var@1.0.3');

  api.addFiles('lib/volcanotable.html', 'client');
  api.addFiles('lib/volcanotable.js', 'client');
  api.addFiles('lib/volcanotable.css', 'client');
});
