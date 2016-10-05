/**
 * Created
 */

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppConfig from '../../config/chat-config';
//import {Welcome} from '../welcome-module/welcome';

@inject(Router, 'pwebContext')
export class Chat {

    constructor(router, pwebContext, chatEndPoint) {
        this.router = router;
        this.pwebContext = pwebContext;

        this.heading = 'Welcome to the Chat App!';
        this.info = 'Please configure the chat API URL in chat-config.js file';
        this.data = '';

    };

    activate(welcomeModel, params){
        this.data = params.data;
    }

    get getClass() {
        //do your magic here
        return 'disabledStyle';
    }

    created(owningView, view) {
        
        let firstName = this.data.firstName;
        let lastName = this.data.lastName;
        let email = this.data.email;
        let sendTranscript = this.data.sendTranscript;
        let helpMessage = this.data.helpMessage;
        let question = this.data.question;

        let pwebContext = this.pwebContext;
        
        var widgetBus = window._genesys.cxwidget.bus;

        window._genesys.cxwidget.bus.command("cx.plugin.WebChatService.configure", {
            dataURL: window.chatEndPoint.genesysChatServiceAPI
        }).done(function(e) {
            // success scenario
        }).fail(function(e) {
            // failure scenario: error, exception, improper arguments
            //alert('configure fail');
        })


        widgetBus.subscribe("cx.plugin.WebChat.ready", function(){
            //alert('chat is ready');
        });

        widgetBus.subscribe("cx.plugin.WebChat.closed", function(){
            //alert('chat is closed');
            window.close();
        });

        widgetBus.subscribe("cx.plugin.WebChat.minimized", function(){
            // alert('chat is minimized');
        });

        widgetBus.subscribe("cx.plugin.WebChat.unminimized", function(){
            //alert('chat is unminimized');
        });


        window._genesys.cxwidget.bus.command("cx.plugin.WebChat.open", {form : false}).done(function(e)
        {
            $('.cx-widget.cx-webchat').find("textarea.input").removeClass("disabled").attr("disabled", false);
            var myobject = $('.cx-widget.cx-webchat');

            console.log('************** User Context Is **************'  +  pwebContext);

            window._genesys.cxwidget.bus.command("cx.plugin.WebChatService.startChat", {
                userData: pwebContext,
                nickname: firstName,
                firstname: firstName,
                lastname: lastName,
                email: email,
                subject: question
                
            }).done(function(e) {
                //alert('startChat Success');
                // success scenario
            }).fail(function(e) {
                // failure scenario: error, exception, improper arguments
                //alert('startChat Failure');
                return false;
            })// success scenario

        }).fail(function(e)
        {
            // failure scenario: error, exception, improper arguments
        })
    }

}
