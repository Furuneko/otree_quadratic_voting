var leftPoint = 100;

UpdateCost();

function btnSub(num) {
    var agreeInput = $('.qv-agree-input').eq(num);
    if (checkPoint(num) || agreeInput.val() == 'True') {
        var voteCount = document.getElementsByClassName('nvote')[num].value;

        if (voteCount == 0) {
            agreeInput.val('False');
        }
        var agree = agreeInput.val();

        if (agree == 'False') {
            ++voteCount;
            $('.nvote').eq(num).css('background', 'orangered');
            $('.vote-inner-circle').eq(num).css('background', 'orangered');
            $('.qv-disagree').eq(num).css('visibility', 'visible');
        } else {
            --voteCount;
        }

        var diam = 51 + 5.45 * (voteCount - 1);
        var topLeft = (100 - diam) / 2;
        diam += '%';
        topLeft += '%';
        $('.vote-inner-circle').eq(num).css({
            'width': diam,
            'height': diam,
            'top': topLeft,
            'left': topLeft
        });

        if (voteCount === 0) {
            $('.nvote').eq(num).css('background', '#e8e8e8');
            $('.qv-agree').eq(num).css('visibility', 'hidden');
            $('.qv-disagree').eq(num).css('visibility', 'hidden');
        }


        document.getElementsByClassName('nvote')[num].value = voteCount;
        UpdateCost();
    } else {
        var bar = $('#qv-credits-left-bar');
        bar.css({'width': '100%', 'background': 'orangered'});
        $('#qv-no-credits').modal('show');
    }
}

function btnAdd(num) {
    var agreeInput = $('.qv-agree-input').eq(num);
    if (checkPoint(num) || agreeInput.val() == 'False') {
        var voteCount = document.getElementsByClassName('nvote')[num].value;

        if (voteCount == 0) {
            agreeInput.val('True');
        }
        var agree = agreeInput.val();

        if (agree == 'True') {
            ++voteCount;
            $('.nvote').eq(num).css('background', '#53bb33');
            $('.vote-inner-circle').eq(num).css('background', '#53bb33');
            $('.qv-agree').eq(num).css('visibility', 'visible');
        } else {
            --voteCount
        }

        var diam = 51 + 5.45 * (voteCount - 1);
        var topLeft = (100 - diam) / 2 ;
        diam += '%';
        topLeft += '%';
        $('.vote-inner-circle').eq(num).css({
            'width': diam,
            'height': diam,
            'top': topLeft,
            'left': topLeft});

        if (voteCount === 0) {
            $('.nvote').eq(num).css('background', '#e8e8e8');
            $('.qv-agree').eq(num).css('visibility', 'hidden');
            $('.qv-disagree').eq(num).css('visibility', 'hidden');
        }

        document.getElementsByClassName('nvote')[num].value = voteCount;
        UpdateCost();
    }
    else {
        var bar = $('#qv-credits-left-bar');
        bar.css({'width': '100%', 'background': 'orangered'});
        $('#qv-no-credits').modal('show');
    }
}

function checkPoint(num) {
    var CostedPoint = 0;
    var Votes = document.getElementsByClassName('nvote');
    for (var index = 0; index < Votes.length; index++) {
        if (index == num) {
            CostedPoint += (parseInt(Votes[index].value)+1) * (parseInt(Votes[index].value)+1);
            continue;
        }

        CostedPoint += parseInt(Votes[index].value) * parseInt(Votes[index].value);
    }
    if (leftPoint - CostedPoint < 0) return false;
    else return true;
}

function UpdateCost() {
    var totalCost = 0;
    var CostLabels = document.getElementsByClassName('ncost');
    for (var index = 0; index < CostLabels.length; index++) {
        var voteCount = document.getElementsByClassName('nvote')[index].value;
        document.getElementsByClassName('ncost')[index].innerHTML = voteCount * voteCount;
        totalCost += voteCount * voteCount;
    }
    document.getElementById('qv-credits-left').innerHTML = leftPoint - totalCost;
    setBarWidth(leftPoint - totalCost);
}

function setBarWidth(w) {
    var bar = $('#qv-credits-left-bar');
    if (w >= 0) {
        bar.css({'width': w + '%', 'background': '#f7cf2f'})
    }
}