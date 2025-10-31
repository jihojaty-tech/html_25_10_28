const num1 = [];
const num2 = [];
const result = [];

// 문제 랜덤 생성 함수
function quizRandom(){
    for(let i = 0; i < 10; i++){
        num1[i] = Math.floor(Math.random()*9)+1;
        num2[i] = Math.floor(Math.random()*9)+1;
        
    }
    
    return [num1, num2];
}
// 버튼 클릭하면 물제 출제 함수
document.getElementById('quiz').addEventListener('click',()=>{
    const [nums1, nums2] = quizRandom();
    for(let i = 0; i < 10; i++){
        document.getElementById(i+1).innerText = `${nums1[i]} x ${nums2[i]} = `;
    }
})
// 정답 확인 함수
function quizCheck(){
    
  

}




// function PersonClassObject(first, last, age, addr){
//             this.firstName = first;
//             this.lastName = last;
//             this.age = age;
//             this.address = addr;
//             this.getPersonInfo = function(){
//                 return `${this.firstName}${this.lastName} (${this.age}) / ${this.address}`;
//             }
//         }