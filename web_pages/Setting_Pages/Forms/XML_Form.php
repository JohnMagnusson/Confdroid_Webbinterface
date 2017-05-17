<?php
/**
 * XML Form php that will be included in Add_New.php
 */
echo '<div id="dataContainer">
      <p>Setting name:</p>
      <input type="text" id="settingName">
      <p>FileLocation:</p>
      <textarea id="fileLocationTxt"></textarea>
      <p>Regexp:</p>
      <textarea id="regexpTxt"></textarea>
      <p>ReplaceWith:</p>
      <textarea id="replaceWithTxt"></textarea><br>
      <input type="button" value="Create setting" onclick="handleForm()">
      </div>';