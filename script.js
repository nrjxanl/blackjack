// 카드 문양별 A, 2~10, J, K, Q 카드 생성(총 52개) - deck
numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q"]//임시로 카드 
deck = []
d_deck = []
p_deck = []
total = [0,0,0,0] //플레이어 토탈, 딜러 토탈, 플레이어 A 수, 딜러 A 수
A_case = {1:[1,11],2:[2,12],3:[3,13],4:[4,14]}
blackjack = [0,0]
for (i = 0; i < 13; i++) {
    deck.push("h" + numbers[i])
    deck.push("c" + numbers[i])
    deck.push("s" + numbers[i])
    deck.push("d" + numbers[i])
}

shuffle(deck)
// array 내 함수 무작위로 섞는 함수 - function shuffle()
function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

// 베팅 금액 초기값을 1원으로 지정 - inputValue
window.onload = function() {
    inputValue = 1
    $("#input").text(inputValue + "개")
    $("#down").css("opacity", ".8")
}

// up 버튼 누르면 베팅 금액 1원씩 올리고 inputValue에 그 값 저장하기
function up() {
    inputValue += 1
    $("#input").text(inputValue + "개")

    // 베팅 금액이 1원보다 클 때 down 버튼 활성화(css에서 기본적으로 클릭하지 못하도록 설정해 둠)
    if (inputValue > 1) {
        $("#down").css({"pointer-events": "all", "opacity": "1"})
    }

    // 베팅 금액이 5원일 때 up 버튼 비활성화
    if (inputValue >= 5) {
        $("#up").css({"pointer-events": "none", "opacity": ".8"})
    }
}

// down 버튼 누르면 베팅 금액 1원씩 내리고 inputValue에 그 값 저장하기
function down() {
    inputValue -= 1
    $("#input").text(inputValue + "개")
    
    // 베팅 금액이 1원일 때 down 버튼 비활성화
    if (inputValue == 1) {
        $("#down").css({"pointer-events": "none", "opacity": ".8"})
    }

    // 베팅 금액이 5원보다 작을 때 up 버튼 활성화
    if (inputValue < 5) {
        $("#up").css({"pointer-events": "all", "opacity": "1"})
    }
}

