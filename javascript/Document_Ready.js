/**
 * Created by Elias on 2017-05-09.
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