/**
 * Handles functions for the add popup page.
 * It can add existing object (User, Device...) to another object
 * It can search and show information
 */
$(document).ready(function(){
    document.getElementById(currentPage).classList.add("activeLi");
    if(document.getElementById('searchValue') !== null) {
        document.getElementById('searchValue').addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                addSearch();
            }
        }, false);
    }
    if(currentPage === "Add_Existing")
        addSearch();
});

/**
 * The search function for the add page.
 */
function addSearch()
{
    $("#information").empty();
    var apiType;
    if(dataTypeToAdd === "SQL")
        apiType = "sqlsetting";
    else if(dataTypeToAdd === "XML")
        apiType = "xmlsetting";
    else
        apiType = dataTypeToAdd;
    getDataFromAPI(apiType, document.getElementById("searchValue").value, function (data) {
        showData("searchResult", data);
    });
}

/**
 * Adds an existing object (dataTypeToAdd) to another object (dataType)
 */
function add()
{
    if(currentPage === "Add_Existing") {
        if (document.getElementById("id") === null)
            alert("Select a "+dataTypeToAdd+" to add!");
        else {
            var type;
            if (typeof applicationId !== 'undefined') {
                type = "Application";
                type += "/";
                type += dataObject["applications"][applicationId]["id"];
            }
            else {
                type = dataType;
                type += "/";
                type += dataObject["id"];
            }

            type += "/";
            if (dataTypeToAdd === "SQL" || dataTypeToAdd === "XML")        //If the datatype is sql or xml then we need to add settings to the string.
                type += dataTypeToAdd + "setting";
            else
                type += dataTypeToAdd;
            type += "/";
            type += document.getElementById("id").innerText.split(" ")[1];
            console.log(type);
            apiChangeData(type, "POST", null, function (status) {
                printStatusAddPage(status);
            });
        }
    }
}

/**
 * Prints out the searched data
 * @param infoParentId
 * @param data
 */
function showData(infoParentId, data)
{
    $("#"+infoParentId).empty();
    for(var i = 0; i < data.length; i++)
    {
        var div = document.createElement("div");
        div.id = "dataDiv"+i;
        var p = document.createElement("p");
        p.id = i;
        p.innerHTML = data[i]["name"];
        div.appendChild(p);
        div.classList.add("templateText");
        document.getElementById(infoParentId).appendChild(div);
        p.onclick = function (e)
        {
            printInfoOfObject(data, e);
        };
    }
}

/**
 * Prints information about the selected object
 * @param data
 * @param e
 */
function printInfoOfObject(data, e)
{
    if(typeof document.getElementsByClassName("selected")[0] !== "undefined") {
        document.getElementsByClassName("selected")[0].classList.remove("selected");
    }
    e.target.classList.add("selected");
    var h2 = document.createElement("h2");
    h2.id = "objectType";
    h2.style = "text-align:center";
    document.getElementById("information").appendChild(h2);
    var p = document.createElement("p");
    p.id = "name";
    document.getElementById("information").appendChild(p);
    $("#objectType").html(dataTypeToAdd);
    $("#name").html('<b>Name:</b> ' + data[e.target.id]["name"]);

    switch(dataTypeToAdd)
    {
        case "Group":
            printGroupInformation(data, e);
            break;
        case "Device":
            printDeviceInformation(data, e);
            break;
        case "Application":
            printApplicationInformation(data, e);
            break;
        case "User":
            printUserInformation(data, e);
            break;
        case "SQL":
            printSqlInformation(data, e);
            break;
        case "XML":
            printXmlInformation(data, e);
            break;
    }
}

/**
 * Prints information about the selected group
 * @param data
 * @param e
 */
function printGroupInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "prio";
    document.getElementById("information").appendChild(p);
    var p1 = document.createElement("p");
    p1.id = "id";
    document.getElementById("information").appendChild(p1);
    $("#prio").html('<b>Prio:</b> ' + data[e.target.id]["prio"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

/**
 * Prints information about the selected device
 * @param data
 * @param e
 */
function printDeviceInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "nrOfApplications";
    document.getElementById("information").appendChild(p);
    var p1 = document.createElement("p");
    p1.id = "createdDate";
    document.getElementById("information").appendChild(p1);
    var p2 = document.createElement("p");
    p2.id = "id";
    document.getElementById("information").appendChild(p2);
    var p3 = document.createElement("p");
    p3.id = "imei";
    document.getElementById("information").appendChild(p3);
    $("#nrOfApplications").html('<b>Nr applications:</b> ' + data[e.target.id]["applications"].length);
    $("#createdDate").html('<b>Date created:</b> ' + data[e.target.id]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
    $("#imei").html('<b>Imei:</b> ' + data[e.target.id]["imei"]);
}

/**
 * Prints information about the selected application
 * @param data
 * @param e
 */
function printApplicationInformation(data, e)
{
    console.log(data);
    var p = document.createElement("p");
    p.id = "apkName";
    document.getElementById("information").appendChild(p);
    var p1 = document.createElement("p");
    p1.id = "packageName";
    document.getElementById("information").appendChild(p1);
    var p2 = document.createElement("p");
    p2.id = "nrOfDevices";
    document.getElementById("information").appendChild(p2);
    var p3 = document.createElement("p");
    p3.id = "nrOfGroups";
    document.getElementById("information").appendChild(p3);
    var p4 = document.createElement("p");
    p4.id = "nrOfUsers";
    document.getElementById("information").appendChild(p4);
    var p5 = document.createElement("p");
    p5.id = "id";
    document.getElementById("information").appendChild(p5);
    $("#apkName").html('<b>Apk Name:</b> ' + data[e.target.id]["apkName"]);
    $("#packageName").html('<b>Package Name:</b> ' + data[e.target.id]["packageName"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + data[e.target.id]["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + data[e.target.id]["groups"].length);
    $("#nrOfUsers").html('<b>Nr users in:</b> ' + data[e.target.id]["users"].length);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

/**
 * Prints information about the selected user
 * @param data
 * @param e
 */
function printUserInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "email";
    document.getElementById("information").appendChild(p);
    var p1 = document.createElement("p");
    p1.id = "nrOfDevices";
    document.getElementById("information").appendChild(p1);
    var p2 = document.createElement("p");
    p2.id = "nrOfGroups";
    document.getElementById("information").appendChild(p2);
    var p3 = document.createElement("p");
    p3.id = "createdDate";
    document.getElementById("information").appendChild(p3);
    var p4 = document.createElement("p");
    p4.id = "id";
    document.getElementById("information").appendChild(p4);
    var p5 = document.createElement("p");
    p5.id = "authToken";
    document.getElementById("information").appendChild(p5);
    $("#email").html('<b>Email:</b> ' + data[e.target.id]["email"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + data[e.target.id]["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + data[e.target.id]["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + data[e.target.id]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + data[e.target.id]["authToken"]);
}

/**
 * Prints information about the selected sql setting
 * @param data
 * @param e
 */
function printSqlInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

/**
 * Prints information about the selected xml setting
 * @param data
 * @param e
 */
function printXmlInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

/**
 * Prints message depending on status call from API.
 * @param status
 */
function printStatusAddPage(status)
{
    switch(status)
    {
        case 200:
            alert("Succesfully added "+document.getElementById("name").innerText.split("Name: ")[1]+" to "+dataObject["name"]);
            break;
        case 201:
            alert("Succesfully added "+document.getElementById("name").innerText.split("Name: ")[1]+" to "+dataObject["name"]);
            break;
        case 404:
            alert("This" + dataTypeToAdd + " doesn't exist anymore");
            break;
        default:
            alert("Error, try again");
            break;
    }
    if(window.opener === null) {
        location.reload();
    }
    else
        window.opener.location.reload();
}
/**
 * Redirects back to the settingpage
 */
function redirectToSettingpage()
{
    window.location.href = "Setting_Page_Info.php?settingType="+dataTypeToAdd;
}