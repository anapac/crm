'use strict';

const Joi = require('joi');
const users = require('./handlers/users');
const contacts = require('./handlers/contacts');


module.exports = [{
	method: 'GET',
	path: '/api/users',
	handler: users.getUserList
}, {
	method: 'GET',
	path: '/api/users/{userId}',
	handler: users.getUserInstance,
	config: {
		validate: {
			params: {
				userId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			}
		}
	}
}, {
	method: 'POST',
	path: '/api/users',
	handler: users.createUser,
	config: {
		validate: {
			payload: Joi.object({
				username: Joi.string().regex(/^[\-_a-zA-Z\.]{5,}$/).required(),
				password: Joi.string().alphanum().min(6).required(),
				namesFirst: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesLast: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesOther: Joi.string().regex(/^[\-_a-zA-Z0-9\.]*$/).allow(''),
				dateOfBirth:Joi.date().min('1-1-1920').max('now').iso(),
				phone: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				mobile: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				email: Joi.string().email().allow(''),
				skypeId: Joi.string().allow(''),
				address: Joi.string().allow(''),
				zipCode: Joi.string().min(2).allow('')
			}).unknown()
		}
	}
}, {
	method: 'PUT',
	path: '/api/users/{userId}',
	handler: users.updateUser,
	config: {
		validate: {
			params: {
				userId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			},
			payload: Joi.object({
				namesFirst: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesLast: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesOther: Joi.string().regex(/^[\-_a-zA-Z0-9\.]*$/).allow(''),
				dateOfBirth: Joi.date().min('1-1-1920').max('now').iso(),
				phone: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				mobile: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				email: Joi.string().email().allow(''),
				skypeId: Joi.string().allow(''),
				address: Joi.string().allow(''),
				zipCode: Joi.string().min(3).allow('')
			}).unknown()
		}
	}
}, {
	method: 'DELETE',
	path: '/api/users/{userId}',
	handler: users.deleteUser,
	config: {
		validate: {
			params: {
				userId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			}
		}
	}
}, {
	method: 'GET',
	path: '/api/contacts',
	handler: contacts.getContactList

}, {
	method: 'GET',
	path: '/api/contacts/{contactId}',
	handler: contacts.getContactInstance,
	config: {
		validate: {
			params: {
				contactId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			}
		}
	}
}, {
	method: 'POST',
	path: '/api/contacts',
	handler: contacts.createContact,
	config: {
		validate: {
			payload: Joi.object({
				title: Joi.string().regex(/^[\-_a-zA-Z0-9\.,]+$/).allow(''),
				namesFirst: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesLast: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesOther: Joi.string().regex(/^[\-_a-zA-Z0-9\.]*$/).allow(''),
				dateOfBirth: Joi.date().min('1-1-1920').max('now').iso(),
				phone: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				mobile: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				email: Joi.string().email().allow(''),
				skypeId: Joi.string().allow(''),
				country: Joi.string().allow(''),
				city: Joi.string().allow(''),
				address: Joi.string().allow(''),
				zipCode: Joi.string().min(3).allow(''),

				company: Joi.string().allow(''),
				companyWebSite: Joi.string().regex(/^[/:_a-zA-Z0-9]+\.[/:_a-zA-Z0-9]+$/).allow('')
			}).unknown()
		}
	}
},  {
	method: 'POST',
	path: '/api/contacts/search',
	handler: contacts.searchContacts,
	config: {
		validate: {
			payload: Joi.object({
				strName: Joi.string().alphanum().allow(''),
				strPhones: Joi.string().alphanum().allow(''),
				strEmail: Joi.string().email().allow(''),
				strCity: Joi.string().alphanum().allow(''),
				strCountry: Joi.string().alphanum().allow('')
			}).unknown()
		}
	}
}, {
	method: 'PUT',
	path: '/api/contacts/{contactId}',
	handler: contacts.updateContact,
	config: {
		validate: {
			params: {
				contactId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			},
			payload: Joi.object({
				title: Joi.string().regex(/^[\-_a-zA-Z0-9\.,]+$/).allow(''),
				namesFirst: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesLast: Joi.string().regex(/^[\-_a-zA-Z0-9]+$/).allow(''),
				namesOther: Joi.string().regex(/^[\-_a-zA-Z0-9\.]*$/).allow(''),
				dateOfBirth: Joi.date().min('1-1-1920').max('now').iso(),
				phone: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				mobile: Joi.string().regex(/^[+0-9 \-]{5,}$/).allow(''),
				email: Joi.string().email().allow(''),
				skypeId: Joi.string().allow(''),
				country: Joi.string().allow(''),
				city: Joi.string().allow(''),
				address: Joi.string().allow(''),
				zipCode: Joi.string().min(3).allow(''),

				company: Joi.string().allow(''),
				companyWebSite: Joi.string().regex(/^[/:_a-zA-Z0-9]+\.[/:_a-zA-Z0-9]+$/).allow('')
			}).unknown()
		}
	}
}, {
	method: 'DELETE',
	path: '/api/contacts/{contactId}',
	handler: contacts.deleteContact,
	config: {
		validate: {
			params: {
				contactId: Joi.string().regex(/^[a-z0-9]{24}$/).required()
			}
		}
	}
}];