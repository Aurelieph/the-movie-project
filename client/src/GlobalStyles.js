import { createGlobalStyle } from "styled-components";
import { NUMBER_THUMBNAILS } from "./Constants";
export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: 	220,220,220;//white/gray
      --secondary-color : #e0edf4;
      --header-height: 80px;
      --banner-height: 300px;
			--profile-image-size:200px;
			--thumbnails-banner-size:300px;
			--number-thumbnails:${NUMBER_THUMBNAILS}
    }

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font-family: 'Poppins', sans-serif;

	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

input,select,button{
  height: 30px;
  border-radius: 5px;
  border: solid 1px lightgray;

}

button{
  cursor: pointer;
  color: white;
    background-color:lightgray;
  &:hover{
      color: lightgray;
    background-color:white;
    }
}

`