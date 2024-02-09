document.addEventListener('DOMContentLoaded', function () {

	const all_table = document.querySelector("table");
	const all_td = document.getElementsByTagName("td");
	const X = document.getElementById("X");
	const O = document.getElementById("O");
	const one_player = document.getElementById("one_player");
	const two_players = document.getElementById("two_players");
	const resetGry = document.getElementById("resetGry");
	const wyborTrybu = document.getElementById("wyborTrybu");
	const twojWybor = document.getElementById("twojWybor");
	let helper = "O";
	let player = "";
	let czyWygrana = "";

	one_player.addEventListener("click", function () {
		player = "computer_play";
		wyborTrybu.innerText = "Grasz z komputerem";
	})

	two_players.addEventListener("click", function () {
		player = "human_play";
		wyborTrybu.innerText = "Grasz z inną osobą";
	})

	X.addEventListener("click", function () {
		let warunek = true;
		helper = "X";
		if (player == "human_play") {
			twojWybor.innerText = "Wybrałeś 'X' \n \n Przeciwnik gra 'O'";
		} else {
			twojWybor.innerText = "Wybrałeś 'X'";

			for (i = 0; i < all_td.length; i++) {
				if (all_td[i].innerText != "") {
					warunek = false;
				}
			}
			if (warunek && player === "computer_play") {
				all_td[Math.floor((Math.random() * all_td.length) + 1) - 1].innerText = "O";
			}//W tej sytuacji komputer wykonuje losowo pierwszy ruch 'O', ponieważ użytkownik wybrał 'X' 
		}
		O.style.display = "none";
	})

	O.addEventListener("click", function () {
		helper = "O";
		if (player == "human_play") {
			twojWybor.innerText = "Wybrałeś 'O' \n \n Przeciwnik gra 'X'";
		} else {
			twojWybor.innerText = "Wybrałeś 'O'";
		}
		X.style.display = "none";
	})

	resetGry.addEventListener("click", function () {
		for (i = 0; i < all_td.length; i = i + 1) {
			all_td[i].innerText = "";
			document.querySelector("#statement").innerText = "Wynik gry:";
			X.style.display = "inline-block";
			O.style.display = "inline-block";
			czyWygrana = "";
		}
	})

	all_table.addEventListener("click", function (e) {

		let pole = e.target.closest("td").innerText

		if (czyWygrana == true) {
			return;
		}

		if (helper === "X" && pole == "") {
			Math.floor((Math.random() * 9) + 1);
			e.target.closest("td").innerText = "X";
			wynik("X");
			wynik("O");
			if (player == "") {
				helper = "O";
			}
			if (player == "human_play") {
				helper = "O";
			}
			if (player == "computer_play") {
				computer_move();
			}
			wynik("X");
			wynik("O");
			return;
		}

		if (helper === "O" && pole == "") {
			e.target.closest("td").innerText = "O";
			wynik("O");
			wynik("X");
			if (player == "") {
				helper = "X";
			}
			if (player == "human_play") {
				helper = "X";
			}
			if (player == "computer_play") {
				computer_move();
			}
			wynik("O");
			wynik("X");
			return;
		}
	})

	function computer_move() {
		if (czyWygrana == true) {
			return;
		}
		if (document.querySelector("#statement").innerText.includes("Remis!")) {
			return;
		}
		let new_td = "";
		let new_td_tab = [];
		for (i = 0; i < all_td.length; i++) {
			if (all_td[i].innerText == "") {
				new_td = all_td[i];
				new_td_tab.push(new_td);
			}
		}
		let losoweMiejsce = Math.floor((Math.random() * new_td_tab.length) + 1);

		if (helper === "X") {
			new_td_tab[losoweMiejsce - 1].innerText = "O";
		}
		if (helper === "O") {
			new_td_tab[losoweMiejsce - 1].innerText = "X";
		}
	}



	function wygrana(C) {
		document.querySelector("#statement").innerText = "Wynik gry: \nWygrana gracza: '" + C + "'";
		czyWygrana = true;
	}

	function remis() {
		document.querySelector("#statement").innerText = "Wynik gry: \nRemis!";
	}

	function wynik(C) {

		let all_td_tab = [];

		// sprawdzanie wyniku w poziomie (skacze co 3 komorki, bo musi byc sprawdzony 3 razy)
		for (i = 0; i < all_td.length; i = i + 3) {
			if (all_td[i].innerText == C && all_td[i + 1].innerText == C && all_td[i + 2].innerText == C) {
				wygrana(C);
			}
		}
		// sprawdzanie wyniku w pionie (musi byc sprawdzony 3 razy )
		for (i = 0; i < 3; i = i + 1) {
			if (all_td[i].innerText == C && all_td[i + 3].innerText == C && all_td[i + 6].innerText == C) {
				wygrana(C);
			}
		}
		// sprawdzanie skosow
		if (all_td[0].innerText == C && all_td[4].innerText == C && all_td[8].innerText == C) {
			wygrana(C);
		}
		if (all_td[2].innerText == C && all_td[4].innerText == C && all_td[6].innerText == C) {
			wygrana(C);
		}
		// remis
		for (i = 0; i < all_td.length; i = i + 1) {
			if (all_td[i].innerText != "") {
				all_td_tab.push(all_td[i]);
			}
		}

		if (all_td_tab.length == 9 && czyWygrana != true) {
			remis();
		}
	}
});
