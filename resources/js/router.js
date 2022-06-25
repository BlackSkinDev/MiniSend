import Home from './Home'
import Email from './components/Email'
import RecipientEmails from './components/RecipientEmails'

export default {
    mode:'history',
    linkExactActiveClass: 'active',
    routes:[
        {path: '/', component:Home},
        {path: '/data-view/emails/:id', component:Email,name:'email.show'},
        {path: '/data-view/emails/recipient/:email', component:RecipientEmails,name:'recipient.emails'},
    ]
}