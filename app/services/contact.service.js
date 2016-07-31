'use strict';

import $ from 'jquery';

export default class ContactService {
	constructor(baseUrl) {
		this.url = baseUrl;

		this.getContacts = this.getContacts.bind(this);
		this.getSearchContacts = this.getSearchContacts.bind(this);
		this.getContactById = this.getContactById.bind(this);
		this.updateContactById = this.updateContactById.bind(this);
		this.createContact = this.createContact.bind(this);
		this.deleteContactById = this.deleteContactById.bind(this);
		this.postJsonAsPromise = this.postJsonAsPromise.bind(this);
		this.getJsonAsPromise = this.getJsonAsPromise.bind(this);
		this.putJsonAsPromise = this.putJsonAsPromise.bind(this);
		this.deleteJsonAsPromise = this.deleteJsonAsPromise.bind(this);
	}	// constructor()

	getContacts() {
		return this.getJsonAsPromise(this.url).then((contacts) => contacts.map((contactData) => {
			if (contactData) {
				return contactData;
			}
		}));
	}	// getContacts()

	getSearchContacts(data) {
		let targetUrl = this.url + '/search';

		return this.postJsonAsPromise(targetUrl, data).then((contacts) => contacts.map((contactData) => {
			if (contactData) {
				return contactData;
			}
		}));
	}	// getSearchContacts()

	getContactById(contactId) {
		const targetContactId = this.url + '/' + contactId;

		return this.getJsonAsPromise(targetContactId).then((contactData) => {
			if (contactData) {
				return contactData;
			}
		});
	}	// getContactById()

	updateContactById(contactId, data) {
		const targetContactId = this.url + '/' + contactId;

		return this.putJsonAsPromise(targetContactId, data).then((contactData) => {
			if (contactData) {
				return contactData;
			}
		});
	}	// updateContactById()

	createContact(data) {
		return this.postJsonAsPromise(this.url, data).then((contactData) => {
			if (contactData) {
				return contactData;
			}
		});
	}	// createContact()

	deleteContactById(contactId) {
		const targetContactId = this.url + '/' + contactId;

		return this.deleteJsonAsPromise(targetContactId).then((contactData) => {
			if (contactData) {
				return contactData;
			}
		});
	}	// deleteContactById()

	postJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'POST',
				url: url,
				data: JSON.stringify(data),
				success: resolve,
				dataType: 'json',
				contentType: 'application/json'
				// contentType: false,
				// processData: false,
				// crossDomain: true
			}).done(resolve).fail(reject);
		});
	}	// postJsonAsPromise()

	getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'GET',
				url: url,
				data: data,
				success: resolve
			}).done(resolve).fail(reject);
        });
    }	// getJsonAsPromise()

	putJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'PUT',
				url: url,
				data: JSON.stringify(data),
				success: resolve,
				dataType: 'json',
				contentType: 'application/json'
			}).done(resolve).fail(reject);
		});
	}	// putJsonAsPromise()

	deleteJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'DELETE',
				url: url,
				data: data,
				success: resolve
			}).done(resolve).fail(reject);
		});
	}	// deleteJsonAsPromise()
}	// class ContactService