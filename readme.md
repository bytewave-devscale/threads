# API Documentation

## GET /api/v1/thread/all
### Description
Get all threads

## POST /api/v1/thread
### Description
Create a new thread. User must log in first
### Body Request
```json
{
    "userId": "",
    "title":"",
    "content":"",
    "tokens":{
        "accessToken":"",
        "refreshToken":""
    }
}
```
### Return
Success