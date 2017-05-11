/**
 * Created by Elias on 2017-05-09.
 */
$(document).ready(function(){
    console.log(dataTypeToAdd);
    document.getElementById(currentPage).classList.add("activeLi");
    if(document.getElementById('searchValue') != null) {
        document.getElementById('searchValue').addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                addSearch();
            }
        }, false);
    }
});

function addSearch()
{
    $("#information").empty();
    getDataFromAPI(dataTypeToAdd, document.getElementById("searchValue").value, function (data) {
        showData("searchResult", data);
    });
}

function add()
{
    var uniqueValue;
    switch(dataTypeToAdd)
    {
        case "Group":
            uniqueValue = "id";
            break;
        case "Device":
            uniqueValue = "imei";
            break;
    }
    if(document.getElementById(uniqueValue) == null)
        alert("Select!");
    else {
        var type = dataType;
        type += "/";
        type += dataObject["authToken"];
        type += "/";
        type += dataTypeToAdd;
        type += "/";
        type += document.getElementById(uniqueValue).innerText.split(" ")[1];
        console.log(type);
        deletePostAndPutData(type, "POST");
    }
}

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

function printInfoOfObject(data, e)
{
    if(document.getElementsByClassName("selected")[0] != null) {
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
    }
}

function printGroupInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "prio";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    $("#prio").html('<b>Prio:</b> ' + data[e.target.id]["prio"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
}

function printDeviceInformation(data, e)
{
    var p = document.createElement("p");
    p.id = "nrOfApplications";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "createdDate";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "id";
    document.getElementById("information").appendChild(p);
    var p = document.createElement("p");
    p.id = "imei";
    document.getElementById("information").appendChild(p);
    $("#nrOfApplications").html('<b>Nr applications:</b> ' + data[e.target.id]["applications"].length);
    $("#createdDate").html('<b>Date created:</b> ' + data[e.target.id]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + data[e.target.id]["id"]);
    $("#imei").html('<b>Imei:</b> ' + data[e.target.id]["imei"]);
}