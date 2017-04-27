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
            // console.log(json);
            var data = JSON.parse(json);
            if(data[0] == "Failed")
            {
                console.log("Didn't get any users");

            }
            else if(data[0] == "Not Authorized")
            {
                console.log("Not authorized");
            }
            else
            {
                console.log(data);
                var users = returnUsers(data);
                printUsers(users);
                console.log(users);
            }
        }
    });
}

/**
 * Prints the searched users in the user table.
 * If a name is clicked on then the devices are shown.
 * @param users
 */
function printUsers(users)
{
    for(var i = 0; i < users.length; i++)
    {
       var div = document.createElement('div');
       div.id= "userId"+i;
       div.onclick = function(e){printUserDevices(users[$(e.target).attr("jsid")]);};
       document.getElementById("userContainer").appendChild(div);
       document.getElementById("userId"+i).innerHTML = users[i]["name"];
       $("#userId"+i).attr("jsid", i);
       $("#userId"+i).addClass("clickable");
    }
}

/**
 * Prints the devices that the clicked user have.
 * If a device is clicked the the application of the device is showed.
 * @param user
 */
function printUserDevices(user)
{
    $('#deviceContainer').empty();                                        //Clears device
    $('#appContainer').empty();                                           //Clears app
    $('#appSettingsContainer').empty();                                   //Clears settings
    if(user["devices"].length == 0)
    {
        document.getElementById("deviceContainer").innerHTML = "No device registered on user.";
        return;
    }
    for(var i = 0; i < user["devices"].length; i++)
    {
        var div = document.createElement('div');
        div.id = "deviceId"+i;                                           //creates a div that contains the info.
        div.onclick = function(e){printApplicationFromDevice(user["devices"][$(e.target).attr("jsid")]);};
        document.getElementById("deviceContainer").appendChild(div);     //Places the new div in deviceContainer
        document.getElementById("deviceId"+i).innerHTML = user["devices"][i]["name"];
        $("#deviceId"+i).attr("jsid", i);                                //Adds value to the div. The value is the index in the user devices.
        $("#deviceId"+i).addClass("clickable");                          //Adds css class to the div tag.
    }
}

function printApplicationFromDevice(device)
{
    $('#appContainer').empty();                                           //Clears app
    $('#appSettingsContainer').empty();                                   //Clears settings
    if(device["applications"].length == 0)
    {
        document.getElementById("appContainer").innerHTML = "No applications registered on device.";
        return;
    }
    for(var i = 0; i < device["applications"].length; i++)
    {
        var div = document.createElement('div');
        div.id = "applicationId"+i;                                           //creates a div that contains the info.
        div.onclick = function(e){printSqlFromApp(device["applications"][$(e.target).attr("jsid")]);printXmlFromApp(device["applications"][$(e.target).attr("jsid")]);};
        document.getElementById("appContainer").appendChild(div);             //Places the new div in applicationContainer
        document.getElementById("applicationId"+i).innerHTML = device["applications"][i]["apkName"];
        $("#applicationId"+i).attr("jsid", i);                                //Adds value to the div. The value is the index of the application in the device..
        $("#applicationId"+i).addClass("clickable");                          //Adds css class to the div tag.
    }
}//

/**
 * Shows sql window where the admin can change settings.
 * @param application
 */
function printSqlFromApp(application)
{
    $('#appSettingsContainer').empty();                                               //Clears settings
    if( application["sqlSetting"].length == 0)
    {
        var txtArea = document.createElement('textarea');
        txtArea.id = "sqlId"+i;                                                   //Creates a textarea that contains the sql setting.
        document.getElementById("appSettingsContainer").appendChild(txtArea);     //Places the new textarea in appsettingcontainer
        document.getElementById("sqlId"+i).innerHTML = "DB location:\n"+"(Enter database url here.)"+ "\n\nDB Query:\n"+"(Enter SQL query here.)";
        $("#sqlId"+i).attr("jsid", i);                                            //Adds the setting to the textarea.
        $("#sqlId"+i).addClass("txtArea");                                        //Adds css class to the div tag.
    }
    for(var i = 0; i < application["sqlSetting"].length; i++)
    {
        var txtArea = document.createElement('textarea');
        txtArea.id = "sqlId"+i;                                                   //Creates a textarea that contains the sql setting.
        document.getElementById("appSettingsContainer").appendChild(txtArea);     //Places the new textarea in appsettingcontainer
        document.getElementById("sqlId"+i).innerHTML = "DB location:\n"+application["sqlSetting"][i]["dbLocation"];
        document.getElementById("sqlId"+i).innerHTML += "\n\nDB Query:\n"+application["sqlSetting"][i]["dbQueries"];
        $("#sqlId"+i).attr("jsid", i);                                            //Adds the setting to the textarea.
        $("#sqlId"+i).addClass("txtArea");                                        //Adds css class to the div tag.
    }
    var btn = document.createElement("button");
    var t = document.createTextNode("Save SQL");
    btn.appendChild(t);
    btn.onclick = function(){alert("Implement save function here");};
    document.getElementById("appSettingsContainer").appendChild(btn);
}

