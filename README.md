#Volcano Table

An editable datatable package for Meteor.

##Features
 * Edit Existing Records
 * Add New Records
 * Delete Records
 * Data Verification
 * Export to CSV
 * Filtering
 * Pagination
 * Sorting

##Usage

To use Volcano Table just include the `volcanoTable` template inside of an existing template.

```javascript
<template name="volcanotable_example">

	{{> volcanoTable settings=example_settings class="example-table-class" export=true addRecord=true deleteRecord=true pagination=15 sortField="name"}}

</template>
```

Next we need to add our table `settings` inside the template helper. We defined our settings helper as `example_settings`
when including the Volcano Table template.

```javascript
Template.volcanotable_example.helpers({
	example_settings : function() {

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
			var industry = industries[i];
			industry_options[industry] = industry;
		}

		return {
			// This lets us know what collection to use when updating, deleting, inserting records
			collection : Clients,

			// The records to output into the table
			// Records can be in the format of a Collection, Cursor, Array
			table_data : Clients.find({}),

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
```
