var uriAuth = 'api/Okta'; //webapi uri for callback

//ViewModel Code for General Errors
function OKTAPOCVM() {
    var thisVM = this;


    thisVM.dataresult = ko.observable("");
    thisVM.userNewData = ko.observable("");

    thisVM.MessageData = ko.observable("Ready!");
    thisVM.NewUserName = ko.observable("NewUserName@financialpartners.com");
    thisVM.DelUserName = ko.observable("NewUserName@financialpartners.com");
    thisVM.Password = ko.observable("******");
    thisVM.SecurityAnswer = ko.observable("ilikechicken");


    thisVM.onDeleteUser = function () {
        var request = $.ajax({
            url: uriAuth + "/4",
            type: 'POST',
            data: JSON.stringify(thisVM.DelUserName),
            dataType: 'json',
            contentType: 'application/json'
        });

        request.done(function (data) {

            alert("Deleted!");
        });

        request.fail(function (jqXHR, textStatus, errThrown) {
            alert("Failure to Delete!" + textStatus + " Error: " + errThrown);

        });

        request.always(function () {
            $('html,body').css('cursor', 'auto');
        });
    }

    thisVM.onCreateUser = function ()
    {
        var request = $.ajax({
            url: uriAuth + "/3",
            type: 'POST',
            data: JSON.stringify(thisVM.NewUserName),
            dataType: 'json',
            contentType: 'application/json'
        });

        request.done(function (data) {

            alert("Created New User -- " + data.profile.firstName);
        });

        request.fail(function (jqXHR, textStatus, errThrown) {
            alert("Failure to Create!" + textStatus + " Error: " + errThrown);

        });

        request.always(function () {
            $('html,body').css('cursor', 'auto');
        });
    }

    thisVM.onAuthenticate = function () {
        var request = $.ajax({
            url: uriAuth + "/1",
            type: 'POST',
            //data: JSON.stringify(jsonSurveyRequest),
            dataType: 'json',
            contentType: 'application/json'
        });

        request.done(function (data) {
            thisVM.MessageData("Success! " + data.profile.firstName);
            thisVM.dataresult(data);
            alert("Your request was successful: " + thisVM.dataresult().profile.firstName);
        });

        request.fail(function (jqXHR, textStatus, errThrown) {
            alert("Failure to Save!" + textStatus + " Error: " + errThrown);

        });

        request.always(function () {
            $('html,body').css('cursor', 'auto');
        });

    }
    thisVM.onAuthenticate2 = function () {
        var request = $.ajax({
            url: uriAuth + "/2",
            type: 'GET',
            //data: JSON.stringify(jsonSurveyRequest),
            dataType: 'json',
            contentType: 'application/json'
        });

        request.done(function (data) {
            alert("Your request was successful: ")
        });

        request.fail(function (jqXHR, textStatus, errThrown) {
            alert("Failure to Save!" + textStatus + " Error: " + errThrown);

        });

        request.always(function () {
            $('html,body').css('cursor', 'auto');
        });

    }

    thisVM.onSessionCreate = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://financialpartners.okta.com/api/v1/sessions?additionalFields=cookieToken",
            "method": "POST",
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "authorization": "SWSS 12391092jdkj4BJ8498JQHNEifj3891823478px83E"
            },
            "processData": false,
            "data": "{\n  \"username\": \"eric.pahl@financialpartners.com\",\n  \"password\": \"1234!\"\n}"
        }

        var request = $.ajax(settings);
        request.done(function (data) {

            alert("Session Created");
        });
        request.fail(function (jqXHR, textStatus, errThrown) {
            alert("Failure to create session!" + textStatus + " Error: " + errThrown);

        });
        request.always(function () {
            $('html,body').css('cursor', 'auto');
        });

    };
    //thisVM.checkEnter = function (d, e) {
    //    if (e.keyCode === 13) {
    //        window.location = d.SurveyUrl();
    //        //document.location.href((d.SurveyUrl()));
    //    }
    //    return true;
    //};

    //thisVM.ErrorMessage = unescape(errorMsg);
    //thisVM.SurveyUrl = ko.observable(document.referrer);



    //thisVM.OnGotoClick = function (data) {
    //    document.location.href(escape(thisVM.SurveyUrl()));
    //};
};
$(document).ready(function () {
    //Function to get QueryString parms
    //var querystrings = [], hash;
    //var q = document.URL.split('?')[1];
    //if (q != undefined) {
    //    q = q.split('&');
    //    for (var i = 0; i < q.length; i++) {
    //        hash = q[i].split('=');
    //        querystrings.push(hash[1]);
    //        querystrings[hash[0]] = hash[1];
    //    }
    //}
    //var errormessage = querystrings['ErrorMsg'] || '';

    ko.applyBindings(new OKTAPOCVM());

});