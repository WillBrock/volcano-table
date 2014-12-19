
VolcanoTable = function(collection, template, filter) {

	Meteor.publish(template, function(data) {
		filter = filter || {};
		_.extend(filter, data.filter || {});

		return collection.find(filter, data.options);
	});

	Meteor.publish('VolcanoTableCounts', function(data) {
		var count = collection.find(data.filter || {}).count();

		this.added('VolcanoTableCounts', data.template, { count : count });
		this.ready();
	});
};


