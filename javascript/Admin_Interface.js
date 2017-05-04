/**
 * Javascript function for the search page.
 */
$(document).ready(function(){
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode == 13)
        {
            e.preventDefault();
            search(token, adminId);
        }
    }, false);
});

function search(authToken, id)
{
    var searchType = $("#menu").find(".activeNav")[0].innerText;
    var searchValue = document.getElementById("searchValue").value;
    search2(authToken, id, searchType, searchValue, function(users, searchType, authToken, id){printData(users, searchType, authToken, id)});
}

function search2(authToken, id, searchType, searchValue, callback)
{
    var url;
    if(searchValue == null)
        url = "https://confdroid.tutus.se/api/"+searchType.toLowerCase()+".json?authToken="+authToken+"&id="+id;
    else
        url = "https://confdroid.tutus.se/api/"+searchType.toLowerCase()+".json?authToken="+authToken+"&id="+id+"&searchValue="+searchValue;
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
                callback(data, searchType, authToken, id);
            }
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("Admin_Interface.php?timedout=true");
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown);
            }
        }

    });
}

function printData(data, searchType, authToken, id)
{
    var url;
    var urlvar;
    switch(searchType)
    {
        case "User":
            url = "result_pages/User_Result.php?authToken="+authToken+"&id="+id+"&userAuth=";
            urlvar = "authToken";
            break;
        case "Group":
            url = "result_pages/Group_Result.php?authToken="+authToken+"&id="+id+"&groupId=";
            urlvar = "authToken";
            break;
        case "Device":
            url = "result_pages/User_Result.php?authToken="+authToken+"&id="+id+"&userId=";
            urlvar = "authToken";
            break;
    }
    createPTagsForData("previousInfo", data, url);
}

function changeLocation(url)
{
    window.location.href = url;
}

function createPTagsForData(infoParentId, data, url)
{
    $("#"+infoParentId).empty();
    for(var i = 0; i < data.length; i++)
    {
        var p = document.createElement("p");
        p.id = i;
        p.innerHTML = data[i]["name"] + "<img src='images/trash-can-icon.png' class='img'><img src='images/settings-icon.png' class='img'>";
        p.classList.add("templateText");
        document.getElementById(infoParentId).appendChild(p);
        p.onclick = function(e){url+=data[e.target.id]["authToken"];changeLocation(url)};
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
 * @param authToken
 * @param id
 */
function logOut(authToken,id)
{
    $.ajax({
        type: "DELETE",
        url: "https://confdroid.tutus.se/api/admin/login.json?authToken="+authToken+"&id="+id,
        success: function(data, textStatus, xhr){
            window.location.replace("Admin_Interface.php?loggedOut=true");
        }
    });
}