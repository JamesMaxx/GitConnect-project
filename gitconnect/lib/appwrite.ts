import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66ebd83a00356b025d5e');

const account = new Account(client);
const database = new Databases(client);

export { client, account, database };