softhit = false
function sum_total(a,types) {
    total[types] = 0
    tem = ''
    for(i=0;i<a.length;i++) {
        tem = a[i].substring(1)
        if(Number.isInteger(parseInt(tem))){
            total[types] += parseInt(tem)
        } else if(tem != "A") {
            total[types] += 10
        } else {
            continue
        }
    }
    if (total[types+2]==1 && total[types] ==10 && a.length==2){
        blackjack[types] = 1
    }
    if (types == 1) {
        if (total[3] == 1 && total[1]==6 && a.length==2) {
            softhit = true
        } else {
            softhit = false
        }
        if (total[3] != 0) {
            let temp = []
            for(i = 0;i<A_case[total[3]].length;i++) {
                temp.push(total[1] + A_case[total[3]][i] <= 21? (total[1] + A_case[total[3]][i]) : 0)
            }
            total[1] = Math.max.apply(null, temp) == 0 ?
            total[1] + total[3] : Math.max.apply(null, temp)
        }
    }
}
// 시작 버튼 누를 시
function start() {
    //hit|stand 버튼 블락처리
    document.getElementById("hit").disabled = true
    document.getElementById("stand").disabled = true

    // 화면 좌측 상단에 베팅 금액 띄우기
    $("#betPrice").text("베팅 코인: " + inputValue + "개")
    $("#bet").css("display", "none")
    $("#betPrice").css("display", "block")
    $("#playerPoint").css("display", "block")
    $("#hit").css("display", "block")
    $("#stand").css("display", "block")
    $("#buttons").css("display", "block")
    $("#deck").css("display", "block")

    // 플레이어에게 deck의 카드 지급

    // 플레이어 1
    $("#player").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
    p_deck.push(deck[0])
    if (deck[0].endsWith("A")) {
        total[2] += 1
    }
    deck.shift()
    topOffset = $("#player > div:nth-of-type(1) > img:nth-of-type(1)").position().top
    leftOffset = $("#player > div:nth-of-type(1) > img:nth-of-type(1)").position().left
    margin = $("#player > div:nth-of-type(1)").css("margin-left").replace("px", "")
    $("#player > div:nth-of-type(1) > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
    setTimeout(function() {
                $("#player > div:nth-of-type(1) > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                $("#player > div:nth-of-type(1) > img:nth-of-type(2)").animate({opacity: 0}, 300, function() {
                $("#player > div:nth-of-type(1)").animate({marginLeft: (margin - 50)}, 300)
            })
        })
    }, 500)

    // 딜러 1
    $("#dealer").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
    d_deck.push(deck[0])
    if (deck[0].endsWith("A")) {
        total[3] += 1
    }
    deck.shift()
    topOffset = $("#dealer > div:nth-of-type(1) > img:nth-of-type(1)").position().top
    leftOffset = $("#dealer > div:nth-of-type(1) > img:nth-of-type(1)").position().left
    margin = $("#dealer > div:nth-of-type(1)").css("margin-left").replace("px", "")
    $("#dealer > div:nth-of-type(1) > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
    setTimeout(function() {
                $("#dealer > div:nth-of-type(1) > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                $("#dealer > div:nth-of-type(1) > img:nth-of-type(2)").animate({opacity: 0}, 300, function() {
                $("#dealer > div:nth-of-type(1)").animate({marginLeft: (margin - 50)}, 300)
            })
        })
    }, 500)
    
    setTimeout(function() {

        // 플레이어 2
        $("#player").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
        p_deck.push(deck[0])
        if (deck[0].endsWith("A")) {
            total[2] += 1
        }
        deck.shift()
        topOffset = $("#player > div:nth-of-type(2) > img:nth-of-type(1)").position().top
        leftOffset = $("#player > div:nth-of-type(2) > img:nth-of-type(1)").position().left
        $("#player > div:nth-of-type(2) > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
        setTimeout(function() {
            $("#player > div:nth-of-type(2) > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                $("#player > div:nth-of-type(2) > img:nth-of-type(2)").animate({opacity: 0}, 300)
            })
        }, 500)
        sum_total(p_deck,0)

        // 딜러 2
        $("#dealer").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
        d_deck.push(deck[0])
        if (deck[0].endsWith("A")) {
            total[3] += 1
        }
        deck.shift()
        topOffset = $("#dealer > div:nth-of-type(2) > img:nth-of-type(1)").position().top
        leftOffset = $("#dealer > div:nth-of-type(2) > img:nth-of-type(1)").position().left
        margin = $("#dealer > div:nth-of-type(2)").css("margin-left").replace("px", "")
        $("#dealer > div:nth-of-type(2) > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
        sum_total(d_deck,1)

        setTimeout(function() {
                $("#dealer > div:nth-of-type(2) > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                // 플레이어 점수 표시
                $("#playerPoint > p").empty()
                $("#playerPoint > p").append(total[0] + "점 + A " + total[2] + "개")
                if(blackjack[0]==1) {
                    $("#playerPoint > p").empty()
                    $("#playerPoint > p").append("blackjack")
                    $("#dealer > div:nth-of-type(" + (y-1) + ") > img:nth-of-type(2)").animate({opacity: 0}, 300)
                    setTimeout(function() {dealer_action()}, 800)
                    return
                }
                // Hit, Stand 버튼 활성화
                document.getElementById("hit").disabled = false
                document.getElementById("stand").disabled = false
            })
        }, 500)
    }, 1500)
    
}

x = 3
y = 3

