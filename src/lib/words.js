// Used to continue the <Words /> stagger across several text fragments.
export const countWords = (text = '') => String(text).trim().split(/\s+/).filter(Boolean).length;
