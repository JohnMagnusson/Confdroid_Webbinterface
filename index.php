<?php
if(isset($_GET["name"]))
{
    $hej = $_GET["name"];
    echo $hej;
}



?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
    <link rel="stylesheet" type="text/css" href="css/index.css">        <!-- Adds css file -->
</head>


<body>

<div id="container">

    <h1>hello world</h1>

    <form>

        <input type="text" name="text" id="name"><br>
        <input type="button" name="btn" onclick="helloWorld()" value="Hello world"><br><br>

    </form>

    <!-- Test with php -->
    <form action="<?php $_PHP_SELF ?>" method="get">

        <input type="text" name="name" id="nameSearch"><br>
        <input type="button" onclick="checkFields()" value="Skicka"><br>

    </form>

</div>

<script src="javascript/Server_Communication.js">


</script>

</body>

</html>




