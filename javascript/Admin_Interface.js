/**
 * Created by johnv on 2017-04-11.
 */
/**
 * Sends id and authToken to api so it can check in the database that the current token is alive and not used.
 * @param authToken
 * @param id
 */
function authorizeCheck(authToken, id)
{
    $.ajax({
        type: "POST",
        url: "http://confdroid.localhost/api/admin/authorize.json",
        data: "authToken="+authToken+"&id="+id,
        success: function(json){
            console.log(json);
            var userAuthorized = JSON.parse(json);

            console.log(userAuthorized);

            // if(!userAuthorized["auth"])
                // window.location.replace("http://web.localhost/Login.php?timedout=true");
            // else
            //     updateLinks(authToken,id);      //Updates the link with the current authToken and id in the url
        }
    });
}

/**
 * Updates the link so the authToken and id is in the url and the admin wont get kicked out from the page
 * when moving to search,add, delete.
 * @param authToken
 * @param id
 */
function updateLinks(authToken, id)
{
    document.getElementById('searchLink').setAttribute('href', 'http://web.localhost/Interface_search.php?authToken='+authToken+'&id='+id);
    document.getElementById('addLink').setAttribute('href', 'http://web.localhost/Interface_Add.php?authToken='+authToken+'&id='+id);
    document.getElementById('deleteLink').setAttribute('href', 'http://web.localhost/Interface_Delete.php?authToken='+authToken+'&id='+id);
    document.getElementById('adminLink').setAttribute('href', 'http://web.localhost/Admin_Interface.php?authToken='+authToken+'&id='+id);
}
