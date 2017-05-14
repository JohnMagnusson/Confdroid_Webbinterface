/**
 * hello my name is jeff
 */
$(document).ready(function(){
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    $("li").removeClass("activeNav");
    $( '#li'+activeType).last().addClass( "activeNav" );
    window.onpopstate = function(event) {
        history.back();
    };
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

/**
 * Handles searching from result pages and adminInterface.
 */
function search()
{
    var searchType = $("#menu").find(".activeNav")[0].innerText;
    var searchValue = document.getElementById("searchValue").value;
    var url=window.location.href.split('/');
    var name=url[url.length-1];
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
 * @param type
 */
function createsContainerContent(parentId, data, url)
{
    $("#"+parentId).empty();
    for(var i = 0; i < data.length; i++)
    {
        var div = document.createElement("div");
        div.id = "dataDiv"+i;
        var p = document.createElement("p");
        p.id = i;
        p.innerHTML = data[i]["name"];
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
        div.appendChild(p);
        div.classList.add("templateText");
        document.getElementById(parentId).appendChild(div);
        trashCan.onclick = function (e)
        {
            deleteElement(e, data[e.target.id]["name"], data[e.target.id]["id"]);
        }
        settings.onclick = function (e) {
            getDataFromAPI(url.split("_")[0]+"/"+data[e.target.id]["id"],null,function (data, searchType) {     /*Gets data from the clicked element, then searches on the clicked element and uses a callback function to call on openSettingPage*/
                openSettingPage(data,searchType.split("/")[0], null,"Setting_Page_Info.php?settingType=SQL");
            });
        }
        p.onclick = function(e)
        {
            url+=data[e.target.id]["id"];
            changeLocation(url)
        };
    }
}
/**
 * Deletes clicked element (e).
 * @param e
 * @param data
 */
function deleteElement(e, name, id)
{
    if(confirm("Are you sure you want to delete " + name +"?"))
    {
        var apiType;
        if(document.getElementById("objectType") == null) {
            apiType = activeType;
            apiType += "/";
            apiType += id;
        }
        else if(id == urlData && document.getElementById("objectType") != null) {
            apiType = document.getElementById("objectType").innerHTML;
            apiType += "/";
            apiType += id;
            // apiType += "/";
            // apiType += e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerHTML.slice(0, -1);
            // apiType += "/";
            // apiType += data[e.target.id]["id"];
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
        apiChangeData(apiType, "DELETE", null);
    }
    else
    {
        console.log("Cancelled!");
    }
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
    if(url[url.length-1].split("&")[1] != null)
        url = url[url.length-1].split("=")[0]+"="+activeType+"&"+url[url.length-1].split("&")[1];
    else
        url = url[url.length-1].split("=")[0]+"="+activeType;
    history.pushState({}, null, url);
    if(name.indexOf("Admin_Interface.php") >= 0)
    {
        search();
    }
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
    if(dataTypeToAdd != null)
        dataToSend += "&dataTypeToAdd="+dataTypeToAdd;
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            // console.log(response);
        }
    });
    href = window.open(phpPageToOpen,'Setting','left='+(parseInt(window.innerWidth) * 0.1)+',top='+(parseInt(window.innerHeight) * 0.05)+',width='+(parseInt(window.innerWidth) * 0.8)+',height='+(parseInt(window.innerHeight) * 0.9)+',toolbar=0,'+
        'resizable=1, status = 0, menubar = 0, location=0');
}
/**
 * Logs out the administrator.
 * Removes cookies and relocates the user to login screen.
 * @param authToken
 * @param id
 */
function logOut()
{
    $.ajax({
        type: "DELETE",
        url: "https://confdroid.brainstorm-labs.net/api/admin/login.json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie"),
        success: function(data, textStatus, xhr){
            $.removeCookie("authCookie");
            $.removeCookie("adminIdCookie");
            $.removeCookie("userName");
            window.location.replace("Login.php?loggedOut=true");
        }
    });
}