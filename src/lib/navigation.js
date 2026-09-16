// Fired by <PageTransition /> once the curtain has lifted on the new section.
export const NAV_DONE_EVENT = 'wahaj:navigated';

// Document offset of a section as laid out in normal flow. Sections in <main>
// are sticky (see useStackedSections), so their on-screen rect can't be used.
export function naturalTop(el) {
  const parent = el.parentElement;
  if (parent && parent.tagName === 'MAIN') {
    let top = parent.getBoundingClientRect().top + window.scrollY;
    for (const child of parent.children) {
      if (child === el) break;
      top += child.offsetHeight;
    }
    return top;
  }
  return el.getBoundingClientRect().top + window.scrollY;
}
