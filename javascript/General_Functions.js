/**
 * Functions for all _Result pages and Admin_Interface
 */
$(document).ready(function(){
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    $("li").removeClass("activeNav");
    $( '#li'+activeType).last().addClass( "activeNav" );            //Makes activeType the new activeNav option
    window.onpopstate = function() {                                //Goes back one page when back button is clicked
        history.back();
    };
    // Makes it so that when you press the enter key when in the searchfield, it doesnt reload page, instead it makes a search
    document.getElementById('searchValue').addEventListener('keydown', function(e) {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            search();
        }
    }, false);
    //Makes an search for all objects of the activeNav immediately when entering the page.
    if(name.indexOf("searchValue") >= 0)
    {
        search();
    }
    else if(name.indexOf("Admin_Interface.php") >= 0)
    {
        search();
    }
});

/**
 * Handles searching from result pages and adminInterface.
 */
function search()
{
    var searchType = $("#menu").find(".activeNav")[0].innerText;
    var searchValue = document.getElementById("searchValue").value;
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    //If a search has been made from another page than admin_interface the url will contain the searchvalue for admin_interface to get
    if(name.indexOf("Admin_Interface.php") < 0)
    {
        var url2 = "Admin_Interface.php?activeType="+$("#menu").find(".activeNav")[0].innerText+"&searchValue="+encodeURIComponent(searchValue)+"&searchType="+searchType;
        window.location.href = url2;
    }
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

/**
 * Creates a container for the data and puts in the parentIdContainer.
 * Makes the object clickable and adds setting, delete pictures.
 * @param parentId
 * @param data
 * @param url
 */
function createsContainerContent(parentId, data, url)
{
    $("#"+parentId).empty();
    if(data.length === 0 || data[0] === null)
    {
        var p = document.createElement("p");
        p.id = 0;
        p.style = "font-size:120%;margin-top:3%;margin-left:5%;";
        p.innerHTML = "Nothing Found";
        document.getElementById(parentId).appendChild(p);
    }
    else
    {
        for(var i = 0; i < data.length; i++)
        {
            var div = document.createElement("div");
            div.id = "dataDiv"+i;
            var p2 = document.createElement("p");
            p2.id = i;
            p2.innerHTML = $($.parseHTML(data[i]["name"])).text();
            var trashCan = document.createElement("img");
            trashCan.id = i;
            trashCan.src = "../images/trash-can-icon.png";
            trashCan.classList.add("img");
            var settings = document.createElement("img");
            settings.id = i;
            settings.src = "../images/settings-icon.png";
            settings.classList.add("img");
            div.appendChild(trashCan);
            div.appendChild(settings);
            div.appendChild(p2);
            div.classList.add("templateText");
            document.getElementById(parentId).appendChild(div);
            trashCan.onclick = function (e)
            {
                deleteElement(e, data[e.target.id]["name"], data[e.target.id]["id"]);
            };
            settings.onclick = function (e) {
                console.log(url);
                getDataFromAPI(url.split("_")[0]+"/"+data[e.target.id]["id"],null,function (data, searchType) {     /*Gets data from the clicked element, then searches on the clicked element and uses a callback function to call on openSettingPage*/
                    if(searchType.split("/")[0] === "Variable")
                        openSettingPage(data,searchType.split("/")[0], null,"Setting_Page_Info.php?settingType=SQL&hiddenMenu=true");
                    else
                        openSettingPage(data,searchType.split("/")[0], null,"Setting_Page_Info.php?settingType=SQL");
                });
            };
            p2.onclick = function(e)
            {
                url+=data[e.target.id]["id"];
                changeLocation(url)
            };
        }
    }
}
/**
 * Deletes clicked element (e).
 * @param e
 * @param name
 * @param id
 */
function deleteElement(e, name, id)
{
    console.log(e.target.id);
    var message = "Are you sure you want to delete " + name;
    if(document.getElementById("name") !== null && e.target.id !== "deleteBtnInfo")
        message += " from "+document.getElementById("name").innerText.split("Name: ")[1];
    message += "?";
    if(confirm(message))
    {
        var apiType;
        if(document.getElementById("objectType") === null) {
            apiType = activeType;
            apiType += "/";
            apiType += id;
        }
        else if(id === urlData && document.getElementById("objectType") !== null) {
            apiType = document.getElementById("objectType").innerHTML;
            apiType += "/";
            apiType += id;
        }
        else
        {
            apiType = document.getElementById("objectType").innerHTML;
            apiType += "/";
            apiType += urlData;
            apiType += "/";
            apiType += e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerHTML.slice(0, -1);
            apiType += "/";
            apiType += id;
        }
        apiChangeData(apiType, "DELETE", null, function (status) {
            var sendTo;
            if(e.target.id === "deleteBtnInfo")
                sendTo = "Admin_Interface.php?activeType="+activeType;
            else
                sendTo = null;
            printStatusGeneralFunctions(status, sendTo, name, e);
        });
    }
    else
    {
        console.log("Cancelled!");
    }
}

/**
 * Prints message depending on status call from API.
 */
function printStatusGeneralFunctions(status, sendTo, name, e)
{
    var message = "Successfully deleted "+name;
    if(document.getElementById("name") !== null && e.target.id !== "deleteBtnInfo")
        message += " from "+document.getElementById("name").innerText.split("Name: ")[1];
    switch(status)
    {
        case 200:
            alert(message);
            break;
        case 204:
            alert(message);
            break;
        default:
            alert("Error, try again");
            break;
    }
    if(window.opener === null) {
        if (sendTo === null)
            location.reload();
        else
            location.href = sendTo;
    }
    else
        window.opener.location.reload();                //Reloads the page that opened up the popup page
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
    var activeType = liId.slice(2, liId.length);
    changeLocation("Admin_Interface.php?activeType="+activeType);
}
/**
 * Open setting page.
 * @param data, The dataObject that the admin wants to change the setting on
 * @param dataType, What kind of type the dataObject is.
 * @param dataTypeToAdd
 * @param phpPageToOpen, The Php page to open.
 */
function openSettingPage(data, dataType, dataTypeToAdd, phpPageToOpen)
{
    data = JSON.stringify(data);
    var dataToSend = "dataObject="+data+"&dataType="+dataType;
    if(dataTypeToAdd !== null)
        dataToSend += "&dataTypeToAdd="+dataTypeToAdd;
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            // console.log(response);
        }
    });
    var href = window.open(phpPageToOpen,'Setting','left='+(parseInt(window.innerWidth) * 0.1)+
        ',top='+(parseInt(window.innerHeight) * 0.05)+',width='+(parseInt(window.innerWidth) * 0.8)+
        ',height='+(parseInt(window.innerHeight) * 0.9)+',toolbar=0,'+
        'resizable=no,status=0,menubar=0,location=0');
}
/**
 * Logs out the administrator.
 * Removes cookies and relocates the user to login screen.
 */
function logOut()
{
    $.ajax({
        type: "DELETE",
        url: standardUrl+"admin/login.json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie"),
        success: function(data, textStatus, xhr){
            $.removeCookie("authCookie");
            $.removeCookie("adminIdCookie");
            $.removeCookie("userName");
            window.location.replace("../index.php?loggedOut=true");
        }
    });
}
/**
 * Changes the window location based on the param url.
 * @param url
 */
function changeLocation(url)
{
    window.location.href = url;
}