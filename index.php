<?php


?>
<script type="text/javascript">

    function helloWorld() {
        var name = document.getElementById("name").value;
        alert("Hello " + name + " and HELLO WORLD!");
    }

</script>


<header>

    <body>

        <h1>hello world</h1>

        <form>

            <input type="text" name="name" id="name"><br>

            <input type="button" name="btn" onclick="helloWorld()" value="Hello world">

        </form>

    </body>


</header>
