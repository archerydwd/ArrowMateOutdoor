/**
 * Author: Darren Daly.
 * Version: 3.0.
 * Date: 13/07/2016.
 */
var UI = require('ui');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var cs, roundTotal, runningTotal, count, roundCount, set, set1, set2, end;
var scores = [145];
var rounds = [0,0,0,0];
var d = new Date();
var key = d.toUTCString();

var main = new UI.Card({
  title: 'Arrow Mate',
	fullscreen: true,
	subtitle: scores[cs] + ' - _ - _ \r\n _ - _ - _',
  body: ' Last Round: ' + roundTotal + '\r\n Total: ' + runningTotal + '\r\n Round end : ' + roundCount
});

reset();
main.show();

function reset() {
  end = false;
  cs = 1;
  roundTotal = 0;
  runningTotal = 0;
  count = 1;
  roundCount = 1;
  set = false;
  set1 = false;
  set2 = false;
  for (var i = 1; i < 145; i++) {
    scores[i] = 10;
  }
  setBody();
  main.title('Arrow Mate');
  main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
}

function setDelay() {
  var delay=3000;
  setTimeout(function() {
    main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
  },delay); 
}

function setBody() {
  main.body(' Last Round: ' + roundTotal + '\r\n Total: ' + runningTotal + '\r\n Round end : ' + roundCount);
}

// SELECT SCORE
main.on('click', 'select', function(e) {
	if (end) {
    reset();
  }
	if (count === 6) {
      roundTotal = scores[cs] + scores[cs-1] + scores[cs-2] + scores[cs-3] + scores[cs-4] + scores[cs-5];
      runningTotal += scores[cs];
      cs++;
      main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
      count = 1;
      roundCount++;
    }
    else {
      runningTotal += scores[cs];
      cs++;
			scores[cs] = scores[cs-1];
      if(count === 1) {
        main.subtitle(scores[cs-1] + ' - ' + scores[cs] + ' - _ \r\n _ - _ - _');
      }
      else if (count === 2) {
        main.subtitle(scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs] + ' \r\n _ - _ - _');
      }
      else if (count === 3) {
        main.subtitle(scores[cs-3] + ' - ' + scores[cs-2] + ' - ' + scores[cs-1] + ' \r\n ' + scores[cs] + ' - _ - _');
      }
      else if (count === 4) {
        main.subtitle(scores[cs-4] + ' - ' + scores[cs-3] + ' - ' + scores[cs-2] + ' \r\n ' + scores[cs-1] + ' - ' + scores[cs] + ' - _');
      }
      else if (count === 5) {
        main.subtitle(scores[cs-5] + ' - ' + scores[cs-4] + ' - ' + scores[cs-3] + ' \r\n ' + scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs]);
      }
      count++;
    }
    setBody();
	
  if (cs === 145) {
    rounds[3] = runningTotal - (rounds[0] + rounds[1] + rounds[2]);
    Settings.data(key, { 'a' : rounds[0], 'b' : rounds[1], 'c' : rounds[2], 'd' : rounds[3] });
    main.subtitle("Total score: " + runningTotal);
    main.body('1st 36: ' + rounds[0] + '\r\n 2nd 36: ' + rounds[1] + '\r\n 3rd 36: ' + rounds[2]  + '\r\n 4th 36: ' + rounds[3], true);
    Vibe.vibrate('long');
    end = true;
  }
  if (roundCount === 7 && !set) {
    rounds[0] = runningTotal;
    Settings.data(key, { 'a' : rounds[0], 'b' : rounds[1], 'c' : rounds[2], 'd' : rounds[3] });
		main.subtitle("1st 36: " + rounds[0]);
		Vibe.vibrate('long');
    set = true;
    setDelay();
  }
  else if (roundCount === 13 && !set1) {
    rounds[1] = runningTotal - rounds[0];
    Settings.data(key, { 'a' : rounds[0], 'b' : rounds[1], 'c' : rounds[2], 'd' : rounds[3] });
		main.subtitle("2nd 36: " + rounds[1]);
    Vibe.vibrate('long');
    set1 = true;
    setDelay();
  }
  else if (roundCount === 19 && !set2) {
    rounds[2] = runningTotal - (rounds[0] + rounds[1]);
    Settings.data(key, { 'a' : rounds[0], 'b' : rounds[1], 'c' : rounds[2], 'd' : rounds[3] });
    main.subtitle("3rd 36: " + rounds[2]);
    Vibe.vibrate('long');
    set2 = true;
    setDelay();
  }
});

