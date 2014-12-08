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

##Example

http://volcanotable.meteor.com

##Usage

To use Volcano Table just include the `volcanoTable` template inside of an existing template. The only attribute that is
required when including the `volcanoTable` template is `settings`.

```javascript
<template name="volcanotable_example">

	{{> volcanoTable settings=example_settings}}

</template>
```

Additionally you can specify other attributes that will apply to the table. The additional attributes can also be spceified
in the template helper instead of when calling `volcanoTable`.

```javascript
<template name="volcanotable_example">

	{{> volcanoTable settings=example_settings class="example-table-class" export=true addRecord=true deleteRecord=true pagination=15 sortField="name"}}

</template>
```

Next we need to add our table `settings` inside the template helper. We defined our settings helper as `example_settings`
when including the Volcano Table template.

```javascript
Template.volcanotable_example.helpers({

	// We called example_settings when calling the volcanoTable template
	example_settings : function() {

		return {

			// This lets us know what collection to use when updating, deleting, inserting records
			collection : Clients,

			// The records to output into the table
			// Records can be in the format of a Collection, Cursor, Array
			table_data : Clients.find({}),

			fields : [
				{
					// Defines the field in the collection
					key      : 'name',

					// Displays in the header of the table
					label    : 'Client Name',

					// Specifies that this field will be editable with an input of type text
					input    : 'text',

					// Specify additional attributes for this field
					input_attributes : {
						'class'        : 'name_class',
						'data-example' : 'yes'
					}

					// Indicates that this is a required field
					required : true,

					// When filtering, lets us know we can filter on this field
					filter   : true
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

##Fields

Fields are where everything is setup for all the individual fields in the table.

```javascript

fields : [
	{
		key      : 'name',
		label    : 'Client Name',
		input    : 'text',
		input_attributes : {
			'class'        : 'name_class',
			'data-example' : 'yes'
		}
		required : true,
		filter   : true
	}
```

There are only two options that are required, `key` and `label`. `key` specifies the document in the collection and
`label` specifies the title to be displayed in the table header.

Below is a list of all the available options for fields:
 * ley : Defines the field in the collection.
 * label : Displays in the header of the table
 * input : Specifies that the field will be editable with an input. `text`, `select`, `checkbox`, `textarea`
 * required :
 * fn :
