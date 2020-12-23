# GetSmarterNow - API

## What is this

This is the documentation for the GetSmarterNow-API.

## What do you use it for

Retrieving data from the GetSmarterNow database.

## What Technologies do you use

- NodeJS
- Express
- Cors
- Mongoose
- Dotenv
- BodyParser

## What HTTP requests are retrievable

### **all data is retrieved in JSON format**

**Get** - /users/all - (retrieves all Users in database)

**Get** - /users/:username - (retrieves user by username)

**Post** - /users/newuser - (posts a new user in Database)

**Patch** - /users/:username - (patches specific data by of user by username)

**Delete** - /users/:username - (removes user from database by username)
