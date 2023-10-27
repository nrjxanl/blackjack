// const marks = ['h','c','s','d'];
// const numbers = ["A",1,2,3,4,5,6,7,8,9,10,"J","K","Q"];//A는 1 또는 11로 J K Q 은 모두 10으로 취급한다.;
// let deck = [];
// winning_count = 0;
// function card_selection(pdeck) {
//     var mark = marks[parseInt(Math.random()*3)];
//     var number = numbers[parseInt(Math.random()*12)]
//     pdeck.push([mark,number])
//     console.log(pdeck)
// }
// card_selection(deck)


// 카드 문양별 A, 2~10, J, K, Q 카드 생성(총 52개) - deck
numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q"];
deck = [];
winning_count = 0;
for (i = 0; i < 13; i++) {
    deck.push("h" + numbers[i]);
    deck.push("c" + numbers[i]);
    deck.push("s" + numbers[i]);
    deck.push("d" + numbers[i]);
}
console.log(deck)

// array 내 함수 무작위로 섞는 함수 - function shuffle()
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};

// deck에서 몇 번째 카드를 뽑을지 지정할 array(0~51) 만들고 위 함수 사용하여 섞기 - iArray
iArray = []
for (i = 0; i < 52; i++) {
    iArray.push(i);
};
shuffle(iArray);

// 베팅 금액 초기값을 1,000원으로 지정 - inputValue
inputValue = 1000;
$("#input").text(inputValue);

// up 버튼 누르면 베팅 금액 1,000원씩 올리고 inputValue에 그 값 저장하기
function up() {
    inputValue += 1000;
    $("#input").text(inputValue);

    // 베팅 금액이 1,000원보다 클 때 down 버튼 활성화(css에서 기본적으로 클릭하지 못하도록 설정해 둠)
    if (inputValue > 1000) {
        $("#down").css("pointer-events", "all")
    }
}

// down 버튼 누르면 베팅 금액 1,000원씩 내리고 inputValue에 그 값 저장하기
function down() {
    inputValue -= 1000;
    $("#input").text(inputValue);
    
    // 베팅 금액이 1,000원일 때 down 버튼 비활성화
    if (inputValue == 1000) {
        $("#down").css("pointer-events", "none")
    }
}

// 시작 버튼 누를 시
function start() {

    // 화면 좌측 상단에 베팅 금액 띄우기
    $("#betPrice").text(inputValue + "원");

    // 플레이어에게 deck의 iArray[0]번째, irray[1]번째 카드 지급(iArray[0]~iArray[25]: 플레이어 카드)
    for (x = 0; x < 2; x++) {
        $("#bet").css("display", "none");
        $("#betPrice").css("display", "block");
        $("#player").append("<div>" + deck[iArray[x]] + "</div>");
    }

    // 딜러에게 deck의 iArray[26]번째, iArray[27]번째 카드 지급(iArray[26]~iArray[51]: 딜러 카드)
    for (y = 26; y < 28; y++) {
        $("#bet").css("display", "none");
        $("#dealer").append("<div>" + deck[iArray[y]] + "</div>");
    }
}

// hit 버튼 누를 시
function hit() {

    // 위의 x, y 1씩 증가(x: 2~25, y: 28~51)
    x++;
    y++;

    // 플레이어와 딜러에게 각각 deck의 iArray[x]번째, iArray[y]번째 카드 지급
    $("#player").append("<div>" + deck[iArray[x]] + "</div>");
    $("#dealer").append("<div>" + deck[iArray[y]] + "</div>");
}












// 카드섞기 
// function shuffleDeck() {
//     for (let i = numbers.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//     }
// }
// shuffleDeck(deck);



//initializeDeck (중복되지 않는 카드 뭉치를 생성)





  













//사용자 인터페이스 (hit stand)

//const dealButton = document.getElementById("deal-button");
//const hitButton = document.getElementById("hit-button");
//const standButton = document.getElementById("stand-button");
//const dealerHandElement = document.getElementById("dealer-hand");
//const playerHandElement = document.getElementById("player-hand");
//button 클릭시 이벤트 발생 만들어야함