// hit 버튼 누를 시
function hit() {
    //버튼 비활성화
    document.getElementById("hit").disabled = true
    document.getElementById("stand").disabled = true

    // 플레이어에게 deck의 카드 지급
    margin = $("#player > div:nth-of-type(1)").css("margin-left").replace("px", "")
    $("#player > div:nth-of-type(1)").animate({marginLeft: (margin - 50)}, 300)
    setTimeout(function() {
        $("#player").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
        p_deck.push(deck[0])
        if (deck[0].endsWith("A")) {
            total[2] += 1
        }
        deck.shift()
        sum_total(p_deck,0)
        topOffset = $("#player > div:nth-of-type(" + x + ") > img:nth-of-type(1)").position().top
        leftOffset = $("#player > div:nth-of-type(" + x + ") > img:nth-of-type(1)").position().left
        $("#player > div:nth-of-type(" + x + ") > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
        //21 넘을 시 게임 종료
        
        setTimeout(function() {
            $("#player > div:nth-of-type(" + x + ") > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                $("#player > div:nth-of-type(" + x + ") > img:nth-of-type(2)").animate({opacity: 0}, 300)
                x += 1

                // 플레이어 점수 표시
                $("#playerPoint > p").empty()
                $("#playerPoint > p").append(total[0] + "점 + A " + total[2] + "개")
                //21 넘을 시 게임 종료
            })
            if (total[0]+total[2] > 21) {
                total[0] = total[0]+total[2]
                game_result(0)
                return
            }
            document.getElementById("hit").disabled = false
            document.getElementById("stand").disabled = false
        }, 500)
    }, 300)
}

function stand() {
    document.getElementById("hit").disabled = true
    document.getElementById("stand").disabled = true
    $("#dealerPoint").css("display", "block")

    if (total[2]!=0) {
        $("#selectPoint").css("display", "flex")
        for(i=0;i<A_case[total[2]].length;i++){
            if(total[0]+A_case[total[2]][i]>21) {
                continue
            }
            $("#selectPoint > div:nth-of-type(1)").append("<button id='"+ i + "' onclick='selectPoint(this.id)'>" + A_case[total[2]][i] + "점</button>")
        }
    } else {
        $("#dealer > div:nth-of-type(2) > img:nth-of-type(2)").animate({opacity: 0}, 300)
        setTimeout(function(){dealer_action()},1500)
    }

    $("#dealerPoint > p:nth-of-type(1)").empty()
    $("#dealerPoint > p:nth-of-type(1)").append(total[1] + "점")
}

function selectPoint(value){
    $("#selectPoint").css("display", "none")
    p_deck.push('h'+A_case[total[2]][value])
    p_deck = p_deck.filter((element) => element != 'hA'&&element != 'sA'&&element != 'dA' && element != 'cA')
    sum_total(p_deck,0)
    $("#playerPoint > p:nth-of-type(1)").empty()
    $("#playerPoint > p:nth-of-type(1)").append(total[0] + "점")
    sum_total(d_deck, 1)
    $("#dealer > div:nth-of-type(2) > img:nth-of-type(2)").animate({opacity: 0}, 300)
    setTimeout(function(){dealer_action()}, 1000)
}

