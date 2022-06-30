<?php
    include "conn.php";

    function getLevel($connect, $username) {
        return mysqli_fetch_assoc(mysqli_query($connect, "SELECT level FROM users WHERE username='$username'"));
    }

    function updateLevel($connect, $username, $level) {
        mysqli_query($connect, "UPDATE users SET level=level + $level WHERE username='$username'");
    }
    
    if ($_POST['level'] == 0) {
        echo getLevel($connect, $_POST['username'])['level']; 
    } else {
        $level = getLevel($connect, $_POST['username'])['level'];
        if ($level == 1 and $_POST['level'] == -1){
            echo $level;
        } else {
            updateLevel($connect, $_POST['username'], $_POST['level']);
            echo $level + $_POST['level'];
        }
    }
?>