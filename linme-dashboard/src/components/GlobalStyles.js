import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');

    *:not(.fa) {
        font-family: "Pretendard", "Noto Sans KR", "NaumGothic", "Malgun Gothic";
    }
    
    * {
        box-sizing: border-box;
    }

    body {
        padding: 30px 50px;
        margin: 0;
    }
`;

export default GlobalStyles;
