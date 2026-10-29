import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getDefaultSubjects } from './syllabusDefaults';

describe('FocusForge Complete Curriculum Generator', () => {
  it('should generate all HSC Science subjects (1st & 2nd Papers + Compulsory) with chapters and topics', () => {
    const subjects = getDefaultSubjects('test_user', 'Science', 'HSC 2nd Year');
    assert.ok(subjects.length >= 12);

    const phy1 = subjects.find((s) => s.name.includes('Physics 1st'));
    const phy2 = subjects.find((s) => s.name.includes('Physics 2nd'));
    const chem1 = subjects.find((s) => s.name.includes('Chemistry 1st'));
    const chem2 = subjects.find((s) => s.name.includes('Chemistry 2nd'));
    const math1 = subjects.find((s) => s.name.includes('Higher Mathematics 1st'));
    const math2 = subjects.find((s) => s.name.includes('Higher Mathematics 2nd'));
    const bio1 = subjects.find((s) => s.name.includes('Biology 1st'));
    const bio2 = subjects.find((s) => s.name.includes('Biology 2nd'));

    assert.ok(phy1 && phy2 && chem1 && chem2 && math1 && math2 && bio1 && bio2);
    assert.ok(phy1.chapters.length > 0 && phy1.chapters[0].topics.length > 0);
  });

  it('should generate all HSC Humanities subjects with chapters and topics', () => {
    const subjects = getDefaultSubjects('test_user', 'Humanities', 'HSC 2nd Year');
    assert.ok(subjects.length >= 12);

    const civ1 = subjects.find((s) => s.name.includes('Civics & Good Governance 1st'));
    const eco1 = subjects.find((s) => s.name.includes('Economics 1st'));
    const hist1 = subjects.find((s) => s.name.includes('History 1st'));
    const logic = subjects.find((s) => s.name.includes('Logic'));

    assert.ok(civ1 && eco1 && hist1 && logic);
    assert.ok(civ1.chapters.length > 0 && civ1.chapters[0].topics.length > 0);
  });

  it('should generate all HSC Commerce subjects with chapters and topics', () => {
    const subjects = getDefaultSubjects('test_user', 'Commerce', 'HSC 2nd Year');
    assert.ok(subjects.length >= 11);

    const acc1 = subjects.find((s) => s.name.includes('Accounting 1st'));
    const acc2 = subjects.find((s) => s.name.includes('Accounting 2nd'));
    const fin1 = subjects.find((s) => s.name.includes('Finance, Banking & Insurance 1st'));
    const bom1 = subjects.find((s) => s.name.includes('Business Organization & Management 1st'));

    assert.ok(acc1 && acc2 && fin1 && bom1);
    assert.ok(acc1.chapters.length > 0 && acc1.chapters[0].topics.length > 0);
  });
});
