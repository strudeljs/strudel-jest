const createWrapperStructure = (el) => ({
    domEl: el,
    instance: el.__strudel__,
    $element: el.__strudel__.$element,
});

export const createComponentWrapper = (markup) => (
    new Promise((resolve) => {
        let el = document.createElement('div');
        el.innerHTML = markup;
        el = el.firstChild;
        el = document.body.appendChild(el);

        window.document.addEventListener('strudel:loaded', () => {
            resolve(createWrapperStructure(el));
        });

        window.document.dispatchEvent(new Event('content:loaded'));
    })
);
