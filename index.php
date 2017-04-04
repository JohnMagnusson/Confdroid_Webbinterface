<?php


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
        <input type="button" name="btn" onclick="helloWorld()" value="Hello world">

    </form>

</div>

<script>

    function helloWorld()
    {
        var name = document.getElementById("name").value;
        alert("Hello " + name + " and HELLO WORLD!");
    }

</script>

</body>

</html>




