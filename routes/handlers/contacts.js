'use strict';

const mongoose = require('mongoose');
const boom = require('boom');

const Schemas = require('../../schemas/schemas');
const Contact = mongoose.model('Contact', Schemas.contacts_schema);


exports.getContactList = (request, reply) => {
	Contact.find({ markedForDel: false }, (err, contact_docs) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(contact_docs);
	});
};

exports.searchContacts = (request, reply) => {
	// console.info(`[ searchContacts ] request.payload ==> ${JSON.stringify(request.payload)}`);
	let nameSearch = new RegExp('^.*' + request.payload.strName + '.*$', 'i');
	let phoneSearch = new RegExp('^.*' + request.payload.strPhones + '.*$', 'i');

	Contact.find({ 
		$and: [{
			$or: [
				{'namesFirst': nameSearch},
				{'namesLast': nameSearch},
				{'namesOther': nameSearch}
			], $or: [
				{'phone': phoneSearch},
				{'mobile': phoneSearch}
			], $and: [
				{'email': new RegExp('^.*' + request.payload.strEmail + '.*$', 'i')},
				{'city': new RegExp('^.*' + request.payload.strCity + '.*$', 'i')},
				{'country': new RegExp('^.*' + request.payload.strCountry + '.*$', 'i')}
			]
		}]}, (err, contact_docs) => {
		if (err) {
			console.error(err);
			throw err;
		}

		// console.log(`[ searchContacts ] contact_docs ==> ${contact_docs}`);
		reply(contact_docs);
	});
};	// searchContacts()

exports.getContactInstance = (request, reply) => {
	let cnt = request.params.contactId;
	Contact.findById(cnt, (err, contact_doc) => {
		if (err) {
			console.error(err);
			throw err;
		}

		if (contact_doc === null || contact_doc === 'undefined') {
			reply(boom.notFound(`Contact with _id: ${cnt} not found!`));
		}

		reply(contact_doc);
	});
};

exports.updateContact = (request, reply) => {
	let cnt = request.params.contactId;
	let newInstance = request.payload;

	Contact.findByIdAndUpdate(cnt, {
		title: newInstance.title,
		namesFirst: newInstance.namesFirst,
		namesLast: newInstance.namesLast,
		namesOther: newInstance.namesOther,
		dateOfBirth: newInstance.dateOfBirth || new Date,
		phone: newInstance.phone,
		mobile: newInstance.mobile,
		email: newInstance.email,
		skypeId: newInstance.skypeId,
		country: newInstance.country,
		city: newInstance.city,
		address: newInstance.address,
		zipCode: newInstance.zipCode,

		company: newInstance.company,
		companyWebSite: newInstance.companyWebSite,

		lastModified: Date.now(),
		markedForDel: false
	}, 
	{	// options:
		new: true,
		upsert: false,
		runValidators: true,
		setDefaultsOnInsert: true
	}, (err, updated_contact_doc) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(updated_contact_doc);
	});
};

exports.createContact = (request, reply) => {
	let data = request.payload;

	Contact.create({
		title: data.title,
		namesFirst: data.namesFirst,
		namesLast: data.namesLast,
		namesOther: data.namesOther,
		dateOfBirth: data.dateOfBirth || new Date,
		phone: data.phone,
		mobile: data.mobile,
		email: data.email,
		skypeId: data.skypeId,
		country: data.country,
		city: data.city,
		address: data.address,
		zipCode: data.zipCode,

		company: data.company,
		companyWebSite: data.companyWebSite,

		owner: new mongoose.Types.ObjectId,
		createdOn: Date.now(),
		lastModified: null,
		markedForDel: false
	}, (err, result) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(result);
	});
};

exports.deleteContact = (request, reply) => {
	let cnt = request.params.contactId;

	Contact.findByIdAndUpdate(cnt, { markedForDel: true }, {
		// options:
		new: true,
		upsert: false,
		runValidators: true,
		setDefaultsOnInsert: true
	}, (err, updated_contact_doc) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(updated_contact_doc.markedForDel);
	});
};
