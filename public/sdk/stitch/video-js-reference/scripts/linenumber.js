/*global document */
(function() {
    var source = document.getElementsByClassName(&apos;prettyprint source linenums&apos;);
    var i = 0;
    var lineNumber = 0;
    var lineId;
    var lines;
    var totalLines;
    var anchorHash;

    if (source &amp;&amp; source[0]) {
        anchorHash = document.location.hash.substring(1);
        lines = source[0].getElementsByTagName(&apos;li&apos;);
        totalLines = lines.length;

        for (; i &lt; totalLines; i++) {
            lineNumber++;
            lineId = &apos;line&apos; + lineNumber;
            lines[i].id = lineId;
            if (lineId === anchorHash) {
                lines[i].className += &apos; selected&apos;;
            }
        }
    }
})();
