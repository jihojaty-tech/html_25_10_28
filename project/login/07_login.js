// 07_login.js (수정된 최종 코드)

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnLogin').onclick = (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('id');
        const userPwd = document.getElementById('password'); 
        const loginIdMsg = document.getElementById('loginIdMsg'); 
        const loginPwMsg = document.getElementById('loginPwMsg'); 
        
        // 입력값 가져오기
        const id = (userId.value || '').trim();
        const pwd = (userPwd.value || '').trim();

        // 1. 필수 입력 필드 검사
        if (!id || !pwd) {
            alert('ID와 비밀번호를 입력하세요.'); 
            return; 
        }

        // 메시지 초기화
        loginIdMsg.classList.remove('fail', 'pass'); 
        loginPwMsg.classList.remove('fail', 'pass'); 

        // 2. 사용자 데이터 로드 및 ID 존재 여부 확인
        const users = loadUsers(); // 사용자 데이터 로드
        const u = users[id]; // ★★★ u 변수를 여기서 정의합니다. (스코프 해결)

        if (!u) { 
            loginIdMsg.innerText = '없는 ID 입니다.'; 
            loginIdMsg.classList.add('fail');
            return; // 로그인 실패, 함수 종료
        }

        // 3. 비밀번호 일치 여부 확인
        if (u.password !== pwd) { // '!=' 대신 '==='를 사용하는 것이 좋음
            loginPwMsg.innerText = '비밀번호가 일치하지 않습니다.'; 
            loginPwMsg.classList.add('fail');
            return; // 로그인 실패, 함수 종료
        }

        // 4. 로그인 성공 (모든 검증 통과)
        
        // saveSession(u)를 통해 사용자 이름 등 메인화면에 필요한 모든 정보를 저장합니다.
        saveSession(u); 
        
        // 폼 필드 초기화
        userId.value = '';
        userPwd.value = ''; 
        
        // 메인화면으로 이동
        window.location.href = '../main/01_main.html';
    };
});