document.querySelectorAll("[include-html]").forEach(async (el) => {
    const file = el.getAttribute("include-html");
    const resp = await fetch(file);
    el.innerHTML = await resp.text();
});
