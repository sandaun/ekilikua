# Equilicuá

## Description

It's a platform where you can find the classes of anything you want to learn and then share it with other users in order to reduce their cost and meet new people that share your same interest.

## User Stories

* **Homepage** - The user will be able to access the homepage to see what the app is about, the classes available, and login and signup.
* **Sign up** - The user will be able to sign up on the webpage so that they can join or create the classes of their interest.
* **Login** - The user will be able to sign up on the webpage so that they can join or create the classes of their interest.
* **Logout** - The user will be able to log out from the webpage so that no one can access their account.
* **Profile** - The user will be able to see his profile and modify the name or image.
* **Class list** - The user will be able to see all the classes available so that they can choose which ones they want to join.
* **Create class** - The user will be able to create a class of any discipline so that other users can join it.
* **Class detail** - The user will be able to see the class details and attendee list of the class so that they can decide if they want to join it.
* **Join class event** - The user will be able to join the class so that the professor can count them in.
* **Close class event** - The professor will be able to close the class for all the users that joined, so that they can do it.
* **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
* **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

## Backlog

### User functionalities

* **User profile**: Upload my profile picture
* **User profile**: List of classes you participated
* **User profile**: List of classes you are going to attend
* **User profile**: Historic of attended classes
* **User profile**: Log In with Social Networks
* See other users profile
* Add valuations of their professors
* Create alerts in case classes of their interest appear.
  
### Professor functionalities

* **Professor profile**: Nº of taught classes
* **Professor profile** Nº of cancelled classes
* **Professor profile** Historic of thought classes
* **Professor profile** Add an agenda functionality to show the reservations made
* **Class manipulation**: Add an extra fee for every new user that joins the class
* **Class manipulation**: Pay to promote it's profile in the platform
* **Class manipulation**: Pay to promote it's profile in the platform
* Add valuations of their students (Maybe)

### Class functionalities

* Show the avatar of the users that already joined the class
* Being able to click the avatar to see the user you are going to share the class with.
* Geolocate the position of the alumni and the professor in order to see the closest classes first.
* Add possible timetables for every class.
* Add group chat with every member of the class
  
### Payments

* Add payment methods for users once they join the class

## ROUTES

| Method| Description | Test Text |
| :---: |    :----:   |   :---:   |
| GET   | /   | Renders the homepage   |
| GET   | /auth/signup  | Renders sign up screen |
| POST  | /auth/signup  | Redirects to _auth_login |
| GET   | /auth/login   | Renders log in screen |
| POST  | /auth/login   | Redirects to / |
| GET   | /user         | Renders user homepage |
| GET   | /user/profile | Renders log in screen |
| POST  | /user/profile | Redirects to /user |
| GET   | /user/classes | Renders user classes |
| GET   | /user/classes/new | Renders new class |
| POST  | /user/classes/new | Redirects to /user/classes |
| GET   | /user/classes/:classID | Renders class screen |
| POST  | /user/classes/:classID | Redirects to /user/classes |
| GET   | /user/classes/attending | Renders user attending classes |
| GET   | /user/classes/attending/:classID | Renders user attending class |
| POST  | /user/classes/attending/:classID | Redirects to attending classes |
| GET   | /user/classes/teaching | Renders user teaching classes |
| GET   | /user/classes/teaching/:classID | Renders user teaching class |
| POST  | /user/classes/teaching/:classID | Redirects to teaching classes |
| GET   | /user/logout  | Redirects to / |
| GET   | /classes | Renders available classes|
| GET   | /classes/:classID | Renders a class information |
| POST  | /classes/:classID | Redirects to user classes or log in |
|||

## Models

User model

```json
username: String
password: String
```

Class model

```json
owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
```

Categories model

```json
username: String
password: String
```

Subcategories model

```json
username: String
password: String
```

## Trello
[Trello](https://trello.com/b/9udgUpvV) 

## Git
[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

## Slides
[Slides Link](http://slides.com)