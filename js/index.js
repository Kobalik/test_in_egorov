function isVictory(board) {
    var combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

    for (var comb of combs) {
		if (board[comb[0]] == board[comb[1]] && board[comb[1]] == board[comb[2]] && board[comb[0]] != '-') {
			return board[comb[0]] == 'X' ? 'X' : 'O';
        }
    }

    blank_cells = 0;
    for(var i=0; i<9; i++) {
        if('-' == board[i]) {
            blank_cells += 1;
        }
    }

    if (blank_cells == 0){
        return 'ничья';
    }

    return false;
}

function changeAndDisplayLevel(level) {
    $.ajax(
        {
            type : "POST",
            url : "level.php",
            data : {
                level: level,
                username: getUsername(),
            },
            success : function(data) 
            {
                document.getElementById('level').innerHTML = data;
            },
        }
    )
}

function whoWin(winner){
    if (winner == "O"){
        changeAndDisplayLevel(-1);
        return "Искусственный интеллект победил, человечество в опасноти!";
    } else if (winner == "X") {
        changeAndDisplayLevel(1);
        return "Вы победили! УРА!!";
    } else if (winner == 'ничья') {
        return "Ничья!";
    } else {
        return "Что-то пошло не так...";
    }

}

function update_board(board) 
{
    for(var i = 0; i < 9; i++) {
        board[i] = document.getElementById(`${i}`).textContent;
    }
    return board;
}

var board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
function getUsername(){
    return document.getElementById('username').textContent;
}


$(document).ready(function()
{
    changeAndDisplayLevel(0);


    // restart function
    $("#restart").click(function(){
        for(var i = 0; i < 9; i++) {
            document.getElementById(`${i}`).textContent = '-';
        }
        board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
        document.getElementById('result').textContent = '';
    })


    // game proccess
    $(".cell").click(function(){
            board = update_board(board)
            if (isVictory(board) != false) {
                $('#result').html(whoWin(isVictory(board)));
                return;
            }
            if (this.textContent == '-'){
                this.textContent = 'X';
                board = update_board(board)
                if (isVictory(board) == false) {
                    $.ajax(
                        {
                            type : "POST",
                            url : "bot.php",
                            data : {board: board,},
                            success : function(data) 
                            {
                                document.getElementById(data).innerHTML = 'O';
                            },
                        }
                    )
                } 
                if (isVictory(board) != false) {
                    $('#result').html(whoWin(isVictory(board)));
                    return;
                }
            } 
    })
})

