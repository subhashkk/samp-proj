/**
 * Created
 */

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Header {

    constructor(router){
        this.heading = 'Welcome to the Random Quotes App!';
        this.info = 'You can get a random quote without logging in, but if you do log in you can get a super secret quote!';
    };

}