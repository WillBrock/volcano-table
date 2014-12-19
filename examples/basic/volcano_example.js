if(Meteor.isServer) {

	// Define your collection criteria here
	// e.g. The where clause passed to find inside of Meteor.publish
	VolcanoTable(Clients, 'volcanotable_example', {
		//location : { $in : ['Orlando', 'Tampa', 'Dallas'] }
	});

	Clients.allow({
		insert : function() {
			return true;
		},

		update : function() {
			return true;
		},

		remove : function() {
			return true;
		}
	});
}

if(Meteor.isClient) {
	Template.volcanotable_example.helpers({
		settings : function() {

			var industries = [
				'Retail',
				'Sales',
				'Software',
				'Construction',
				'Engineering',
				'Publishing',
				'Media',
				'Hospitality'
			];

			var industry_options = {};
			for(var i = 0; i < industries.length; i++) {
				var industry               = industries[i];
				industry_options[industry] = industry;
			}

			return {

				// The collection that the data is coming from
				collection : Clients,

				fields : [
					{
						// Defines the field in the collection
						key      : 'name',

						// Displays in the header of the table
						label    : 'Client Name',

						// Specifies that this field will be editable with an input of type text
						input    : 'text',

						// Indicates that this is a required field
						// when inserting or updating the field
						required : true,

						// Determines if this field can be filtered on
						filter   : true,

						// Specify additional attributes for this field
						input_attributes : {
							'class'        : 'name_class',
							'data-example' : 'yes'
						}
					},
					{
						key            : 'industry',
						label          : 'Industry',
						input          : 'select',
						filter         : true,
						select_options : industry_options,

						// Outputs an empty option for the select box
						empty_option   : true,
					},
					{
						key    : 'location',
						label  : 'Location',
						input  : 'text',
						filter : true
					},
					{
						key    : 'phone',
						label  : 'Phone',
						input  : 'text',
						filter : true
					},
					{
						key    : 'founded',
						label  : 'Founded',
						filter : true
					},
					{
						key    : 'annual_sales',
						label  : 'Annual Sales',
						fn     : function(value, record) {
							var sales = record.annual_sales;
							if(!sales) {
								return;
							}

							var parts = sales.toString().split(".");
							parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

							return parts.join(".");
						}
					}
				]
			};
		}
	});
}
