document.addEventListener("DOMContentLoaded", function () {
  const text1 = "성장하는 프론트엔드 개발자";
  const text2 = "차형석's portfolio";
  const p1 = document.querySelector("#main_1_p p:nth-child(1)");
  const p2 = document.querySelector("#main_1_p p:nth-child(2)");
  const header = document.querySelector("header");

  function typeText(element, text, delay) {
    return new Promise((resolve) => {
      let i = 0;
      let interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setTimeout(resolve, delay); // 다음 애니메이션 실행 전 대기 시간
        }
      }, 100);
    });
  }

  async function startTypingAnimation() {
    p1.textContent = "";
    p2.textContent = "";
    await typeText(p1, text1, 500); // 첫 번째 텍스트 타이핑
    await typeText(p2, text2, 500); // 두 번째 텍스트 타이핑
    header.style.opacity = "1"; // 애니메이션 완료 후 헤더 표시
  }

  startTypingAnimation();
});

// 스크롤 방지 및 초기 위치 설정
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
document.documentElement.scrollTo({ top: 0, behavior: "instant" });

let page = 1;
const sections = {
  내소개: "section_1",
  스킬: "section_2",
  수상경력: "section_3",
  프로젝트: "section_4",
};
const menuItems = document.querySelectorAll("header ul li");

// 메뉴 클릭 시 해당 섹션으로 이동
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = sections[item.innerText]; // li의 텍스트를 기반으로 섹션 ID 가져오기
    if (targetId) {
      page = parseInt(targetId.split("_")[1]); // 페이지 번호 업데이트
      scrollToSection(targetId);
    }
  });
});

// 휠 이벤트로 페이지 스크롤
window.addEventListener("wheel", (e) => {
  if (document.documentElement.classList.contains("scrolling")) return;

  if (e.deltaY > 0 && page < 4) {
    page++;
  } else if (e.deltaY < 0 && page > 1) {
    page--;
  } else {
    return;
  }

  scrollToSection(`section_${page}`);
});

// 섹션 이동 함수
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  const posTop = targetSection.offsetTop;
  document.documentElement.classList.add("scrolling");
  window.scrollTo({ top: posTop, behavior: "smooth" });

  setTimeout(() => {
    document.documentElement.classList.remove("scrolling");
    updateActiveMenu(sectionId); // 메뉴 강조 업데이트
  }, 300);
}

// 현재 활성화된 메뉴 강조
function updateActiveMenu(activeSectionId) {
  menuItems.forEach((item) => {
    const targetId = sections[item.innerText];
    if (targetId === activeSectionId) {
      item.classList.add("active"); // 해당 메뉴에 active 클래스 추가
    } else {
      item.classList.remove("active"); // 나머지는 제거
    }
  });
}

// 초기 실행 (첫 번째 섹션을 활성화)
updateActiveMenu("section_1");
