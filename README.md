# MiniSend Email App
 A simple transactional email app that allows clients to; 

> Send emails with a sender and recipient emails,subject,text content,html content and attachments(optional)

> Check analytics of email activities on frontend dashboard

> View all emails

> Search emails by sender,recipient,subject and status (possible statuses are 'Posted','Sent' and 'Failed')

> View single email

> View list of emails for a single recipient





## Requirements

This project was built with Vue.js, Laravel and MYSQL .
## Running the App
To run the App, you must have:
- **PHP** (https://www.php.net/downloads)
- **MYSQL** (https://www.mysql.com/downloads/)

## Clone

    $ git clone https://github.com/BlackSkinDev/MiniSend.git
    $ cd MiniSend

## Configure app
Create an `.env` and copy `.env.example` content into it using the command.

```console
$ cp .env.example .env
```


### Environment
Configure environment variables in `.env` for dev environment based on your MYSQL database configuration


```  
DB_CONNECTION=<YOUR_MYSQL_TYPE>
DB_HOST=<YOUR_MYSQL_HOST>
DB_PORT=<YOUR_MYSQL_PORT>
DB_DATABASE=<YOUR_DB_NAME>
DB_USERNAME=<YOUR_DB_USERNAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>

```
Also, Ensure to set your mailclient configuration in the `.env` (test will fail if this is not done)

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=hello@minisend.com
MAIL_FROM_NAME="${APP_NAME}"

```
### LARAVEL INSTALLATION
Install the dependencies and start the server and run app setup command. 
Also Seeder was set up for emails. Emails can be seeded into database using 
`php artisan db:seed` as stated below

```console
$ composer install
$ php artisan key:generate
$ php artisan db:seed 
$ php artisan serve
```

### VUE INSTALLATION
Install the dependencies and start the server

```console
$ npm install && npm run dev
```

You should be able to visit your app at your laravel app base url e.g http://localhost:8000 or http://minisend.test/ (Provided you use Laravel Valet).


>If you will like to setup queue,Database was used as queue driver. When app is setup, Update `QUEUE_CONNECTION` to `database` in `.env`and ensure to run `php artisan queue:work` in seperate terminal of your project to make sure your queue worker runs in background otherwise leave the queue driver as default `sync` in `.env`

## Design & Implementation Decisions
- Attachments sizes was validated to be less or equal to 5MB (both clients and server side)
- Validation was added to prevent clients from entering same sender and recipient emails (both clients and server side)
- Email fields were strictly validated against CSRF/XSS attacks before saving to database
- Other forms of validation were implemented on both client and server side respectively
- Reusable components were used on frontend to avoid duplication
- To view emails for a recipient, All recipient emails on the dashboard were made clickable which link to a page for viewing emails of the recipient
-  Email  attachments were uploaded to public storage.
- Queue  was implemented for sending emails. Database was configured as
queue driver. By this, Clients don't need to wait for long time to get response when they send emails. Instead,emails sent are saved, then picked up by a job that runs in the background. This job will send the email to appropriate recipient.
- Emails sent have status 'Posted' by default
- The underground job is responsible for updating the email status in the database to 'Sent' or 'Failed' depending on the outcome of the job action.
- If sending of emails fails, the underground job will update the status in db and also
add the failure reason in a new column which I added for emails. This can be viewed on the frontend
- Whenever an email is sent and get saved in the database, if it has attachments,attachments are immediately uploaded. If these two operations are successful, the email get sent to the recipient.
- In a case where attachments upload fail, Database transaction was used to rollback such email from the database and mail doesn't get sent.
- As  a layer of security against DDOS, backend api was throttled(rate limited)
- In this project, As I had in mind that volumes of emails being sent may increase, Laravel query builder was used for fetching large data (emails). Eloquent was used to retrieve relatively small data like getting single email.
- Pagination was implemented for easy retrieval of data
- Multiple emails were seeded to test query performance

## Suggesions
- As it was mentioned earlier, Email attachments were uploaded to app server public storage. For reliable security and simplicity of management storages such as Amazon S3, Cloudinary e.t.c should be used to upload attachments.

- A retry logic can be implemented which will be used to resend emails that have failed. This can simply be done by grabbing the emails and sending them back to the underground job which will resend again and subsequently update email status.

- As it was mentioned earlier,Database was configured as queue driver.
As opposed to this, Redis,Memcached or Amazon SQS can be used as queue driver.



## Feedback on Assessment
The Assessment was a very good one. 
