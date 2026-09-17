/**
 * Where a marketing page links to.
 *
 * One constant rather than a literal per component: these were `/v2/...` while the redesign sat
 * beside the live site, and promoting it to `/` was meant to be an edit here and nowhere else.
 * It was not: ten links had been written out by hand across five components and only turned up by
 * grepping the *rendered* HTML, because a source grep that skipped `components/v2/` hid them. They
 * all go through `doc()` now, so the next move really is one edit.
 */
export const HOME = "/";
export const DOCS = "/docs";
export const FEATURES = "/features";

export const doc = (path: string) => `${DOCS}/${path}`;
