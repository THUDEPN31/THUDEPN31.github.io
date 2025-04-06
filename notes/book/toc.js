// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">1.</strong> 主页</a></li><li class="chapter-item expanded affix "><li class="part-title">量子力学笔记</li><li class="chapter-item expanded "><a href="量子力学/第1章 波函数与薛定谔方程.html"><strong aria-hidden="true">2.</strong> 第1章 波函数与薛定谔方程</a></li><li class="chapter-item expanded "><a href="量子力学/第2章 一维势场中的粒子.html"><strong aria-hidden="true">3.</strong> 第2章 一维势场中的粒子</a></li><li class="chapter-item expanded "><a href="量子力学/第3章 力学量用算符表达.html"><strong aria-hidden="true">4.</strong> 第3章 力学量用算符表达</a></li><li class="chapter-item expanded "><a href="量子力学/第4章 量子力学的矩阵形式与表象理论.html"><strong aria-hidden="true">5.</strong> 第4章 量子力学的矩阵形式与表象理论</a></li><li class="chapter-item expanded "><a href="量子力学/第5章 守恒量与对称性.html"><strong aria-hidden="true">6.</strong> 第5章 守恒量与对称性</a></li><li class="chapter-item expanded affix "><li class="part-title">核辐射物理及探测学笔记</li><li class="chapter-item expanded "><a href="核辐射物理及探测学/期中口试（杨祎罡）.html"><strong aria-hidden="true">7.</strong> 期中口试（杨祎罡）</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
