Clients = new Meteor.Collection('clients');

if(Meteor.isServer && !Clients.findOne()) {
	var docs = [];

	var names = [
		'Wenona Bald',
		'Saul Saeger',
		'Dorthy Jaso',
		'Latia Bloom',
		'Ciara Munson',
		'Marchelle Purifoy',
		'Cleopatra Maynor',
		'Tarah Klapper',
		'Octavio Elsea',
		'Alberto Espey',
		'Romana Weyandt',
		'Porfirio Cowan',
		'Ines Guiney',
		'Jong Brantley',
		'Mireille Palacios',
		'Cheryll Nesbit',
		'Suzanna Nale',
		'Edna Swartwood',
		'Luella Brigmond',
		'Elizabeth Smullen',
		'Malcolm Hymel',
		'Richelle Polk',
		'Ellie Overcash',
		'Kent Strahan',
		'Mellisa Lovick',
		'Breanna Sharma',
		'Carolann Zakrzewski',
		'Wendell Perkin',
		'Danyel Mccrimmon',
		'Bobbie Bacon',
		'Corine Heckel',
		'Anisa Matson',
		'Karima Esquivel',
		'Deetta Nishimoto',
		'Cierra Stork',
		'Laurene Rentfro',
		'Bari Cage',
		'Gus Alejo',
		'Alesia Syed',
		'Jannet Nitz',
		'Jolene Semon',
		'Quincy Cofer',
		'Darrick Trippe',
		'Clark Bronson',
		'Jackqueline Routh',
		'Britni Mcgarity',
		'Eva Mckeller',
		'Rufina Moose',
		'Felton Dery',
		'Dudley Netherto',
		'Darla Houser',
		'Neida Casler',
		'Jacqualine Wind',
		'Trula Robarge',
		'Nan Sholar',
		'Frances Gillie',
		'Jenae Cacciatore',
		'Toi Giroir',
		'Isaac Bartel',
		'Rona Neuner',
		'Janiece Bou',
		'Sal Hetrick',
		'Trish Heavner',
		'Coy Pardon',
		'Mui Buchholz',
		'Erminia Niblett',
		'Charolette Range',
		'Rolf Mineau',
		'Kirstin Younts',
		'Kari Spillman',
		'Yen Wolski',
		'Toshia Wildey',
		'Brittaney Orchard',
		'Sixta Leto',
		'Eloise Hartley',
		'Marivel Johns',
		'Hazel Wentworth',
		'Sidney Suarez',
		'Laverne Sliva',
		'Elia Gagliardi',
		'Clemente Lembke',
		'Ulrike Fritch',
		'Ashton Jiggetts',
		'Pearlie Fretz',
		'Dave Lampman',
		'Neely Job',
		'Fallon Moczygemba',
		'Shalanda Stephan',
		'Catherina Sowers',
		'Lakeshia Morra',
		'Leroy Chrisman',
		'Zandra Lahey',
		'Katherina Moman',
		'Margorie Palin',
		'Caprice Doonan',
		'Shante Bacote',
		'Larae Karnes',
		'Natosha Bowers',
		'Nobuko Talmage',
		'Venessa Schlottmann'
	];

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

	var locations = [
		'Tampa',
		'Orlando',
		'Paris',
		'New York City',
		'Dallas',
		'Austin',
		'Los Angeles',
		'San Francisco',
		'Salt Lake City',
		'Atlanta',
		'Raleigh',
		'Miami',
		'Chicago',
		'Grand Rapids',
		'Detroit',
		'Tulsa',
		'Kanas City'
	];

	for(var i = 0; i < names.length; i++) {
		var name         = names[i];
		var phone        = _.random(1, 9) + _.random(1, 9) + _.random(1, 9) + '-' + _.random(1, 9) + _.random(1, 9) + _.random(1, 9) + '-' + _.random(1, 9) + _.random(1, 9) + _.random(1, 9) + _.random(1, 9);
		var annual_sales = _.random(0, 400000) + '.' + _.random(10, 99);

		docs.push({
			name         : name,
			annual_sales : annual_sales,
			industry     : _.sample(industries),
			founded      : _.random(1985, 2014),
			location     : _.sample(locations),
			phone        : phone
		});
	}

	for(var i = 0; i < docs.length; i++) {
		Clients.insert(docs[i]);
	}
}