/**
 * Shows xml window where the admin can change settings.
 * @param application
 */
function printXmlFromApp(application)
{
    console.log(application);
    if(application["xmlSetting"].length == 0)
    {
        var txtArea = document.createElement('textarea');
        txtArea.id = "xmlId"+i;                                                   //Creates a textarea that contains the sql setting.
        document.getElementById("appSettingsContainer").appendChild(txtArea);     //Places the new textarea in appsettingcontainer
        document.getElementById("xmlId"+i).innerHTML += "File location:\n"+"(Enter where file is stored here.)"+ "\n\nRegularexp:\n"+"(Enter here.)" + "\n\nReplace with:\n(Enter what it should replace with)";
        $("#xmlId"+i).attr("jsid", i);                                            //Adds the setting to the textarea.
        $("#xmlId"+i).addClass("txtArea");                                        //Adds css class to the div tag.
    }
    for(var i = 0; i < application["xmlSetting"].length; i++)
    {
        var txtArea = document.createElement('textarea');
        txtArea.id = "xmlId"+i;
        document.getElementById("appSettingsContainer").appendChild(txtArea);
        document.getElementById("xmlId"+i).innerHTML  = "File location:\n"+application["xmlSetting"][i]["fileLocation"];
        document.getElementById("xmlId"+i).innerHTML += "\n\nDB Query:\n"+application["xmlSetting"][i]["ragexp"];
        document.getElementById("xmlId"+i).innerHTML += "\n\nDB Query:\n"+application["xmlSetting"][i]["replaceWith"];
        $("#xmlId"+i).attr("jsid", i);
        $("#xmlId"+i).addClass("txtArea");
    }
    var btn = document.createElement("button");
    var t = document.createTextNode("Save XML");
    btn.appendChild(t);
    btn.onclick = function(){alert("Implement save function here");};
    document.getElementById("appSettingsContainer").appendChild(btn);
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
        var sqlSettings = returnApplicationSqlSettings(deviceData["applications"][i]["SQL_settings"]);
        var xmlSettings = returnApplicationXmlSettings(deviceData["applications"][i]["XML_settings"]);
        applications[i] = new Application(sqlSettings,xmlSettings,deviceData["applications"][i]["forceInstall"],deviceData["applications"][i]["dataDir"],deviceData["applications"][i]["apkName"],deviceData["applications"][i]["apkURL"]);
    }
    return applications;
}

/**
 * Returns an array with sql settings. Data taken from the api.
 * @param sqlData
 * @returns {Array}
 */
function returnApplicationSqlSettings(sqlData)
{
    var sqlSettings = [];
    for(var i = 0; i < sqlData.length; i++)
    {
        sqlSettings[i] = new SQL_Setting(sqlData[i]["dblocation"],sqlData[i]["query"]);
    }
    return sqlSettings;
}

/**
 * Returns an array with xml settings. Data is taken from the api.
 * @param xmlData
 * @returns {Array}
 */
function returnApplicationXmlSettings(xmlData)
{
    var xmlSettings = [];
    for(var i = 0; i < xmlData.length; i++)
    {
        xmlSettings[i] = new XML_Setting(xmlData[i]["fileLocation"],xmlData[i]["regexp"], xmlData[i]["replaceWith"]);
    }
    return xmlSettings;
}