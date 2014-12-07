/**
 * Format the records that were passed in
 * @param  Collection, Cursor or Array
 * @return Collection
 */
var normalizeRecords = function(table_data) {
	// table_data are already a collection so nothing to do
	if(table_data instanceof Meteor.Collection) {
		return table_data;
	}
	// Check if an array or cursor was passed in
	else if(_.isArray(table_data) || _.isFunction(table_data.fetch)) {
		var tmp_records = _.isArray(table_data) ? table_data : table_data.fetch();
		var collection  = new Meteor.Collection(null);

		_.each(tmp_records, function(doc) {
			collection.insert(doc);
		});

		return collection;
	}
	else {
		console.warn('Invalid table_data passed in');
	}
};

/**
 * Main function to initalize data and set defults
 */
var initalize = function() {
	this.data.id                    = _.uniqueId();
	this.data.where                 = new ReactiveVar({});
	this.data.sort                  = new ReactiveVar({ _id : 1 });
	this.data.currentPage           = new ReactiveVar(1);
	this.data.totalPages            = new ReactiveVar(0);
	this.data.currentDataFieldValue = new ReactiveVar();

	if(!_.isUndefined(this.data.sortField)) {
		var data         = this.data.sortField.split(" ");
		var field        = data[0];
		var order        = data[1] === 'desc' ? -1 : 1;
		var sort_data    = {};
		sort_data[field] = order;

		this.data.sort.set(sort_data);
	}

	var pagination_number = 5000;
	if(!_.isUndefined(this.data.pagination)) {
		pagination_number = this.data.pagination;
	}

	this.data.paginationNumber    = pagination_number;
	this.data.initalized          = true;
	this.data.settings.table_data = normalizeRecords(this.data.settings.table_data);
};

/**
 * Supported inputs
 * @return array supported inputs
 */
var supportedInputs = function() {
	return [
		'text',
		'select',
		'checkbox',
		'textarea',
		'number'
	];
};

/**
 * Generates an input for the table or adding a new record
 * @param  string   input_type
 * @param  string   key
 * @param  string   value
 * @param  bool     add_record
 * @return string
 */
var getInput = function(input_type, key, value, add_record) {
	value              = value || '';
	add_record         = add_record || false;
	var input          = null;
	var attributes     = [];
	var tmp_attributes = this.input_attributes;

	if(!_.contains(supportedInputs(), input_type)) {
		console.warn('The input ' + input_type + ' is not supported');
		return value;
	}

	if(tmp_attributes) {
		if(!_.isObject(tmp_attributes)) {
			console.warn('input_attributes must be an object');
		}

		_.each(tmp_attributes, function(value, key) {
			var tmp = key + '="' + value;
			if(add_record && key === 'class') {
				tmp += ' volcanotable-ui-input volcanotable-add-input-min-width';
			}

			tmp += '"';
			attributes.push(tmp);
		});
	}
	else if(add_record) {
		attributes.push('class="volcanotable-ui-input volcanotable-add-input-min-width"');
	}

	attributes = attributes.join(' ');

	switch(input_type) {
		case 'text'     :
		case 'checkbox' :
		case 'number'   :
				input = '<input type="' + input_type + '" ' + attributes + ' data-field="' + key + '" value="' + value + '">';

		break;

		case 'select' :
				var select_options = this.select_options;
				var select         = [];
				if(!select_options) {
					console.warn('No select options were defined');
				}

				select.push('<select data-field="' + key + '" ' + attributes + '>');
				if(this.empty_option) {
					select.push('<option value=""></option>');
				}

				_.each(select_options, function(display, select_value) {
					var selected = select_value === value ? 'selected' : '';
					select.push('<option value="' + select_value + '" ' + selected + '>' + display + '</option>');
				});

				select.push('</select>');
				input = select.join(' ');

		break;

		case 'textarea' :
				input = '<textarea data-field="' + key + '" ' + attributes + '>' + value + '</textarea>';
		break;
	}

	return input;
};

/**
 * Get the collection that is associated with a template
 * @param  object     template
 * @return collection
 */
var getCollection = function(template) {
	var collection = null;
	if(template.data.settings.table_data instanceof Meteor.Collection) {
		collection = template.data.settings.table_data;
	}
	else {
		collection = template.data.settings.collection;
	}

	return collection;
}

Template.volcanoTable.created  = initalize;
Template.volcanoTable.rendered = function () {
	if (!this.data.initalized) {
		initalize.call(this);
	}
};

