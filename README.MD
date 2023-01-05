## Ruki messanger - Fullstack messanger. 

#### Receiving a confirmation email
To work with mail, I use the nodemailer library. You can specify your SMTP server or connect a test server using the service mailtrap.io

- Register on mailtrap.io
- Log in to the account of this service.
- In the "Inboxes" list, open "Demo inbox".
- After that, you will have information about your test SMTP and POP3 server.
- Open the .env file (if not, copy .env.example and rename it to .env)
- Specify in NODEMAILER_HOST, etc. the data that was given to you mailtrap.io
- Restart the backend server.
- After each account registration in the chat, emails with account confirmation will be received in the "Demo inbox" (Mailtrap) section.

You can also verify your account without the Mailtrap service. Just find your user in the database and tell him confirmed: true or follow the link http://localhost :{FRONTEND_PORT}/signup/verify?hash={HASH}.

#### Uploading files to Cloudinary
In order for your files to be uploaded successfully, you need to register on the website cloudinary.com

In the file .env you need to fill in the parameters for the Cloudinary API. To do this, go to Dashboard and copy your API parameters.

### General stack:
- Typescript
- Node.JS
- Socket.io

> #### Client part stack:
> React
> Redux-thunk
> CSS Modules

> #### Server part stack:
> Rest API
> MongoDB
> Express
> JWT Auth