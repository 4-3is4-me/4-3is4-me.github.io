// add a button to elements to copy their content: https://yihui.org/en/2023/09/copy-button/
(d => {
  const cfg = d.currentScript?.dataset;
  d.querySelectorAll(cfg?.selector || 'pre>code, .copy-this').forEach(el => {
    const btn = d.createElement('span'), cls = btn.classList,
      c1 = 'copy-success', c2 = 'copy-fail', pre = el.parentNode;
    btn.className = 'copy-button';

    // temporarily add a class to the button (as a feedback to copy action)
    function feedback(c) {
      cls.add(c); setTimeout(() => cls.remove(c), 1000);
    }
    
    function getText() {
        const cnodes = el.parentNode.childNodes[3].childNodes[0].childNodes[0].childNodes;
        let textArray = [];
        cnodes.forEach(node => {
            if (node.className !== 'linenos') {
                textArray.push(node.textContent);
            }
        })
        return textArray.join('');
    }

    btn.onclick = () => navigator.clipboard.writeText(getText()).then(
      () => feedback(c1), () => feedback(c2)
    );

    // add the button only if it has not been added
    el.querySelector('.copy-button') || el.append(btn);
    // p.querySelector('.copy-button') || p.prepend(btn);
    el.hasAttribute('tabIndex') || (el.tabIndex = '0');
    getComputedStyle(el).position === 'static' && (el.style.position = 'relative');
  });
})(document);