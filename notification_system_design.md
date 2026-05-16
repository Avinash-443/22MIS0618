# stage 1

# Notification System REST API Design

##Base URL

http://localhost:3000/api


## Supported Actions

1. Create notification
2. Get all notification
3. Get notification by ID
4. Mark notification as read
5. Delete Notification
6. Real-time notification updates


# API Endpoints

POST - /notification - create notification
GET - /notifications:userId - get all notification
GET - /notifications/details/:id - get notification by ID
PUT - /notifications/:id - mark notification as read
DELETE - /notifications/:id - delete notification

# common Headers

# json format (For post):
{
    "id": 1,
    "userId": 101,
    "title": "New Message",
    "message": "You have received message",
    "read": false,
    "createdAt": "16/05/2026"  

}


Response: 
{
    "message": "created"
}

Status = 201


# To Get Single Notification:

Endpoint: Get http://localhost:3000/details/1

Response:

{
    "id": 1,
    "title": "New Message",
    "messgae": "You have received a message",
    "read": false
}

# Mark Notifications as Read

Endpoint: /notification/1

Request:

{
    "read": true
}

Response:

{
    "message": "Notification updated successfully"
}


# Delete notification

Endpoint: DELETE /notifications/1

Response:

{
    "message": "Notification deleted successfully"
}

# Get all notification

Endpoint: Get /notifications/101

Response:
{
    {data 1...},
    {data 2...},
    {data 3...}
}




