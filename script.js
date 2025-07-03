const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("click", ()=>{
    // if(document.body.className == 'dark-mode'){

    // }else{
    //     document.body.className = "dark-mode";
    // }
    document.body.classList.toggle("dark-mode");
});

let sections = document.querySelectorAll(".right_container section");
let currentIndex = 0;

sections.forEach((section, index) => {
    section.style.display = index === 0 ? "flex" : "none";
});

const showAfterSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })  // 현재 section 숨기기
    if (currentIndex == sections.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    sections[currentIndex].style.display = 'flex';  // 다음 section 보여주기
}
const showBeforeSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })
    if (currentIndex == 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    sections[currentIndex].style.display = 'flex';
}

let intervalId = setInterval(showAfterSection, 3000);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(showAfterSection, 3000);
}

sections.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) {
            showBeforeSection();
            resetInterval();
        } else if (clickX > sectionWidth * 2 / 3) {
            showAfterSection();
            resetInterval();
        } else { 
            if (intervalId) {
                clearInterval(intervalId);  // 자동 넘김 중지
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000);  // 자동 넘김 재개
            }
        }
    });
});

fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&u2=20050105&q=%EC%83%9D%EB%85%84%EC%9B%94%EC%9D%BC+%EC%9A%B4%EC%84%B8&u1=f&u3=solar&u4=12&_=1719518803829")
    .then(response => response.json())
    .then(data => {
    const htmlString = data.flick?.[0];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const fortune = doc.querySelector('dd b')?.textContent ?? "운세 제목 없음";
    const fortuneText = doc.querySelector('dd p')?.textContent ?? "운세 내용 없음";

    const fortuneSection = document.createElement("section");
    fortuneSection.style.display = "flex";
    fortuneSection.classList.add("fortune");

    const title = document.createElement("h2");
    title.textContent = "오늘의 운세";
    const h3 = document.createElement("h3");
    h3.textContent = fortune;
    const p = document.createElement("p");
    p.textContent = fortuneText;

    fortuneSection.append(title, h3, p);

    const contactSection = document.querySelector(".contact");
    contactSection.after(fortuneSection);

    sections = document.querySelectorAll(".right_container section");
    });
