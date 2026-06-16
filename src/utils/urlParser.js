// Detect platform & extract a readable title from a problem URL.
const PLATFORMS = [
  { host: 'leetcode.com', name: 'LeetCode', extract: (u) => match(u, /\/problems\/([^/?#]+)/) },
  { host: 'geeksforgeeks.org', name: 'GeeksforGeeks', extract: (u) => match(u, /\/problems\/([^/?#]+)/) || lastSegment(u) },
  { host: 'codingninjas.com', name: 'CodeStudio', extract: (u) => lastSegment(u) },
  { host: 'naukri.com', name: 'CodeStudio', extract: (u) => lastSegment(u) },
  { host: 'hackerrank.com', name: 'HackerRank', extract: (u) => lastSegment(u) },
  { host: 'codeforces.com', name: 'Codeforces', extract: (u) => lastSegment(u) },
  { host: 'atcoder.jp', name: 'AtCoder', extract: (u) => lastSegment(u) },
  { host: 'interviewbit.com', name: 'InterviewBit', extract: (u) => lastSegment(u) },
];

function match(url, re) {
  const m = url.match(re);
  return m ? m[1] : null;
}

function lastSegment(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
}

function titleCase(slug) {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\.[a-z]+$/i, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function parseProblemUrl(url) {
  if (!url) return { platform: '', title: '' };
  let host = '';
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return { platform: '', title: '' };
  }
  const p = PLATFORMS.find((x) => host.endsWith(x.host));
  if (!p) return { platform: host, title: titleCase(lastSegment(url)) };
  const slug = p.extract(url) || '';
  return { platform: p.name, title: titleCase(slug) };
}
