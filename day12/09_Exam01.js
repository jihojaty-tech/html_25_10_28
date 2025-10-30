// 문제 랜덤 생성 함수
function quizRandom(){
    num1 = Math.floor(Math.random()*9)+1;
    num2 = Math.floor(Math.random()*9)+1;
    return num1,num2;
}

// 정답 확인 함수
function quizCheck(){
    let quiz = quizRandom();
}
console.log(quiz);



function PersonClassObject(first, last, age, addr){
            this.firstName = first;
            this.lastName = last;
            this.age = age;
            this.address = addr;
            this.getPersonInfo = function(){
                return `${this.firstName}${this.lastName} (${this.age}) / ${this.address}`;
            }
        }