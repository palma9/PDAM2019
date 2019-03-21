# api-pdam v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Grade](#grade)
	- [Create grade](#create-grade)
	- [Create grades array](#create-grades-array)
	- [Delete grade](#delete-grade)
	- [Retrieve grades](#retrieve-grades)
	- [Update grade](#update-grade)
	
- [Room](#room)
	- [Create rooms array](#create-rooms-array)
	- [Create room](#create-room)
	- [Delete room](#delete-room)
	- [Retrieve rooms](#retrieve-rooms)
	- [Update room](#update-room)
	
- [Schedule](#schedule)
	- [Create schedule array](#create-schedule-array)
	- [Create schedule](#create-schedule)
	- [Delete schedule](#delete-schedule)
	- [Retrieve schedules](#retrieve-schedules)
	- [Retrieve schedules](#retrieve-schedules)
	- [Retrieve schedules](#retrieve-schedules)
	- [Update schedule](#update-schedule)
	
- [School](#school)
	- [Create school](#create-school)
	- [Delete school](#delete-school)
	- [Retrieve schools](#retrieve-schools)
	- [Update school](#update-school)
	
- [Subject](#subject)
	- [Create subject array](#create-subject-array)
	- [Create subject](#create-subject)
	- [Delete subject](#delete-subject)
	- [Retrieve subjects](#retrieve-subjects)
	- [Update subject](#update-subject)
	
- [Substitution](#substitution)
	- [Create teacher absence](#create-teacher-absence)
	- [Create substitution](#create-substitution)
	- [Delete substitution](#delete-substitution)
	- [Retrieve all day substitutions](#retrieve-all-day-substitutions)
	- [Retrieve substitutions without teacher](#retrieve-substitutions-without-teacher)
	- [Retrieve one day substitutions](#retrieve-one-day-substitutions)
	- [Retrieve pdf of substitutions](#retrieve-pdf-of-substitutions)
	- [set guard teacher to a substitution](#set-guard-teacher-to-a-substitution)
	- [Update substitution](#update-substitution)
	
- [Teacher](#teacher)
	- [Create teacher array](#create-teacher-array)
	- [Create School Manager](#create-school-manager)
	- [Create teacher](#create-teacher)
	- [Delete teacher](#delete-teacher)
	- [Retrieve teachers on guard](#retrieve-teachers-on-guard)
	- [Retrieve teachers](#retrieve-teachers)
	
- [User](#user)
	- [Create user](#create-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	- [Update user photo](#update-user-photo)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Grade

## Create grade



	POST /grades


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Grade's name.</p>							|

## Create grades array



	POST /grades/many


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Grade's array names.</p>							|

## Delete grade



	DELETE /grades/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|

## Retrieve grades



	GET /grades


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update grade



	PUT /grades/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Grade's name.</p>							|

# Room

## Create rooms array



	POST /rooms/many


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| classNumber			| 			|  <p>Room's array classNumbers.</p>							|

## Create room



	POST /rooms


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| classNumber			| 			|  <p>Room's classNumber.</p>							|

## Delete room



	DELETE /rooms/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|

## Retrieve rooms



	GET /rooms


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update room



	PUT /rooms/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| classNumber			| 			|  <p>Room's classNumber.</p>							|

# Schedule

## Create schedule array



	POST /schedules/many


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| timeInterval			| 			|  <p>Schedule's timeIntervals.</p>							|
| dayOfWeek			| 			|  <p>Schedule's dayOfWeeks.</p>							|
| room			| 			|  <p>Schedule's rooms.</p>							|
| subject			| 			|  <p>Schedule's subjects.</p>							|
| teacher			| 			|  <p>Schedule's teachers.</p>							|

## Create schedule



	POST /schedules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| timeInterval			| 			|  <p>Schedule's timeInterval.</p>							|
| dayOfWeek			| 			|  <p>Schedule's dayOfWeek.</p>							|
| room			| 			|  <p>Schedule's room.</p>							|
| subject			| 			|  <p>Schedule's subject.</p>							|
| teacher			| 			|  <p>Schedule's teacher.</p>							|

## Delete schedule



	DELETE /schedules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|

## Retrieve schedules



	GET /schedules/daily


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve schedules



	GET /schedules/oneday


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve schedules



	GET /schedules


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update schedule



	PUT /schedules/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| timeInterval			| 			|  <p>Schedule's timeInterval.</p>							|
| dayOfWeek			| 			|  <p>Schedule's dayOfWeek.</p>							|
| room			| 			|  <p>Schedule's room.</p>							|
| subject			| 			|  <p>Schedule's subject.</p>							|
| teacher			| 			|  <p>Schedule's teacher.</p>							|

# School

## Create school



	POST /schools


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin or schoolManager access token.</p>							|
| name			| 			|  <p>School's name.</p>							|
| contact			| 			|  <p>School's contact.</p>							|
| address			| 			|  <p>School's address.</p>							|
| city			| 			|  <p>School's city.</p>							|
| country			| 			|  <p>School's country.</p>							|

## Delete school



	DELETE /schools/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve schools



	GET /schools


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update school



	PUT /schools/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>School's name.</p>							|
| subscriptionEnd			| 			|  <p>School's subscriptionEnd.</p>							|
| contact			| 			|  <p>School's contact.</p>							|
| address			| 			|  <p>School's address.</p>							|
| city			| 			|  <p>School's city.</p>							|
| country			| 			|  <p>School's country.</p>							|

# Subject

## Create subject array



	POST /subjects/many


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Subject's name.</p>							|
| grade			| 			|  <p>Subject's grade.</p>							|

## Create subject



	POST /subjects


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Subject's name.</p>							|
| grade			| 			|  <p>Subject's grade.</p>							|

## Delete subject



	DELETE /subjects/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|

## Retrieve subjects



	GET /subjects


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update subject



	PUT /subjects/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| name			| 			|  <p>Subject's name.</p>							|

# Substitution

## Create teacher absence



	POST /substitutions/absence


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| date			| 			|  <p>Absence's date.</p>							|
| schedule			| 			|  <p>Absence's schedule.</p>							|

## Create substitution



	POST /substitutions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| date			| 			|  <p>Substitution's date.</p>							|
| schedule			| 			|  <p>Substitution's schedule.</p>							|
| newTeacher			| 			|  <p>Substitution's newTeacher.</p>							|

## Delete substitution



	DELETE /substitutions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|

## Retrieve all day substitutions



	GET /substitutions/all


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve substitutions without teacher



	GET /substitutions/empty


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve one day substitutions



	GET /substitutions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve pdf of substitutions



	GET /substitutions/makepdf


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## set guard teacher to a substitution



	PUT /substitutions/setguardteacher/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| newTeacher			| 			|  <p>Substitution's newTeacher.</p>							|

## Update substitution



	PUT /substitutions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| date			| 			|  <p>Substitution's date.</p>							|
| schedule			| 			|  <p>Substitution's schedule.</p>							|
| newTeacher			| 			|  <p>Substitution's newTeacher.</p>							|

# Teacher

## Create teacher array



	POST /teachers/many


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| number			| 			|  <p>Teacher's number.</p>							|
| email			| 			|  <p>Teacher's email.</p>							|
| password			| 			|  <p>Teacher's password.</p>							|
| name			| 			|  <p>Teacher's name.</p>							|
| picture			| 			|  <p>Teacher's picture.</p>							|

## Create School Manager



	POST /teachers/schoolManager


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| number			| 			|  <p>Teacher's number.</p>							|
| email			| 			|  <p>Teacher's email.</p>							|
| password			| 			|  <p>Teacher's password.</p>							|
| name			| 			|  <p>Teacher's name.</p>							|
| picture			| 			|  <p>Teacher's picture.</p>							|
| school			| 			|  <p>Teacher's school.</p>							|

## Create teacher



	POST /teachers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>schoolManager access token.</p>							|
| number			| 			|  <p>Teacher's number.</p>							|
| email			| 			|  <p>Teacher's email.</p>							|
| password			| 			|  <p>Teacher's password.</p>							|
| name			| 			|  <p>Teacher's name.</p>							|
| picture			| 			|  <p>Teacher's picture.</p>							|

## Delete teacher



	DELETE /teachers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve teachers on guard



	GET /teachers/guards


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve teachers



	GET /teachers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| SecurityCode			| 			|  <p>API SecurityCode.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

## Update user photo



	PUT /users/photo/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| picture			| File			| **optional** <p>User's picture.</p>							|


