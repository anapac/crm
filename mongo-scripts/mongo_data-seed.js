(() => {

	// Setup MongoDB
	let mongoose = require('mongoose');
	let Schemas = require('../schemas/schemas');

	// Sample Users:
	let User = mongoose.model('User', Schemas.users_schema);
	User.remove({}, (err) => {
		if (err) {
			console.error('Error dropping \'users\' collection!');
			throw err;
		}
	});

	User.create({
		username: 'test-user1',
		password: 'pass1',
		namesFirst: 'FirstName1',
		namesLast: 'LastName1',
		namesOther: '',
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'anapac@sub.com',
		skypeId: '843y5873645874',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		//createdBy: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	User.create({
		username: 'test-user2',
		password: 'pass2',
		namesFirst: 'FirstName2',
		namesLast: 'LastName2',
		namesOther: 'A.',
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'anapac@sub.com',
		skypeId: '843y5873645874',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		//createdBy: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	User.create({
		username: 'test-user3',
		password: 'pass3',
		namesFirst: 'FirstName3',
		namesLast: 'LastName3',
		namesOther: '',
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'anapac@sub.com',
		skypeId: '843y5873645874',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		//createdBy: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	User.create({
		username: 'test-user4',
		password: 'pass4',
		namesFirst: 'FirstName4',
		namesLast: 'LastName4',
		namesOther: '',
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'anapac@sub.com',
		skypeId: '843y5873645874',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		//createdBy: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	User.create({
		username: 'test-user5',
		password: 'pass5',
		namesFirst: 'FirstName5',
		namesLast: 'LastName5',
		namesOther: '',
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'anapac@sub.com',
		skypeId: '843y5873645874',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		//createdBy: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });



	// Sample Contacts:
	let Contact = mongoose.model('Contact', Schemas.contacts_schema);
	Contact.remove({}, (err) => {
		if (err) {
			console.error('Error dropping \'contacts\' collection!');
			throw err;
		}
	});

	Contact.create({
		title: 'Mrs',
		namesFirst: 'FirstContactName1',
		namesLast: 'LastContactName1',
		namesOther: '',
		//photo: { type: Buffer },
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'contact.email1@yahoo.com',
		skypeId: 'i3i4343bn43k43',
		country: 'Bulgaria',
		city: 'Sofia',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		company: 'Toys-R-Us',
		companyWebSite: 'toys-r-us.com',

		//owner: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	Contact.create({
		title: 'Dr',
		namesFirst: 'FirstContactName2',
		namesLast: 'LastContactName2',
		namesOther: 'R',
		//photo: { type: Buffer },
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',		
		mobile: '+359 888 34 45 45',
		email: 'contact.email2@yahoo.com',
		skypeId: 'i3i4343bn43k43',
		country: 'Bulgaria',
		city: 'Pleven',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		company: '',
		companyWebSite: '',

		//owner: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	Contact.create({
		title: '',
		namesFirst: 'FirstContactName3',
		namesLast: 'LastContactName3',
		namesOther: '',
		//photo: { type: Buffer },
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'contact.email3@yahoo.com',
		skypeId: 'i3i4343bn43k43',
		country: 'Bulgaria',
		city: 'Varna',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		company: 'Rank Xerox',
		companyWebSite: 'xerox-bg.com',

		//owner: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	Contact.create({
		title: '',
		namesFirst: 'FirstContactName4',
		namesLast: 'LastContactName4',
		namesOther: '',
		//photo: { type: Buffer },
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'contact.email4@yahoo.com',
		skypeId: 'i3i4343bn43k43',
		country: 'Spain',
		city: 'Madrid',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		company: 'UPS',
		companyWebSite: 'ups.com',

		//owner: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });

	Contact.create({
		title: 'Sir',
		namesFirst: 'FirstContactName5',
		namesLast: 'LastContactName5',
		namesOther: 'Earl',
		//photo: { type: Buffer },
		dateOfBirth: Date.now(),
		phone: '+359 2 455674',
		mobile: '+359 888 34 45 45',
		email: 'contact.email5@yahoo.com',
		skypeId: 'i3i4343bn43k43',
		country: 'Great Britain',
		city: 'Liverpool',
		address: '8937 Oakland Drive, SomeCity',
		zipCode: 'W33201',

		company: 'British Telecom',
		companyWebSite: 'bt.com',

		//owner: { type: Schema.Types.ObjectId },
		createdOn: Date.now(),
		markedForDel: false
	}, (err) => { if (err) console.error(err); });
})();