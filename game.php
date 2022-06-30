<?php 
    include 'conn.php';
    function draw_board() 
    {
        foreach (range(0,8) as $number)
        {
            echo "<div id='$number' class='cell'>-</div>";               
        }   
    }

    function create_user($username, $conn)
    {
        $init_level = 1;
        $sql = "INSERT INTO users (username, level) VALUES ('$username','$init_level')";

        $query = mysqli_query($conn, $sql);
    }

    function check_user_exist($username, $conn)
    {
        $sql = "SELECT username FROM users WHERE username='$username'";
        $query = mysqli_query($conn, $sql);
        if(!$query){
            return false;
            exit;
        } else {
            $rows = mysqli_fetch_array($query);
            foreach ($rows as $row) {
                if ($row == $username){
                    return true;
                }
            }
            return false;
        }
    }

    $username = $_POST['username'];

    if (check_user_exist($username, $connect) == false){
        create_user($username, $connect);
    }

    
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="css/style.css">
    <title>Крестики нолики</title>
</head>

<body>
    <h1>Привет, <b id="username"><?php echo "$username";?></b>, твой уровень <b id="level"></b></h1>
    <section>
        <h1 class="game--title">Крестики нолики</h1>
        <div class="game--container">
            <?php 
                draw_board()       
            ?>
        </div>
        <button id='restart'>Новая игра</button>
        <h2 id='result'></h2>
    </section>

    <script src="js/jquery.js"></script>
    <script src="js/index.js"></script>
</html>