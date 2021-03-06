/**
 * Api_Calls have functions to communicate with the API
 */

var standardUrl = "https://confdroid.tutus.se/api/";
/**
 * Gets data from th api based on the searchType and searchValue.
 * Sends the the result to the param callback function.
 * @param searchType
 * @param searchValue
 * @param callback
 */
function getDataFromAPI(searchType, searchValue, callback)
{
    var url;
    console.log($.cookie("authCookie"));
    if(searchValue === null)
        url = standardUrl+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");
    else
        url = standardUrl+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie")+"&searchValue="+searchValue;
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            console.log(data);
            if(data[0] === "Not Authorized")
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
                    window.location.replace("../index.php?timedout=true");
                    break;
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
                    break;
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
 * @param printStatus
 */
function apiChangeData(apiType, restMethod, data, printStatus)
{
    var url = standardUrl+apiType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");
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
                    printStatus(201);
                    break;
                case 204:
                    printStatus(204);
                    break;
                default:
                    printStatus(900);
                    break;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR["responseText"]);
            // console.log(data);
            console.log(textStatus);

            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("../index.php?timedout=true");
                    break;
                case 404:
                    printStatus(404);
                    break;
                case 409:
                    printStatus(409);
                    break;
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"]);
            }
        }
    });
}

