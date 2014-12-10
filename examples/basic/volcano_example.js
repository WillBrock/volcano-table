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
				collection : Clients,
				table_data : Clients.find(),

				fields : [
					{
						key      : 'name',
						label    : 'Client Name',
						input    : 'text',
						required : true,
						filter   : true,
						input_attributes : {
							'class'        : 'name_class',
							'data-example' : 'yes'
						}
					},
					{
						key            : 'industry',
						label          : 'Industry',
						input          : 'select',
						fiter          : true,
						select_options : industry_options,
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
							var parts = record.annual_sales.toString().split(".");
							parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return parts.join(".");
						}
					}
				]
			};
		}
	});
}
