const { program } = require('commander');
const contacts = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			const listContacts = await contacts.listContacts();
			return console.log(listContacts);
		case 'get':
			const getContact = await contacts.getContactById(id);
			return console.log(getContact);
		case 'add':
			const addContact = await contacts.addContact({ name, email, phone });
			return console.log(addContact);
		case 'remove':
			const deletedContact = await contacts.removeContact(id);
			return console.log(deletedContact);	
		case 'update': // additionally
			const updateContact = await contacts.updateContact(id, { name, email, phone });
			return console.log(updateContact);
    default:
      return console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'e6ywwRe4jcqxXfCZOj_1e' });
// invokeAction({ action: 'add', name: 'New Contact', email: 'new123@gmail.com', phone: '123-123-123'});
// invokeAction({ action: 'remove', id:'Z5sbDlS7pCzNsnAHLtDJd' });
// invokeAction({ action: 'update', id: 'e6ywwRe4jcqxXfCZOj_1e', name: 'Update', email: 'test@mail.com', phone: '555-55-55' });