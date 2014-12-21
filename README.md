#Volcano Table

An editable datatable package for Meteor.

##Features
 * Only downloads data to the client as it's needed
 * Suitable for very large datasets
 * Edit Existing Records
 * Add New Records
 * Delete Records
 * Data Verification
 * Filtering
 * Pagination
 * Sorting

##Example

http://volcano.meteor.com

## Installation

```bash
meteor add wilbur:volcano-table
```

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

	{{> volcanoTable settings=example_settings class="example-table-class" addRecord=true deleteRecord=true pagination=15 sortField="name"}}

</template>
```

###Available Options

 * `settings`     : Spceify the helper where the table settings will reside.
 * `class`        : Adds aditional classes to the table.
 * `addRecord`    : Allow adding a new record to the table.
 * `deleteRecord` : Allow deleting a record from the table.
 * `pagination`   : Paginate the table.
 * `sortField`    : Specifies a default sort that will be added to the table, use the `key` from one of the fields.

Next we need to let the server know what data we want it to return. The is how we securley return records from the Meteor.publish.
This is where we will need to specify the collection, template and our where clause.

```javascript
if(Meteor.isServer) {
	VolcanoTable(Collection, 'volcanotable_example', {
		location : { $in : ['Orlando', 'Tampa', 'Dallas'] }
	});
}
```

Now we need to add our table `settings` inside the template helper. We defined our settings helper as `example_settings`
when including the Volcano Table template.

```javascript
Template.volcanotable_example.helpers({

	// We called example_settings when calling the volcanoTable template
	example_settings : function() {

		return {

			// The collection that the data is coming from
			collection : Clients,

			// Additionally, 'where' can be used here as well and will filter out results that are already published
			where : {
				location : 'Tampa'
			},

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
					// when inserting or updating the field
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
 * `key`              : Defines the field in the collection.
 * `label`            : Displays in the header of the table.
 * `input`            : Specifies that the field will be editable with an input. `text`, `select`, `checkbox`, `textarea`
 * `required`         : Specifies that the field is required.
 * `fn`               : Defines a function. The first parameter is the current value of the `key` and the second parameter is the current record.
 * `input_attributes` : Object of different attributes to apply to an input.

##Styling

Very minimal styling is done on the table which is intended. Styling can easily be done with Bootstrap or Semantic. There is also default
styling included that can be used which is located in the generic_table.css file.
