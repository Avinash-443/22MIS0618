import {
Card,
CardContent,
Typography
}
from "@mui/material";

function NotificationCard({data}){

return(

<Card

style={{

marginBottom:"20px",

backgroundColor:
data?.read
?
"#eeeeee"
:
"#d4ffd4"

}}

>

<CardContent>

<Typography
variant="h6"
>

{data?.message || "No Message"}

</Typography>


<Typography>

Type:
{data?.type || "Unknown"}

</Typography>


<Typography>

Status:

{
data?.read
?
"Viewed"
:
"New Notification"
}

</Typography>

</CardContent>

</Card>

)

}

export default NotificationCard;