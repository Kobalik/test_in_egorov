<?php
    function check_true_move($cell){
        if ($cell == '-') {
            return true;
        }
        return false;
    }

    function do_step($board){
        $move = rand(0,8);
        if (check_true_move($board[$move])) {
            $move;
            return $move;
        } else {
            return do_step(($board));
        }
    }
  

    $board = $_POST['board'];
    
    echo do_step($board);
?>