const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'contacts.json');

const listContacts = async() => {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
}

const getContactById = async (id) => {
	const contactId = String(id);
	const contacts = await listContacts();
	return contacts.find(contact => contact.id === contactId ) || null;
}

const addContact = async (name, email, phone) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

const updateContact = async (id, params) => {
	const contactId = String(id);
	const contacts = await listContacts(); 
	const index = contacts.findIndex(item => item.id === contactId); 
	if (index === -1) return null;

	contacts[index] = { contactId, ...params }; 
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return index;
}

const removeContact = async (id) => {
	const contactId = String(id);
	const contacts = await listContacts();
	const index = contacts.findIndex(item => item.id === contactId); 
	if (index === -1) return null;

	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return  result;
}

module.exports = { listContacts, getContactById, addContact, updateContact, removeContact }
