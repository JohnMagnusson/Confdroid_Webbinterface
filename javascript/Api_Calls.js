/**
 * Api_Calls have functions to communicate with the API
 */

/**
 * Gets data from th api baed on the searchType and searchValue.
 * Sends the the result to the param callback function.
 * @param searchType
 * @param searchValue
 * @param callback
 */
function getDataFromAPI(searchType, searchValue, callback)
{
    var url;
    if(searchValue == null)
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");
    else
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie")+"&searchValue="+searchValue;
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            console.log(data);
            if(data[0] == "Not Authorized")
            {
                console.log("Not authorized");
            }
            else
            {
                callback(data, searchType);
            }
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("Login.php?timedout=true");
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
            }
        }
    });
}

/**
 * Makes an api call based on restMethod on apiType.
 * Function can handle POST,PUT, DELETE. Cannot handle GET.
 * @param apiType
 * @param restMethod
 * @param data
 */
function apiChangeData(apiType, restMethod, data, printStatus)
{
    var url = "https://confdroid.brainstorm-labs.net/api/"+apiType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");
    console.log(url);
    $.ajax({
        type: restMethod,
        url: url,
        data: data,
        success: function(data, textStatus, XHR){
            console.log(XHR["responseText"]);
            console.log(data);
            console.log(XHR["status"]);
            console.log(textStatus);
            switch(XHR["status"])
            {
                case 200:
                    printStatus(200);
                    break;
                case 201:
                    alert("Success!");
                    break;
            }
            if(window.opener == null)
                location.reload();
            else
                window.opener.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR["responseText"]);
            // console.log(data);
            console.log(textStatus);

            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("Login.php?timedout=true");
                    break;
                case 409:
                    alert("Some conflict happend");
                    break;
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"]);
            }
        }
    });
}

