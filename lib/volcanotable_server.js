
var VolcanoTableCollections = {};

VolcanoTable = function(collection, template, filter) {

	VolcanoTableCollections[template] =collection;
	
	Meteor.publish(template, function(data) {
		filter = filter || {};
		_.extend(filter, data.filter || {});
	 
		return collection.find(filter, data.options);
	});

	Meteor.publish('VolcanoTableCounts', function(data) {
		var collection = VolcanoTableCollections[data.template];
		var count = collection.find(data.filter || {}).count();
	
		// console.log(" VolcanoTableCounts for template: "+data.template+", count="+count );
		this.added('VolcanoTableCounts', data.template, { count : count });
		this.ready();
	});
};




