import Home from './Home'
import Email from './components/Email'

export default {
    mode:'history',
    linkExactActiveClass: 'active',
    routes:[
        {path: '/', component:Home},
        {path: '/data-view/emails/:id', component:Email,name:'email.show'},
        {path: '/data-view/emails/recipient/:email', component:Email,name:'recipient.emails'},
    ]
}
