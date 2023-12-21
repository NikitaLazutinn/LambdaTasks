import inquirer from 'inquirer';
import * as fs from 'fs';

const databaseFile = 'users.json';

async function main() {
  let users = loadDatabase();

  while (true) {
    const newUser = await getUserDetails();
    users.push(newUser);
    saveDatabase(users);
    console.log('User added successfully.');
    const cont = await inquirer.prompt({
      type: 'confirm',
      name: 'add',
      message: 'Do you want to continue adding? (Y/N)',
    });
    if(!cont.add){
      break;
    }
  }

  const searchUser = await inquirer.prompt({
    type: 'confirm',
    name: 'search',
    message: 'Do you want to search for a user? (Y/N)',
  });

  if (searchUser.search) {
    const searchQuery = await inquirer.prompt({
      type: 'input',
      name: 'query',
      message: 'Enter the name to search for:',
    });

    const searchResults = searchUsers(users, searchQuery.query);

    if (searchResults.length > 0) {
      console.log('Search results:');
      searchResults.forEach(user => console.table(user));
    } else {
      console.log('No users found with that name.');
    }
  }

  console.log('Exiting the application.');
}

function getUserDetails() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name:',
    },
    {
      type: 'list',
      name: 'gender',
      message: 'Select gender:',
      choices: ['Male', 'Female', 'Other'],
    },
    {
      type: 'number',
      name: 'age',
      message: 'Enter age:',
    },
  ]);
}

function loadDatabase() {
  try {
    const data = fs.readFileSync(databaseFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Database file not found! ');
    return [];
  }
}

function saveDatabase(users) {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync(databaseFile, data);
}

function searchUsers(users, query) {
  const lowerCaseQuery = query.toLowerCase();
  return users.filter(user => user.name.toLowerCase().includes(lowerCaseQuery));
}

main();
