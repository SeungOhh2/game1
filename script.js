// DOM 요소 가져오기
const dinosaur = document.getElementById("dinosaur");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");

let score = 0;
let isJumping = false;

// 점프 함수
function jump() {
    if (isJumping) return; // 이미 점프 중이라면 함수를 종료
    isJumping = true;
    
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 50) {
            clearInterval(jumpInterval); // 최대 점프 높이에 도달하면 점프 종료
            descend();
        } else {
            jumpHeight += 5;
            dinosaur.style.bottom = 20 + jumpHeight + "px";
        }
    }, 20);
}

// 하강 함수
function descend() {
    let descendHeight = 50;
    const descendInterval = setInterval(() => {
        if (descendHeight <= 0) {
            clearInterval(descendInterval); // 바닥에 닿으면 하강 종료
            isJumping = false;
        } else {
            descendHeight -= 5;
            dinosaur.style.bottom = 20 + descendHeight + "px";
        }
    }, 20);
}

// 점프를 키 이벤트로 연결
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") {
        jump();
    }
});

// 장애물 움직임 처리
function moveCactus() {
    let cactusPos = 600;
    const moveCactusInterval = setInterval(() => {
        cactusPos -= 5;
        cactus.style.right = cactusPos + "px";
        
        // 장애물이 화면 왼쪽 끝을 지나면 다시 오른쪽으로 이동
        if (cactusPos <= -20) {
            cactusPos = 600;
            score++;
            scoreElement.innerText = `점수: ${score}`;
        }

        // 충돌 체크
        if (cactusPos >= 50 && cactusPos <= 90 && dinosaur.style.bottom === "70px") {
            alert("게임 오버! 최종 점수: " + score);
            score = 0;
            scoreElement.innerText = `점수: 0`;
        }
    }, 20);
}

// 게임 시작
moveCactus();
