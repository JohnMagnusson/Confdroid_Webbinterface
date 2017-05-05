/**
 * Javascript function for the search page.
 */
$(document).ready(function(){
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode == 13)
        {
            e.preventDefault();
            search(token, adminId);
        }
    }, false);
    if(name.indexOf("?searchValue") >= 0)
    {
        search(token, adminId);
    }
});

function search(authToken, id)
{
    var searchType = $("#menu").find(".activeNav")[0].innerText;
    var searchValue = document.getElementById("searchValue").value;
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    if(name.indexOf("Admin_Interface.php") < 0)
        window.location.href = "Admin_Interface.php?searchValue="+searchValue+"&searchType="+searchType;
    else {
        if(name.indexOf("?searchValue") >= 0)
        {
            name = name.split("?")[1];
            name = name.split("&");
            searchValue = name[0].split("=")[1];
            searchType = name[1].split("=")[1];
            history.pushState({}, null, "Admin_Interface.php");
        }
        search2(authToken, id, searchType, searchValue, function (users, searchType, authToken, id) {
            printData(users, searchType, authToken, id)
        });
    }
}

function search2(authToken, id, searchType, searchValue, callback)
{
    var url;
    if(searchValue == null)
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+authToken+"&id="+id;
    else
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+authToken+"&id="+id+"&searchValue="+searchValue;
    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            if(data[0] == "Failed")
            {
                console.log("Didn't get any match");

            }
            else if(data[0] == "Not Authorized")
            {
                console.log("Not authorized");
            }
            else
            {
                callback(data, searchType);
            }
        },
        error: function( jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("/web_pages/Admin_Interface.php?timedout=true");
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown);
            }
        }

    });
}

function printData(data, searchType)
{
    var url;
    var urlvar;
    switch(searchType)
    {
        case "User":
            url = "User_Result.php?data=";
            urlvar = "authToken";
            break;
        case "Group":
            url = "Group_Result.php?data=";
            urlvar = "id";
            break;
        case "Device":
            url = "Device_Result.php?data=";
            urlvar = "imei";
            break;
    }
    createPTagsForData("previousInfo", data, url, urlvar);
}

function changeLocation(url)
{
    window.location.href = url;
}

function createPTagsForData(infoParentId, data, url, type)
{
    $("#"+infoParentId).empty();
    for(var i = 0; i < data.length; i++)
    {
        var p = document.createElement("p");
        p.id = i;
        p.innerHTML = data[i]["name"] + "<img src='../images/trash-can-icon.png' class='img'><img src='../images/settings-icon.png' class='img'>";
        p.classList.add("templateText");
        document.getElementById(infoParentId).appendChild(p);
        p.onclick = function(e){url+=data[e.target.id][type];changeLocation(url)};
    }
}

/**
 * Return users from the search data from the api.
 * @param data
 */
function returnUsers(data)
{
    var users = [];
    for(var i = 0; i < data.length; i++)
    {
        var groups = returnUserGroups(data[i]);
        var devices = returnUserDevices(data[i]);
        users[i] = new User(data[i]["id"],data[i]["name"],data[i]["email"],devices,groups,data[i]["authToken"],data[i]["dateCreated"]);
    }
    return users;
}

/**
 * Returns groups that the user can be a part of.
 * @param data, is data from the api
 * @param index, Index of the group from the data object.
 * @returns {Array}
 */
function returnUserGroups(data)
{
    var groups = [];
    for(var i = 0; i < data["groups"].length; i++)
    {
        groups[i] = new Group(data["groups"][i]["id"],data["groups"][i]["name"], data["groups"][i]["prio"]);
    }
    return groups;
}

/**
 * Return devices with applications in them.
 * @param data
 * @returns {Array}
 */
function returnUserDevices(data)
{
    var devices = [];
    for(var i = 0; i < data["devices"].length; i++)
    {
        var applications = returnDeviceApplications(data["devices"][i]);
        devices[i] = new Device(data["devices"][i]["name"],data["devices"][i]["imei"], data["devices"][i]["dateCreated"],applications);
    }
    return devices;
}

/**
 * Return applications in the devices. Data taken from the APi in a search.
 * @param deviceData
 * @returns {Array}
 */
function returnDeviceApplications(deviceData)
{
    var applications = [];
    for(var i = 0; i < deviceData["applications"].length; i++)
    {
        var sqlSettings = returnApplicationSqlSettings(deviceData["applications"][i]);
        var xmlSettings = returnApplicationXmlSettings(deviceData["applications"][i]);
        applications[i] = new Application(sqlSettings,xmlSettings,deviceData["applications"][i]["forceInstall"],deviceData["applications"][i]["dataDir"],deviceData["applications"][i]["apkName"],deviceData["applications"][i]["apkURL"]);
    }
    return applications;
}

/**
 * Returns an array with sql settings. Data taken from the api.
 * @param applicationData
 * @returns {Array}
 */
function returnApplicationSqlSettings(applicationData)
{
    var sqlSettings = [];
    for(var i = 0; i < applicationData["SQL_settings"].length; i++)
    {
        sqlSettings[i] = new SQL_Setting(applicationData["SQL_settings"][i]["dblocation"],applicationData["SQL_settings"][i]["query"]);
    }
    return sqlSettings;
}

/**
 * Returns an array with xml settings. Data is taken from the api.
 * @param applicationData
 * @returns {Array}
 */
function returnApplicationXmlSettings(applicationData)
{
    var xmlSettings = [];
    for(var i = 0; i < applicationData["XML_settings"].length; i++)
    {
        xmlSettings = new XML_Setting(applicationData["fileLocation"],applicationData["regexp"], applicationData["replaceWith"]);
    }
    return xmlSettings;
}

/**
 * Updates the activeClass on menu items.
 * @param liId
 */
function updateNav(liId)
{
    $("li").removeClass("activeNav");
    $( '#'+liId).last().addClass( "activeNav" );
}

/**
 * Logs out the administrator.
 * Removes cookies and reloacte the user to login screen.
 * @param authToken
 * @param id
 */
function logOut()
{
    $.ajax({
        type: "DELETE",
        url: "https://confdroid.tutus.se/api/admin/login.json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCooikie"),
        success: function(data, textStatus, xhr){
            $.removeCookie("authCookie");
            $.removeCookie("adminIdCookie");
            $.removeCookie("userName");
            window.location.replace("Admin_Interface.php?loggedOut=true");
        }
    });
}