/**
 * Javascript function for the search page.
 */

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
                printData(users);
            }
        }
    });
}

function printData(users)
{
    //Prints user
    for(i = 0; i < users.length; i++)
    {
        document.getElementById("userContainer").innerHTML += '<div id="i" style="background-color: red">';

        document.getElementById("userContainer").innerHTML += "id: " + users[i]["id"] + "<br>name: " + users[i]["name"] + " <br>email: " + users[i]["email"]
            + "<br>authToken: " + users[i]["authToken"] + "<br>date created: " + users[i]["dateCreated"] + "<br><br>";

        document.getElementById("userContainer").innerHTML += '</div>';
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
        sqlSettings = new SQL_Setting(applicationData["dblocation"],applicationData["query"]);
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