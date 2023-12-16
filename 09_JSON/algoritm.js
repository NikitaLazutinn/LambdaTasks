const fs = require('fs');

const content = fs.readFileSync('1.json');
const sourceJSON = JSON.parse(content);
const destinationJSON = {};


for (const request of sourceJSON) {
  
  const userName = request.user.name;

  
  if (!destinationJSON[userName]) {
    
    destinationJSON[userName] = {
      id: request.user._id,
      vacations: [],
    };
  }

  
  destinationJSON[userName].vacations.push({
    startDate: request.startDate,
    endDate: request.endDate,
  });
}


fs.writeFileSync('2.json', JSON.stringify(destinationJSON, null, 2));

console.log("New json saved to '2.json' ");
