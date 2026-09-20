import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual offline answer router, without loading speech or LLM engines.
function compile(file) {
  return ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}
function loadData(file) {
  const context = { exports: {}, require: () => ({ contactUrls: { linkedIn: 'https://www.linkedin.com/' } }) };
  vm.runInNewContext(compile(file), context);
  return context.exports;
}
const { projects } = loadData('src/data/projects.ts');
const { auraProfile } = loadData('src/data/aura-profile.ts');
const urls = fs.readFileSync('src/data/urls.ts', 'utf8');
const slugs = [...urls.match(/publicProjectSlugs = \[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
const publicProjects = projects.filter(project => slugs.includes(project.slug));
const nodes = {
  'aura-project-knowledge': { textContent: JSON.stringify(publicProjects) },
  'aura-profile-knowledge': { textContent: JSON.stringify(auraProfile) },
};
const context = {
  exports: {}, require: () => ({}),
  document: { readyState: 'loading', getElementById: id => nodes[id], addEventListener() {} },
  window: { location: { pathname: '/' } },
};
vm.createContext(context);
vm.runInContext(compile('src/scripts/aura-intelligent.ts') + '\nglobalThis.answer = fallbackAnswer; globalThis.knowledge = getProjectKnowledge;', context);
const screens = context.answer('What screens does PregTrack show?').answer;
assert.match(screens, /7 interface moments/);
for (const title of ['Sign In', 'Profile Setup', 'Due Date Setup', 'Dashboard', 'Pregnancy Timeline', 'Baby Growth Chart', 'Hospital Discovery']) assert.ok(screens.includes(title), title);
assert.match(context.answer('Explain PregTrack Hospital Discovery screen').answer, /Search, a map/);
assert.match(context.answer('PregTrack outcomes and metrics').answer, /does not claim/);
assert.match(context.answer('PregTrack planned validation').answer, /not measured outcomes/);
assert.match(context.answer('PayDart screens').answer, /Digital Receipt/);
assert.match(context.answer('PharmaVault outcomes').answer, /qualitative/);
assert.match(context.answer('Tell me confidential project details').answer, /NDA/);
assert.match(context.knowledge('PregTrack'), /Evidence limits:/);
assert.match(context.knowledge('PregTrack'), /Hospital Discovery/);
assert.equal(publicProjects.length, 5);
assert.ok(!publicProjects.some(project => project.slug === 'enterprise-travel-intelligence'));
console.log('PASS: Aura screen, evidence, project routing, and confidentiality regressions.');
