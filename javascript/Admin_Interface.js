/**
 * Javascript function for the search page.
 */
$(document).ready(function(){

    var url=window.location.href.split('/');
    var name=url[url.length-1];
    $("li").removeClass("activeNav");
    $( '#li'+activeType).last().addClass( "activeNav" );
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode == 13)
        {
            e.preventDefault();
            search();
        }
    }, false);
    if(name.indexOf("searchValue") >= 0)
    {
        search();
    }
    else if(name.indexOf("Admin_Interface.php") >= 0)
    {
        search();
    }
});

function search()
{
    var searchType = $("#menu").find(".activeNav")[0].innerText;
    var searchValue = document.getElementById("searchValue").value;
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    if(name.indexOf("Admin_Interface.php") < 0)
        window.location.href = "Admin_Interface.php?activeType="+activeType+"&searchValue="+searchValue+"&searchType="+searchType;
    else {
        if(name.indexOf("searchValue") >= 0)
        {
            name = name.split("?")[1];
            name = name.split("&");
            searchValue = name[1].split("=")[1];
            searchType = name[2].split("=")[1];
            history.pushState({}, null, "Admin_Interface.php?activeType="+activeType);
        }
        getDataFromAPI(searchType, searchValue, function (users, searchType) {
            printData(users, searchType)
        });
    }
}

function getDataFromAPI(searchType, searchValue, callback)
{
    var url;
    if(searchValue == null)
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");
    else
        url = "https://confdroid.brainstorm-labs.net/api/"+searchType.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie")+"&searchValue="+searchValue;
    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            console.log(data);
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
            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("Login.php?timedout=true");
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"]);
            }
        }

    });
}

function deleteAndPutData(type, putOrDelete)
{
    var url = "https://confdroid.brainstorm-labs.net/api/"+type.toLowerCase()+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie");

    $.ajax({
        type: putOrDelete,
        url: url,
        success: function(data){
            console.log(data);
            if(data[0] == "Failed")
            {
                console.log("Didn't get any match");

            }
            else if(data[0] == "Not Authorized")
            {
                console.log("Not authorized");
            }
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                case 403:
                    window.location.replace("Login.php?timedout=true");
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"]);
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
            url = "User_Result.php?activeType=User&data=";
            urlvar = "authToken";
            break;
        case "Group":
            url = "Group_Result.php?activeType=Group&data=";
            urlvar = "id";
            break;
        case "Device":
            url = "Device_Result.php?activeType=Device&data=";
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
        var div = document.createElement("div");
        div.id = "dataDiv"+i;
        var p = document.createElement("p");
        var trashCan = document.createElement("img");
        trashCan.id = i;
        trashCan.src = "../images/trash-can-icon.png";
        trashCan.classList.add("img");
        var settings = document.createElement("img");
        settings.id = i;
        settings.src = "../images/settings-icon.png";
        settings.classList.add("img");
        p.id = i;
        p.innerHTML = data[i]["name"];
        div.appendChild(trashCan);
        div.appendChild(settings);
        div.appendChild(p);
        div.classList.add("templateText");
        document.getElementById(infoParentId).appendChild(div);
        trashCan.onclick = function (e)
        {
            deleteElement(e, data, type);
        }
        p.onclick = function(e)
        {
            url+=data[e.target.id][type];
            changeLocation(url)
        };
    }
}

function deleteElement(e, data, type)
{
    if(confirm("Are you sure you want to delete " + data[e.target.id]["name"] +"?"))
    {
        console.log(document.getElementById("objectType"));
        if(document.getElementById("objectType") == null)
            console.log(activeType);
        else
            console.log(document.getElementById("objectType").innerHTML);
        console.log("Deleted!");
    }
    else
    {
        console.log("Cancelled!");
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
    document.getElementById("searchValue").value = "";
    $("li").removeClass("activeNav");
    $( '#'+liId).last().addClass( "activeNav" );
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    var activeType = liId.split("li");
    url = url[url.length-1].split("=")[0]+"="+activeType[1];
    history.pushState({}, null, url);
    if(name.indexOf("Admin_Interface.php") >= 0)
    {
        search();
    }
}

/**
 * Logs out the administrator.
 * Removes cookies and reloacte the user to login screen.
 * @param authToken
 * @param id
 */
function logOut()
{
    alert("Not implemented yet");
    $.ajax({
        type: "DELETE",
        url: "https://confdroid.brainstorm-labs.net/api/admin/login.json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCooikie"),
        success: function(data, textStatus, xhr){
            $.removeCookie("authCookie");
            $.removeCookie("adminIdCookie");
            $.removeCookie("userName");
            window.location.replace("Admin_Interface.php?loggedOut=true");
        }
    });
}
/**
 * Open new page
 */
function openSettingPage()
{
    myRef = window.open('Setting_Page_Info_User.php','Setting','left=200,top=0,width='+(parseInt(window.innerWidth) * 0.8)+',height='+(parseInt(window.innerHeight) * 0.9)+',toolbar=0,'+
        'resizable=1, status = 0, menubar = 0, location=0');
}