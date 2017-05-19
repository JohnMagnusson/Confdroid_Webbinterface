<?php
/**
 * SQL Form php that will be included in Add_Page.php
 */
echo   '<div id="dataContainer">
        <p>Setting name:</p>
        <input type="text" id="settingName">
        <p>Database Location:</p>
        <textarea id="dbLocationTxt"></textarea>
        <p>Query:</p>
        <textarea id="queryTxt"></textarea><br>
        <button onclick="handleForm()">Create setting</button>
        </div>';