function dealer_action() {
    if(blackjack[0]==1 && blackjack[1]!= 1) {

    } else if ((total[1]<17||softhit) && total[1]!=0) {
        margin = $("#dealer > div:nth-of-type(1)").css("margin-left").replace("px", "")
        $("#dealer > div:nth-of-type(1)").animate({marginLeft: (margin - 50)}, 300)
        setTimeout(function() {
            $("#dealer").append("<div><p>" + deck[0] + "</p><img src='./files/" + deck[0] + ".png'><img src='./files/back.png'></div>")
            d_deck.push(deck[0])
            if (deck[0].endsWith("A")) {
                total[3] += 1
            }
            sum_total(d_deck,1)
            deck.shift()
            topOffset = $("#dealer > div:nth-of-type(" + y + ") > img:nth-of-type(1)").position().top
            leftOffset = $("#dealer > div:nth-of-type(" + y + ") > img:nth-of-type(1)").position().left
            $("#dealer > div:nth-of-type(" + y + ") > img:nth-of-type(2)").animate({top: topOffset, left: leftOffset}, 500)
            setTimeout(function() {
                $("#dealer > div:nth-of-type(" + y + ") > img:nth-of-type(1)").animate({opacity: 1}, 0, function() {
                    $("#dealer > div:nth-of-type(" + y + ") > img:nth-of-type(2)").animate({opacity: 0}, 300, function() {
                        y += 1
                    })
                })
            }, 500)
            $("#dealerPoint > p:nth-of-type(1)").empty()
            $("#dealerPoint > p:nth-of-type(1)").append(total[1] + "점")
        }, 300)

        var timer = setTimeout(function(){dealer_action()}, 1000)
    }
    if (((total[1] >= 17 || total[1] == 0)||(blackjack[1]<blackjack[0]))&&!softhit) {
        switch(blackjack[0]+blackjack[1]) {
            case 1:
                if(blackjack[0]==1) {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(3)}, 1500)
                    break;
                } else {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(2)}, 1500)
                    break;
                }
            case 2:
                clearTimeout(timer)
                setTimeout(function(){game_result(-1)}, 1500)
                break;
            case 0:
                if (total[1] > 21) {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(1)}, 1500)
                    break;
                } else if (total[0] < total[1]) {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(0)}, 1500)
                    break;
                } else if(total[0]==total[1]) {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(-1)}, 1500)
                    break;
                } else {
                    clearTimeout(timer)
                    setTimeout(function(){game_result(1)}, 1500)
                    break;
                }
            default:
                console.log('err. blackjack_')
        }
    }
    if(softhit) {
        softhit = false
    }
}



function reset() {
    deck = []
    d_deck = []
    p_deck = []
    total = [0,0,0,0]
    for (i = 0; i < 13; i++) {
        deck.push("h" + numbers[i])
        deck.push("c" + numbers[i])
        deck.push("s" + numbers[i])
        deck.push("d" + numbers[i])
    }
    
    shuffle(deck)

    $("#dealer").empty()
    $("#player").empty()
}

function game_result(status) {
    if (status == 0) {
        $("#result").html("<p>패배</p><p>플레이어: " + total[0] + "점<br>딜러: " + total[1] + "점</p><p>- " + inputValue + "</p><button onclick='reset()'>다시 시작하기</button>")
    } else if (status == 1) {
        $("#result").html("<p>승리</p><p>플레이어: " + total[0] + "점<br>딜러: " + total[1] + "점</p><p>+ " + inputValue + "</p><button onclick='reset()'>다시 시작하기</button>")
    } else if(status>1) {
        if (status == 2) {
            $("#result").html("<p>패배</p><p>딜러: BlackJack</p><p>- " + inputValue + "</p><button onclick='reset()'>다시 시작하기</button>")
        } else {
            $("#result").html("<p>승리</p><p>플레이어: BlackJack</p><p>+ " + inputValue + "</p><button onclick='reset()'>다시 시작하기</button>")
        }
    } else {
        if (blackjack[0]+blackjack[1]==2) {
            $("#result").html("<p>무승부</p><p>플레이어: BlackJack<br>딜러: BlackJack</p><button onclick='reset()'>다시 시작하기</button>")
        } else {
            $("#result").html("<p>무승부</p><p>플레이어: " + total[0] + "점<br>딜러: " + total[1] + "점</p><button onclick='reset()'>다시 시작하기</button>")    
        }
    }
    $("#result").css("display", "flex")

    $("#betPrice").css("display", "none")
    $("#playerPoint").css("display", "none")
    $("#dealerPoint").css("display", "none")
    $("#hit").css("display", "none")
    $("#stand").css("display", "none")
}
function reset() {
    window.location.reload()
}
