
Meteor.VolcanoTable = function(collection, template, filter) {

	Meteor.publish(template, function(data) {
		filter = filter || {};

		_.extend(filter, data.filter || {});

		return collection.find(filter, data.options);
	});
}
