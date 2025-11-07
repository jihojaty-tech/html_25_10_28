// 로컬스트리지에 접근할 때 사용할 전역변수
const USERS_KEY = 'user_Data';
const SESSION_KEY = 'status';


// JSON.parse 실패 대비 try/catch
function loadUsers(){ 
    // local에 가서 사용자 데이터 불러오기 만약 데이터가 없다면 빈 객체로 반환
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); 
    } catch (error) {
        console.error('loadUsers parse error!!', error);
        return {}; // 에러발생시 빈 객체로 반환 js 터짐 방지
    }
}

function saveUsers(u){ // 사용자 데이터를 받을 매개변수
    // local에 가서 사용자 데이터 저장 / local은 문자열만 저장 가능하기에 객체를 문자열로 변환후 저장
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(u)); 
    } catch (error) {
        console.error('saveUsers error', error);
    }
}
function loadSession(){ 
    // 사용자 정보를 읽어와서 로그인/비로그인 상태 확인
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); 
    } catch (error) {
        console.warn('loadSession parse error', error); 
        return null;
    }
}
function saveSession(s){
    // 사용자상태(로그인)를 저장해서 브라우저를 재 실행하거나 
    // 브라우저를 닫았다 다시 열었을때 재 로그인 방지 (사용자 편의 목적) 
    localStorage.setItem(SESSION_KEY, JSON.stringify(s)); 
}

// 로그아웃 시 사용자에 대한 권한 접근 금지
// 사용자 정보로 이용하는 기능이 없기에 필요는 없지만 걍 넣어둠 
function clearSession(){
    localStorage.removeItem(SESSION_KEY); 
}


// 1. 아이디 유효성 검사
document.addEventListener('DOMContentLoaded', function() {
    // 객체 할당
    const userId = document.getElementById('id'); // 아이디
    const email = document.getElementById('email'); // 이메일
    const emailMsg = document.getElementById('emailMsg'); // 이메일 형식 확인 메세지창
    const userName = document.getElementById('name'); // 이름
    const userPwd = document.getElementById('password'); // 비밀번호
    const msg = document.getElementById('idMsg'); // 아이디 중복확인 메세지창 
    const formArea = document.getElementById('signup-form'); // 로그인시 메인화면 로그인|회원가입부분 출력제어
    const profileArea = document.getElementById('profileArea'); // 메인화면 로그인 정보(사용자정보,로그아웃 출력)
    const who = document.getElementById('who'); // 사용자 정보 출력
    const terms = document.getElementById('terms'); // 개인정보동의 버튼

    function idMatch(){
        const id = (userId.value || '').trim();
        msg.classList.remove('fail', 'pass'); // pass -> fail 넘어갈때 혹시 모를 버그를 위해서 재시도시 pass적용되지 않도록 삭제
        if(!id) { 
            // 아이디를 입력하지 않았다면 입력문자 띄우기 
            msg.innerText = 'ID를 입력하세요.'; 
            msg.classList.add('fail'); // 클래스 리스트에 fail 설정해서 css에서 시각적 효과만들기
            return false;
        }
        if(id.length < 5){
            msg.innerText = 'ID는 5자 이상이어야 합니다.'; 
            msg.classList.add('fail');
            return false;
  }
  const users = loadUsers(); // 로컬에서 사용자 정보 가져오기
  // 만약 사용자 id가 기존 사용자 id와 중복이라면
  if(users[id]){
    msg.innerText = `이미 사용 중인 ID입니다.`; 
    msg.classList.add('fail');
    return false;
  } 
  else{
    msg.innerText =`사용 가능한 ID입니다.`; 
    msg.classList.remove('fail'); // 틀린조건에서 수정했을때 fail이 다시 적용되지 않도록 삭제
    msg.classList.add('pass');
    return true;
} 
};
// 입력하면 실시간으로 검사
userId.addEventListener('input', idMatch);


// 2. 이메일 유효성 검사
function emailMatch(){
  const email1 = (email.value || '').trim();
  emailMsg.classList.remove('fail', 'pass'); // pass -> fail 넘어갈때 혹시 모를 버그를 위해서 재시도시 pass적용되지 않도록 삭제
  if(email1 == '') { 
    // 이메일 입력하지 않았다면 입력문자 띄우기 
    emailMsg.innerText = '이메일를 입력하세요.'; 
    emailMsg.classList.add('fail'); // 클래스 리스트에 fail 설정해서 css에서 시각적 효과만들기
    return false;
    }
    // 이메일 형식 검사
    if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email1.trim())){
      emailMsg.innerText = `올바른 이메일 형식으로 작성해주세요.`;
      emailMsg.classList.add('fail');
      console.log('이메일형식');
      return false;
    }
  const users = loadUsers(); // 로컬에서 사용자 정보 가져오기

  // 객체 value 꺼내와서 배열로 저장후 순회하면서 email과 비교
  const isUsed = Object.values(users).some(u => ((u.email || '').trim().toLowerCase() == email1.trim().toLowerCase()));
  // 만약 사용자 email이 기존 사용자 email과 중복이라면
  if(isUsed){
    emailMsg.innerText = `이미 사용 중인 이메일 주소입니다.`; 
    emailMsg.classList.add('fail');
    return false;
    }
  else{
    console.log('이메일 테스트 성공');
      emailMsg.innerText =`사용 가능한 이메일 주소입니다.`; 
      emailMsg.classList.remove('fail'); // 틀린조건에서 수정했을때 fail이 다시 적용되지 않도록 삭제
      emailMsg.classList.add('pass');
      return true;
} 
}
// 입력하면 실시간으로 검사
email.addEventListener('input', emailMatch);


