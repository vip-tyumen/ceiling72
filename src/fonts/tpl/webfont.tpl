<% for (var glyphIdx = 0; glyphIdx < glyphs.length; glyphIdx++) { %>@<%= classPrefix %><%= glyphs[glyphIdx] %>: "<% if (addLigatures) { %><%= glyphs[glyphIdx] %><% } else { %>\<%= codepoints[glyphIdx] %><% } %>";
<% } %><% if (fontfaceStyles) { %>
@font-face {
	font-family:"<%= fontFamilyName %>";<% if (fontSrc1) { %>
	src:<%= fontSrc1 %>;<% }%>
	src:<%= fontSrc2 %>;
	font-weight:normal;
	font-style:normal;
	font-display: swap;
}
<% } %>
<% if (baseStyles) { %>[class^="<%= classPrefix %>"]:before,
[class*=" <%= classPrefix %>"]:before<% if (ie7) {%>,
[class^="<%= classPrefix %>"],
[class*=" <%= classPrefix %>"]<% } %><% if (addLigatures) { %>,
.ligature-icons<% } %> {
	font-family: "<%= fontFamilyName %>" !important;
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}<% } %>
<% for (var glyphIdx = 0; glyphIdx < glyphs.length; glyphIdx++) { %>
.<%= classPrefix %><%= glyphs[glyphIdx] %> {
	&:before {
		content: @<%= classPrefix %><%= glyphs[glyphIdx] %>;
	}
}<% } %>