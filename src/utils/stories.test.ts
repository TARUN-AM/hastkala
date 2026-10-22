import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../lib/db';

test('db retrieves all seed craft stories with valid attributes', () => {
  const stories = db.getStories();
  assert.ok(stories.length >= 6, 'Should have at least 6 seed stories');
  
  for (const s of stories) {
    assert.ok(s.id, 'Story must have an id');
    assert.ok(s.slug, 'Story must have a slug');
    assert.ok(s.title, 'Story must have a title');
    assert.ok(s.category === 'Craft Heritage' || s.category === 'Artisan Stories', 'Category must be valid');
    assert.ok(s.cover_image, 'Story must have a cover image');
    assert.ok(s.read_time_minutes > 0, 'Read time must be positive');
  }
});

test('db filters stories correctly by category', () => {
  const heritageStories = db.getStories({ category: 'Craft Heritage' });
  assert.ok(heritageStories.length > 0, 'Should find Craft Heritage stories');
  assert.ok(heritageStories.every((s) => s.category === 'Craft Heritage'), 'All items should match category');

  const artisanStories = db.getStories({ category: 'Artisan Stories' });
  assert.ok(artisanStories.length > 0, 'Should find Artisan Stories');
  assert.ok(artisanStories.every((s) => s.category === 'Artisan Stories'), 'All items should match category');
});

test('db retrieves story by slug and finds related stories', () => {
  const slug = 'sacred-geometry-of-dharwad-kasuti-embroidery';
  const story = db.getStoryBySlug(slug);
  assert.ok(story !== null, 'Story should be found by slug');
  assert.strictEqual(story?.slug, slug);

  const related = db.getRelatedStories(slug, 2);
  assert.strictEqual(related.length, 2, 'Should return exactly 2 related stories');
  assert.ok(!related.some((r) => r.slug === slug), 'Related stories should exclude current story');
});