Template.volcanoTable.helpers({

	initalize : function() {
		if(!this.initalized) {
			initalize.call(Template.instance());
		}
	},

	records : function() {
		var where        = this.where.get();
		var sort         = this.sort.get();
		var current_page = this.currentPage.get();
		var limit        = this.paginationNumber;
		var skip         = (current_page - 1) * limit;
		this.fields      = this.settings.fields;

		// console.log(current_page);
		// console.log(sort);
		// console.log(skip);
		// console.log(limit);

		// @todo Fina a more efficent way of doing this
		var record_count = this.settings.table_data.find(where).count();
		this.totalPages.set(Math.ceil(record_count / this.paginationNumber));

		return this.settings.table_data.find(where, {
			sort  : sort,
			skip  : skip,
			limit : limit
		});
	},

	fields : function() {
		return this.settings.fields;
	},

	getLabel : function() {
		return this.label;
	},

	getData : function(data) {
		var fn    = this.fn || function(value) { return value; };
		var key   = this.key;
		// Split the key to handle documents
		var keys  = key.split('.');
		var value = data;

		for(var i = 0; i < keys.length; i++) {
			var current_key = keys[i];
			if(_.isObject(value) && !_.isUndefined(value[current_key])) {
				value = value[current_key];
			}
			else {
				value = null;
			}
		}

		// Check if an input was defined
		// If there is a function defined use that instead
		var input = this.input || false;
		if(input && !this.fn) {
			value = getInput.call(this, input, key, value);
		}

		return fn(value, data);
	},

	setInput : function() {
		return getInput.call(this, this.input, this.key, false, true);
	},

	// Determine whether or not to display the filter input
	displayFilter : function() {
		var fields = this.settings.fields;
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];
			if(field.filter) {
				return true;
			}
		}

		return false;
	},

	// Returns the current sort order
	getSort : function() {
		return this.sort_order;
	},

	getCurrentPage : function() {
		return this.currentPage.get();
	},

	getTotalPages : function() {
		return this.totalPages.get();
	},

	ascending : function() {
		var defined = _.isUndefined(this.sort_order);
		return (!defined || this.sort_order == 1);
	}

});

Template.volcanoTable.events({

	// Changing values in the table
	'change [data-field]' : function(e, template) {
		var $this      = $(e.target);
		//var template   = Template.instance();
		var collection = getCollection(template);
		var table_data = template.data.settings.table_data;
		var key        = this.key;
		var value      = $this.val();
		var id         = $this.closest('tr').data('record');
		var new_data   = {};
		new_data[key]  = value;

		// Check for required fields
		if(this.required && !value) {
			$this.val(template.data.currentDataFieldValue.get());
			return;
		}

		collection.update({ _id : id }, {
			$set : new_data
		});
	},

	'focus [data-field]' : function(e, template) {
		var $this = $(e.target);
		template.data.currentDataFieldValue.set($this.val());
	},

	// Filtering the table
	'keyup .volcanotable-filter' : function(e) {
		var value = e.target.value;
		var find = [];
		var len  = this.settings.fields.length;

		for(var i = 0; i < len; i++) {
			var field      = this.settings.fields[i];
			var key        = field.key;
			var tmp_object = {};

			// Only filter on fields that are defined for filtering
			if(field.filter) {
				tmp_object[key] = {
					$regex   : value,
					$options : 'i'
				};

				find.push(tmp_object);
			}
		}

		this.where.set({
			$or : find
		});
	},

	// Sort table columns
	'click .volcanotable table thead th' : function(e, template) {
		var key         = this.key;
		this.sort_order = this.sort_order == -1 ? 1 : -1;
		var sort_data   = {};
		sort_data[key]  = this.sort_order;

		template.data.sort.set(sort_data);
	},


	// Pagination previous
	'click .volcanotable-previous-page' : function(e, template) {
		var current_page = template.data.currentPage.get();
		if(current_page === 1) {
			return;
		}

		template.data.currentPage.set(current_page - 1);
	},

	// Pagination next
	'click .volcanotable-next-page' : function(e, template) {
		var current_page = template.data.currentPage.get();
		if(template.data.totalPages.get() === current_page) {
			return;
		}

		template.data.currentPage.set(current_page + 1);
	},

	// Manually change what page the table is on
	'change .volcanotable-current-page' : function(e, template) {
		var value = +$(e.target).val();
		template.data.currentPage.set(value);
	},

	// Delete a record from a collection
	'click .volcanotable-delete' : function(e, template) {
		//var template   = Template.instance();
		var confirm    = window.confirm('Are you sure you want to delete this record?');
		var collection = getCollection(template);

		if(!confirm) {
			return;
		}

		collection.remove(this._id);
	},

	// Show modal for creating a new record
	'click .volcanotable-add-record-button' : function(e) {
		var $this    = $(e.target);
		var modal_id = $this.attr('data-modal-id');
		var selector = '#volcanotable-modal-id-' + modal_id;
		$(selector).show();
	},

	// Add a new record
	'click .volcanotable-create-record' : function(e, template) {
		var $this         = $(e.target);
		var data          = {};
		var errors        = [];
		//var template      = Template.instance();
		var collection    = getCollection(template);
		var modal_id      = $this.closest('.volcanotable-modal').attr('data-modal-id');
		var selector      = '#volcanotable-modal-id-' + modal_id;
		var $input_fields = $this.closest('.volcanotable-modal-content').find('[data-field]');
		var fields        = template.data.fields;

		for(var i = 0; i < $input_fields.length; i++) {
			var $input_field = $($input_fields[i]);
			var key          = $input_field.data('field');
			var value        = $input_field.val();

			for(var x = 0; x < fields.length; x++) {
				var field = fields[x];
				if(field.key === key && field.required && !value) {
					errors.push(field.label + ' is a required field');
				}
			}

			data[key] = value;
		}

		if(!_.isEmpty(errors)) {
			var $error_element = $('.volcanotable-add-errors');
			$error_element.html('<p>' + errors.join('</p><p>') + '</p>');
			$error_element.show();
			return;
		}

		collection.insert(data);

		$(selector).hide();

		// Clear out the inputs
		for(var i = 0; i < $input_fields.length; i++) {
			var $input_field = $($input_fields[i]);
			$input_field.val('');
		}
	},

	// Close the modal
	'click .volcanotable-modal-close' : function(e) {
		var $this    = $(e.target);
		var modal_id = $this.closest('.volcanotable-modal').attr('data-modal-id');
		var selector = '#volcanotable-modal-id-' + modal_id;
		$(selector).hide();
	}
});
