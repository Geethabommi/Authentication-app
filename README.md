# Authentication Web Application

A basic scalable web application that implements authentication, enables the users to sign in, sign up ,sign out and change password easily.

# Tools,stacks and library used:

Nodejs and Expressjs is used to develop this authentication web app.
passport library is used for local and social authentication.
mongodb and mongoose for data storage.
bcrypt and crypto is used for hashing the password and token generation.
nodemailer is used for mail communication.

# Deployment:

The Authentication web application is deployed at https://authentication-app-gee.herokuapp.com/

# Key Functionalities & Workflow :

## 1) Sign Up :

- On being directed to users/sign-up, a sign up form appears where in the user can enter their basic profile information such as their names, email and choose a password for their account.
- By clicking on the submit button,a post request is then sent to the server and then in the backend the server verifies if the fields password and confirm password match, if they do , the server checks if the user exists already in the database, if an existing user is found with that email address then server notifies the user about the same.
- If there is no user with that email, a new user is being created and their credentials are stored in the database and server redirects the page to sign-in form.
- The user's password is stored as a hash for security purpose.
- A welcome mail is sent to the user's registered mail address on successfull sign up.

## 2) Sign In :

- On being directed to users/sign-in, the sign in form appears , on submitting the credentials a post request is sent to the server to create a session cookie for the signed in user, the server first verifies the authenticity of the user by comparing the credentials of the user sent in the request's body with the ones stored in the database, if they do not match the user is notified about the invalid credentials.
  -The library bcrypt is used for storing the hashed passwords in the database, whenever the password is recently modified or a new user has been created.while Sign In ,Original passwords are retrieved from hash passwords which are stored in db and are compared with user's requested password.
- This local authentication is processed by passport's local strategy.

## 3)Social Authentication : Google Oauth2 Strategy :

- On being directed to either of /users/sign-in or /users/sign-up, a button(icon) is placed in the form which lets the users to Sign In / Sign Up using their Google accounts, once the credentials of the users are verified by the servers at google.com, the server checks if an account already exists with that gmail address , if it does , the user is allowed to sign in, if there is no user with the email sent in request by the user, a new user is being created at our servers with that email address and a random password is generated and stored as a hash in the database.
- This google authentication is implemented using passport google oauth2 strategy.

## 5) Reset Password /Forgot Password:

- If the user forgets his or her password or want to reset the password, upon clicking on the Forgot Password Link at users/sign-in or the Reset password in header of the page , the user is directed to /forgot-password/email where in a form is rendered where the user can enter their email, a post request is then sent to the server ,the server verifies if any user with the requested email exists in the database or not, if it does an email with the link to reset the password is sent to the registered email else the user is notified about the invalid email.
- The user can click on the link which is sent in the mail and reset their passwords.
- An email is sent to the user when the password is updated successfully.

## How is Forgot/Reset Password implemented ?

- In the database schemas, schema for the reset password tokens is defined which contains three fields namely user to store a reference to the user, access token which is of type String and isValid boolean to check the validity of the token.
- On finding out the user by the email address, a reference to the user is stored and passed on while creating a new object for the reset password token, the access token is a random string generated using the crypto library, the isValid boolean is marked as true initially, then the generated reset password token and the user is sent to the mailer which mails the user with the access token , the url is of the form forgot-password/resetlink/accesstoken="access-token-value".
- On getting directed to the URL from the mail, first the validity of the token is verified and then the reset password form is rendered, on submitting the new password a post request is sent to the server , the user is matched using the access token, finally on checking if password and confirm password field's value match , the password is updated and saved in the database and the isValid boolean of the token is marked as false and saved.
- In case, someone else impersonating themselves as the user by gaining access to the user's existing password, a precaution and security mail is sent on the user's registered email notifying them about the change of password and secure account Link is given in the mail by clicking on that,user can reset the password.

# To run the project :

1. Open terminal.

2. Change the current working directory to the location where you want the cloned directory.

```
$ git clone https://github.com/Geethabommi/Authentication-app.git
```

3. Install all the dependencies by running :

```
npm install
```

4. Create project in google developer console and get the client Id and client secret
   paste it in the respective development variables in environment file

5. Run npm start to run the project at local host, port 8000:

```
npm start
```

5. In your browser, enter the URL :

```
localhost:8000/
```
