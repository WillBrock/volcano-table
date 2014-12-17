
VolcanoTable = function(collection, template) {
	this.options = {};
	//filter = filter || null;
	this.template = template;
	this.collection = collection;
	this.table_data = collection;

	/*
	if(fitler) {
		this.set(fitler);
	}
	*/

	/*
	Meteor.publish(template, function(data) {
		filter = filter || {};

		_.extend(filter, data.filter || {});

		return collection.find(filter, data.options);
	});
	*/

	//Meteor.publish()
};

VolcanoTable.prototype.set = function(options) {
	if(options.where && Meteor.isServer) {
		this.options.where = options.where;
	}

	delete options.where;

	this.options = options;
	this.options.table_data = this.collection;
	this.options.collection = this.collection;

	console.log('aaa');
	console.log(this);
	console.log('bbb');

	if(Meteor.isClient) {
		Template[this.template].helpers({
			settings : function() {
				return this.options;
			}
		});
	}
};

VolcanoTable.prototype.get = function(key) {
	return this.options[key];
}
