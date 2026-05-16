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





# Stage 3

## Is the query accurate?

Query:

```sql
SELECT notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

The above query is functionally correct because it also returns all of the unread notifications also for a student.

But it may because show when the table contains:

    - 50, 000 students
    - 5,000,000 notifications



## Why is this slow?

Reasons: 

1. Full table scan may happen so database checks many rows before finding matching records.

2. Select * fetches all of the columns.  It can also load some unnecessary data.

3. Sorting operation

```sql
ORDER BY createdAt
```

Sorting a large amount of data increases time.


## Improved Query

```sql
SELECT
notificationID, title, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

# Stage 4

## Problem

Notifications are need to feteched from the database every time a student opens the page.

Problems:

    - Too many database request
    - Increased response time
    - Higher server load
    - Poor user experience


## Solution 1: Caching

Store frequently accesed notification in the Redis (Cache memory)

Flow:
    1. User requests notifications
    2. Check cache first
    3. If data exists -> return data
    4. Otherwise fetch from DB
    5. Store result in cache

Advantage:

    - We will have faster response time
    - Reduce DB load
    - Better performance

TradeOffs:
    - Additional memory is required
    - Catahed data may become outdated



## Solution 2: Pagination

Instead of loading all notifications: Load only small data sets at a time.

Example: /notifications?page=1&limit=10

Advantage:
    - less data transfer
    - Faster loading
    - Better user experience

Tradeoffs:
    -Requires multiple requests for additional pages




# Stage 5

## Problems in current implementation

1. Notifications are sent one by one, so it becomes slow for 50,000 users.

2. If email fails for some students, the process becomes inconsistent.

3. No retry mechanism for failed notifications.

4. Email, database save, and app notifications are tightly coupled.

---

## If email fails for 200 students

Some students receive notifications while some do not. Failed notifications should be retried automatically.

---

## Revised Pseudocode

```python
function notify_all(student_ids, message):

    notificationId = save_to_db(message)

    for student_id in student_ids:

        add_to_queue(student_id, notificationId)


worker():

    task = get_task()

    try:

        send_email(task.student_id)

        push_to_app(task.student_id)

    catch error:

        retry_task()
```

---

## Should DB save and email happen together?

No.

Database save should happen first and email should be processed separately because email may fail.

---

## Benefits

- Faster processing
- Retry mechanism
- Better reliability
- Handles large number of users
