import express from 'express';
import path from 'path';
import { recipientsController } from './server/controllers/RecipientsController';
import { messagesController } from './server/controllers/MessagesController';
import { usersController } from './server/controllers/UsersController';
import { sendEmailsToRecipients } from './server/db/backgroundService';
import nocache from 'nocache';

const application: express.Application = express();

application.use(nocache());

application.get('/', function (req, res) {
    res.sendFile(path.join(path.join(__dirname, '../') + "public/main.html"));
});

application.listen(process.env.PORT || '3000', () => {
    console.log('Server is listening at http://localhost:3000/ :)');
});

application.use(express.static(
    path.join(path.join(__dirname, '../'), 'public')
))

messagesController(application);
recipientsController(application);
usersController(application);

setInterval(sendEmailsToRecipients, 600000);

export default application;