// 3. 최종 유효성 검사
document.getElementById('signUpBtn').onclick = (e) => { // 가입하기 버튼
    e.preventDefault(); // 유효성 검사 실패해도 input value는 유지
    
    const id = (userId.value || '').trim();
    const name = (userName.value || '').trim();
    const email1 = (email.value || '').trim();
    const pwd = userPwd.value || '';
    if(!id || !name || !pwd || !email1){ 
        // 필수 입력 정보가 누락 되면 alert로 출력 후 종료
        alert('필수 입력 정보를 입력해주세요');
        return; 
    }
    // 가입하기 버튼 누를 시 최종 유효성 검사
    if(!emailMatch() || !idMatch()){
        alert('이메일 또는 아이디가 올바르지 않습니다.');
        return;
    }
    if(!terms.checked){
        alert('필수 이용약관에 동의해 주세요.');
        return;
    }
    const users = loadUsers();

  // 회원가입 완료
  users[id] = { // id,이름,email,비번,회원가입 시점 local에 저장
    name: name , 
    email: email1, 
    password: pwd, 
    createdAt: new Date().toLocaleString() 
    };

  saveUsers(users);
  alert('환영합니다! 회원가입이 완료되었어요.');
  // 회원가입후 input창 비우기 
  userName.value = '';
  email.value = '';
  userId.value = '';
  userPwd.value = ''; 
  msg.innerText = '';
  emailMsg.innerText = '';
  document.getElementById('password-confirm').value = '';
  terms.checked = false;
};
});


// 로그인 유효성 검사
// document.getElementById('btnLogin').onclick = () => {
//   const id = (userId.value || '').trim();
//   const pwd = userPwd.value || '';
//   if(!id || !pwd){ 
//     showMsg('ID와 비밀번호를 입력하세요.', true); return; 
//     }

//   const users = loadUsers();
//   const u = users[id];
//   if(!u){ 
//     showMsg('해당 ID가 없습니다.', true); return; 
//     }
//   if(u.password !== pwd){ 
//     showMsg('비밀번호가 일치하지 않습니다.', true); return; 
//     }

//   // 로그인 성공: 간단 세션 저장
//   saveSession({ id, token: btoa(id + ':' + Date.now()) });
//   showMsg('로그인 성공!');
//   userPwd.value = '';
//   renderProfile();
// };

// document.getElementById('btnLogout').onclick = () => {
//   clearSession();
//   renderProfile();
// };

// function showMsg(text, isError) {
//     idMatch();
//   msg.innerText = text;
//   // 명시적 오류 상황에서 시각적 강조
//   msg.classList.toggle('danger', !!isError); // css에서 명시적 오류상황 빨간색으로표현
// }

// function renderProfile() {
//   const s = loadSession();
//   if(s && s.id){
//     const users = loadUsers();
//     const u = users[s.id] || {};
//     who.textContent = (u.name ? (u.name + ' — ') : '') + s.id;
//     formArea.classList.add('hidden');
//     profileArea.classList.remove('hidden');
//     showMsg('');
//   }else{
//     formArea.classList.remove('hidden');
//     profileArea.classList.add('hidden');
//     showMsg('');
//   }
// }

// 초기 화면
// renderProfile();