/**Javascript for the Setting Page **/
function changeObjectData()
{
    switch(dataType)                   //Switch depending on the site that is loaded.
    {
        case "Device":
            updateDataInfo(dataObject);
            break;
    }
}
/**
 * Updates the device with new values.
 * @param device
 */
function updateDataInfo(device)
{
    alert("Updating Device info");
    var name=$("#name").val();
    var imei=$("#imei").val();
    device[name] = name;
    device["imei"] = imei;
    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/device/"+imei+".json",
        data: device,
        success: function(result){
            console.log(result);
        }
    });
}