// BRING UP SCORE
main.on('click', 'up', function(e) {
	if (scores[cs] < 10) {
    scores[cs] += 1;
    if (count === 1) {
      main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
    }
    else if (count === 2) {
      main.subtitle(scores[cs-1] + ' - ' + scores[cs] + ' - _ \r\n _ - _ - _');
    }
    else if (count === 3) {
      main.subtitle(scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs] + ' \r\n _ - _ - _');
    }
    else if (count === 4) {
      main.subtitle(scores[cs-3] + ' - ' + scores[cs-2] + ' - ' + scores[cs-1] + ' \r\n ' + scores[cs] + ' - _ - _');
    }
    else if (count === 5) {
      main.subtitle(scores[cs-4] + ' - ' + scores[cs-3] + ' - ' + scores[cs-2] + ' \r\n ' + scores[cs-1] + ' - ' + scores[cs] + ' - _');
    }
    else if (count === 6) {
      main.subtitle(scores[cs-5] + ' - ' + scores[cs-4] + ' - ' + scores[cs-3] + ' \r\n ' + scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs]);
    }
	}
});

// BRING DOWN SCORE
main.on('click', 'down', function(e) {
	if (scores[cs] > 0) {
		scores[cs] -= 1;
    if (count === 1) {
      main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
    }
    else if (count === 2) {
      main.subtitle(scores[cs-1] + ' - ' + scores[cs] + ' - _ \r\n _ - _ - _');
    }
    else if (count === 3) {
      main.subtitle(scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs] + ' \r\n _ - _ - _');
    }
    else if (count === 4) {
      main.subtitle(scores[cs-3] + ' - ' + scores[cs-2] + ' - ' + scores[cs-1] + ' \r\n ' + scores[cs] + ' - _ - _');
    }
    else if (count === 5) {
      main.subtitle(scores[cs-4] + ' - ' + scores[cs-3] + ' - ' + scores[cs-2] + ' \r\n ' + scores[cs-1] + ' - ' + scores[cs] + ' - _');
    }
    else if (count === 6) {
      main.subtitle(scores[cs-5] + ' - ' + scores[cs-4] + ' - ' + scores[cs-3] + ' \r\n ' + scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs]);
    }
	}
});

// DELETE FUNCTIONALITY
main.on('longClick', function(e) {
  if (end) {
    reset();
  }
	if (count === 1 && roundCount != 1) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs-5] + ' - ' + scores[cs-4] + ' - ' + scores[cs-3] + ' \r\n ' + scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs]);
		roundCount--;
		setBody();
		count = 6;
		main.vibe();
	}
	else if (count === 2) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs] + ' - _ - _ \r\n _ - _ - _');
		setBody();
		count--;
		main.vibe();
	}
	else if (count === 3) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs-1] + ' - ' + scores[cs] + ' - _ \r\n _ - _ - _');
		setBody();
		count--;
		main.vibe();
	}
	else if (count === 4) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs-2] + ' - ' + scores[cs-1] + ' - ' + scores[cs] + ' \r\n _ - _ - _');
		setBody();
		count--;
		main.vibe();
	}
	else if (count === 5) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs-3] + ' - ' + scores[cs-2] + ' - ' + scores[cs-1] + ' \r\n ' + scores[cs] + ' - _ - _');
		setBody();
		count--;
		main.vibe();
	}
	else if (count === 6) {
		scores[cs] = 10;
		cs--;
		runningTotal = runningTotal - scores[cs];
		main.subtitle(scores[cs-4] + ' - ' + scores[cs-3] + ' - ' + scores[cs-2] + ' \r\n ' + scores[cs-1] + ' - ' + scores[cs] + ' - _');
		setBody();
		count--;
		main.vibe();
	}
});

// DISPLAY SCORES
main.on('longClick', 'up', function(e) {
		var scorestext = "";
		var data = Settings.data();
		var scoreList = new UI.Card({
			scrollable: true,
			title : "Scores"
		});
		for(var key in data){
			scorestext += key + "\r\n" + (data[key].a+data[key].b+data[key].c+data[key].d) + "[" + data[key].a + "," + data[key].b + "," + data[key].c + "," + data[key].d + "]\r\n";
		}
	
		scoreList.body(scorestext);
		scoreList.show();
});
