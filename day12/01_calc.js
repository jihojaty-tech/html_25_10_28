//  document.getElementsByClassName => 배열로 리턴 [0]
    const container = document.querySelector('.container');
    console.log(container);
    

    const printResult = document.getElementById('printResult');
    let printValue = ''; // 최종 결과 string
    let isResultShow = false; // = 이후에 결과가 표시된 상태인지를 추적
    container.addEventListener('click',(e)=>{ //클릭하면 해당 이벤트를 줘라
        console.log(e.target.value); 
        let btnValue = e.target.value;

        // value가 없는 부분은 undefined
        if(btnValue == undefined)return; // 엉뚱한 곳 누르면 인식 안되게끔

        // 숫자 NaN으로 숫자인지 아닌지 판별 => isNaN이 fasle면 숫자 true면 문자
        console.log(isNaN(btnValue));
        if(!isNaN(btnValue)){
            // 계산 결과가 있는지 확인 변수
            if(isResultShow){ 
                // 결과 - > 새로운 계산 시작
                printValue = btnValue;
                isResultShow = false;
            }else{ 
                // 결과 X
                printValue += btnValue;
            }
        } else{
            // 숫자가 아닌 케이스 (+ - * / . = c)
            if(btnValue != undefined){ // undefined가 아닌 것만
                if(printValue == '' && ['+','-','*','/','.'].includes(btnValue)){
                    printValue = '0';
                    // return; 무시하려면 return쓰기
                }
                switch(btnValue){
                    case 'c' :  
                        // 변수,화면 초기화
                        printValue = '';
                        printResult.innerText = '0';
                        return;
                    case '.' : 
                        // 소수점 연속적 발생 방지 .은 한번만
                        const parts = printValue.split(/[\+\-\*\/]/); // 이 기호가 나오면 split해서 나누기 
                        if(!parts.pop().includes('.')){
                            // 기존 값에 붙이기
                            printValue += btnValue;
                        }
                    break;
                    default : 
                        let result = 0; // 연산의 결과를 받을 변수선언
                        if(btnValue == '='){
                            // 계산하기
                            printValue = extractValue(printValue);
                            isResultShow = true;
                        }else{
                            // + - * / 추가
                            // 연산자가 연속으로 들어오는 경우 이전 연산자를 없애고 새 연산자로 교체

                            // 결과가 표시된 상태에서 연산자를 누르면 이어서 계산
                            if(isResultShow){
                                isResultShow = false;
                            }
                            // 1. 마지막 문자가 연산자인지 확인
                            let trimmed = printValue.trim();
                            if(/[\+\-\*\/]$/.test(trimmed)){
                                // 2. 마지막 연산자를 새 연산자로 교체
                                printValue = trimmed.slice(0, -1) + btnValue + " ";
                            } else{
                                // 일반적인 경우
                                printValue += ` ${btnValue} `;
                            }
                        }
                    break;
                   
                }
            }
        }
        printResult.innerText = printValue;
    });

    function operation(f, o, l){
        // f, l은 반드시 Number 형태로 들어와야 함
        f = Number(f);
        l = Number(l);
        let result = 0;
        switch(o){
            case '+' : result = f + l; break;
            case '-' : result = f - l; break;
            case '*' : result = f * l; break;
            case '/' : 
                if(l == 0){
                    alert('0으로 나눌 수 없습니다.')
                    return 0;
                }
                    result = (f / l); break;
            default : break;
        }
        return result.toFixed(2);
    }

   function extractValue(strVal){
        // strValue = 123 + 456
        // substring(시작번지, 끝번지)
        // substr(시작번지, 갯수)
        let firstNum = strVal.substring(0, strVal.indexOf(" ")); // 0번지부터 공백까지
        let lastNum = strVal.substring(strVal.lastIndexOf(" ")+1); // strVal부터 마지막까지
        let op = strVal.substr(strVal.indexOf(" ")+1, 1);
        console.log(firstNum, op, lastNum);
        return operation(firstNum, op, lastNum);
   }
        // let r = extractValue('132 / 1');
        // console.log(r);
