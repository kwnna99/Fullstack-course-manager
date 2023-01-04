# Course manager with authentication system

### Fullstack app created with React and a REST API (also added as a standalone repository)

## How to use the code
1. Clone the repository.
2. Move to the api folder and run npm install. Repeat the process for the client folder.
3. In the api folder, run 'npm run seed' to initialize the database and seed data to the database.
4. In both folders, run npm start.

Visit localhost:3000 to view the project. The API runs on localhost:5000.

## App description
The application is initialized with dummy course data for a quick overview in the start page.
As a logged-out user you can view the created courses but cannot create a new one.

### Sign up
By clicking on the sign-up page, the user is taken to the sign-up form, which, after submission, sends a post request to the application's API to validate the data and create a new user in the database.
After a successful sign-up the user remains logged-in until they decide to sign out.

### Sign in
Existing users can use the login system to log in to their accounts.

### View course
All visitor (authenticated or not) can view the existing courses added in the app. 

### New course / Add course
As an authenticated user, when you click on this you receive a form to add your new course. You can fill in the following info:
* Course Title
* Course Description
* Estimated Time
* Materials Needed

After this, a POST request is sent to /courses, where data are validated and the new course is created. 

### Update course
If the user is the owner of the course (meaning that they have created the course), they can opt in to update the course data. 
They can update all data available upon course creation. A PUT request to /courses/id (where id is the course id) is made.

### Delete course
The owner of the course can delete the course. Upon deletion, a DELETE request is made and the course is deleted and does not appear anymore.
