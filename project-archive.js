'use strict';
(() => {
  const cards = Array.from(document.querySelectorAll('.archive-project-card'));
  if (!cards.length) return;
  const project = document.getElementById('filter-project');
  const year = document.getElementById('filter-year');
  const type = document.getElementById('filter-type');
  const count = document.getElementById('archive-count');
  const empty = document.querySelector('.archive-empty');
  function filter() {
    let visible = 0;
    for (const card of cards) {
      const match = (project.value === 'all' || card.dataset.project === project.value)
        && (year.value === 'all' || card.dataset.years.split(' ').includes(year.value))
        && (type.value === 'all' || card.dataset.types.split(' ').includes(type.value));
      card.hidden = !match;
      if (match) visible += 1;
    }
    empty.hidden = visible > 0;
    count.textContent = document.documentElement.lang === 'en'
      ? `${visible} ${visible === 1 ? 'project' : 'projects'}` : `${visible} 个项目`;
  }
  for (const select of [project, year, type]) select.addEventListener('change', filter);
  document.getElementById('archive-reset').addEventListener('click', () => {
    for (const select of [project, year, type]) select.value = 'all';
    filter();
  });
  document.getElementById('language-toggle').addEventListener('click', filter);
  filter();
})();
