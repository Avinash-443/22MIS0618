const axios = require("axios");

const TOKEN = "PASTE_ONLY_ACCESS_TOKEN_HERE";

async function getTopNotifications(){

try{

const response = await axios.get(
"http://4.224.186.213/evaluation-service/notifications",
{
headers:{

Authorization: `Bearer ${TOKEN}`

}
}
);

const notifications =
response.data.notifications;

const priorityWeight = {

Placement:3,
Result:2,
Event:1

};

notifications.sort((a,b)=>{

let priorityDifference =

priorityWeight[b.Type] -
priorityWeight[a.Type];

if(priorityDifference!==0){

return priorityDifference;

}

return (

new Date(b.Timestamp) -
new Date(a.Timestamp)

);

});

const top10 =
notifications.slice(0,10);

console.log(top10);

}

catch(error){

console.log(
error.response?.data ||
error.message
);

}

}

getTopNotifications();