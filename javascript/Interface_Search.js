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
    document.getElementById("userContainer").innerHTML = " ";
    var searchType = document.getElementById("searchDropDown").value;
    var searchValue = document.getElementById("searchValue").value;
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/Confdroid_Api/api/admin/search.json",
        data: "authToken="+authToken+"&id="+id+"&searchType="+searchType+"&searchValue="+searchValue,
        success: function(json){
            console.log(json);
            var data = JSON.parse(json);
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
                console.log(data);
                if(searchType == "User") {
                    var users = returnUsers(data);
                    printUsers(users, "userContainer", "outer");
                }
                else if(searchType == "Group")
                {
                    printGroups(data, "userContainer", "outer");
                }
            }
        }
    });
}

function getUsersFromGroup(group)
{
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/Confdroid_Api/api/admin/search.json",
        data: "authToken="+authToken+"&id="+id+"&searchType=userFromGroup"+"&searchValue="+group["id"],
        success: function(json){
            console.log(json);
            var data = JSON.parse(json);
        }
    });
}

function createClickableDivOnParent(divId, parentId, jsid, cssClassName)
{
    var div = document.createElement('div');
    div.id = divId;
    document.getElementById(parentId).appendChild(div);
    $("#"+divId).attr("jsid", jsid);
    $("#"+divId).addClass("clickable");
    $("#"+divId).addClass(cssClassName);
    if(cssClassName == "outer")
        $('.outer').css({"border":"none"});
    return div;
}

function printGroups(groups, parentId, cssClassName)
{
    for(var i = 0; i < groups.length; i++) {
        var div = createClickableDivOnParent("group"+i,parentId, i, cssClassName);
        div.onclick = function(e){
            $(e.target).css({"border":"thin solid black"});
            var test = $(e.target)[0].childNodes;
            var m = test.length;
            for(var i = m-1; i >= 1; i--)
            {
                test[i].remove();
            }
            printUsers(getUsersFromGroup(groups[i]), this.id, "inner");
        }
        div.innerHTML = groups[i]["name"];
    }
}

/**
 * Prints the searched users in the user table.
 * If a name is clicked on then the devices are shown.
 * @param users
 */
function printUsers(users, parentId, cssClassName)
{
    for(var i = 0; i < users.length; i++)
    {
       var div = createClickableDivOnParent("user"+i, parentId, i, cssClassName);
       div.onclick = function(e){printUserDevices(users[$(e.target).attr("jsid")]);};
       div.innerHTML = users[i]["name"];
    }
}

/**
 * Prints the devices that the clicked user have.
 * If a device is clicked the the application of the device is showed.
 * @param user
 */
function printUserDevices(user)
{
    if(user["devices"].length == 0)
    {
        document.getElementById("deviceContainer").innerHTML = "No device registered on user.";
        return;
    }
    else
        document.getElementById("deviceContainer").innerHTML = "";      //Clears the container from old info.
    for(var i = 0; i < user["devices"].length; i++)
    {
        var div = createClickableDivOnParent("deviceId"+i, "deviceContainer", i, "outer");
        div.onclick = function(e){printApplicationFromDevice(user["devices"][$(e.target).attr("jsid")]);};
        div.innerHTML = user["devices"][i]["name"];
    }
}

function printApplicationFromDevice(device)
{
    document.getElementById("appSettingsContainer").innerHTML = "";
    if(device["applications"].length == 0)
    {
        document.getElementById("appContainer").innerHTML = "No applications registered on device.";
        return;
    }
    else
        document.getElementById("appContainer").innerHTML = "";      //Clears the container from old info.
    for(var i = 0; i < device["applications"].length; i++)
    {
        var div = createClickableDivOnParent("applicationId"+i, "appContainer", i, "outer");
        div.onclick = function(e){printSqlFromApp(device["applications"][$(e.target).attr("jsid")]);};
        div.innerHTML = device["applications"][i]["apkName"];
    }
}

function printSqlFromApp(application)
{
    document.getElementById("appSettingsContainer").innerHTML = "";
    for(var i = 0; i < application["sqlSetting"].length; i++)
    {
        var txtArea = document.createElement('textarea');
        txtArea.id = "sqlId"+i;                                                   //Creates a textarea that contains the sql setting.
        document.getElementById("appSettingsContainer").appendChild(txtArea);     //Places the new textarea in appsettingcontainer
        document.getElementById("sqlId"+i).innerHTML = application["sqlSetting"][i]["dbLocation"];
        document.getElementById("sqlId"+i).innerHTML = application["sqlSetting"][i]["dbQueries"];
        $("#sqlId"+i).attr("jsid", i);                                            //Adds the setting to the textarea.
        $("#sqlId"+i).addClass("txtArea");                                        //Adds css class to the div tag.
    }
}



/**
 * Return users from the search data from the api.
 * @param data
 */
function returnUsers(data)
{
    var users = [];
    for(i = 0; i < data.length; i++)
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