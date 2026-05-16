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





# Stage 2

## Database Choice

Reason:
    - Unpredictable notification 
    - Can change structure at any time
    - JSON format storage provides easy access
    - Faster for large notification data
    - Easy Scaling

## Database Schema

Colletion Name: notifications

Schema:

{
    "_id": 1,
    "userId": 101,
    "title":"New message",
    "message":"You have received a message",
    "read": false,
    "createdAt": "16/05/2026"
}

## Problem when data volumn increases

### 1. Decrease query performance

Problem:  When more request are made to the database it may slow the query performance because of large number of notifications can make searching slow.

Solution: Creating indexes can solve some problems.  Frequently used or commonly used fields can have indexes to quickly identify the errors.

db.notifications.createIndex(
    {
        userId: 1
    }
)

### 2. Large unread notification list

Problem: Too many notification with unread status that may cause the user to increase the loading time.

Solution:  We can use pagination to load only the required or most resent once one by one without overloading the user side.

Example:

db.notifications.find(
    {
        userId:101
    }
)
.limit(10)
.skip(0)


### 3. Database storage increases

Problem:  Old notification keeping for a long time may require more storage to store everything.

Solution: Delete the old notifications periodically.

Example:

db.notifications.deleteMany(
    {
        createdAt:
        {
            $lt: "2025-01-01"
        }
    }
)

## Queries for APIs from Stage 1

### Create Notification

db.notifications.insertOne(
    {
        userId: 101,
        title: "New Message",
        read: false
    }
)


### Get All Notifications

db.notification.find(
    {
        userId: 101
    }
)



### Get Notification by ID

db.notifications.updateOne({
    _id: "1"
},
{
    $set:
    {
        read: true
    }
})


### Delete Notification

db.notification.deleteOne(
    {
        _id:"1"
    }
)









