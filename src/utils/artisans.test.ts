import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../lib/db';

test('db retrieves all seed artisans including the reference artisans', () => {
  const artisans = db.getArtisans();
  assert.ok(artisans.length >= 8, 'Should have at least 8 directory artisans');

  const requiredSlugs = [
    'manan',
    'aman-jain',
    'viney',
    'zakhir',
    'padma',
    'dalavai-kullayappa',
    'sindhe-siva',
    'kanday-anjanappa',
  ];

  for (const slug of requiredSlugs) {
    const artisan = artisans.find((a) => a.slug === slug);
    assert.ok(artisan, `Artisan with slug "${slug}" must exist in the directory`);
    assert.ok(artisan.business_name, 'Artisan must have a business name');
    assert.ok(artisan.craft_specialty, 'Artisan must have a craft specialty');
    assert.ok(artisan.region, 'Artisan must have a region');
    assert.ok(artisan.avatar_url, 'Artisan must have an avatar URL');
  }
});

test('manan profile contains required fields matching screenshot 2', () => {
  const manan = db.getArtisanBySlug('manan');
  assert.ok(manan !== null, 'Manan should be found by slug');
  assert.strictEqual(manan.business_name, 'Manan');
  assert.strictEqual(manan.craft_specialty, 'Pottery & Ceramics');
  assert.strictEqual(manan.region, 'Rajasthan');
  assert.strictEqual(manan.years_of_experience, 4);
  assert.strictEqual(manan.verified_at, '2026-05-17');
  assert.strictEqual(manan.verification_status, 'guild_verified');

  // Verify Manan has published products
  const { products } = db.getProducts({ artisanId: manan.id });
  assert.strictEqual(products.length, 1, 'Manan should have 1 published product as in screenshot 2');
  assert.strictEqual(products[0].craft_type, 'Wheel-Thrown Stoneware Pottery');
});

test('artisan products are correctly linked to artisanId', () => {
  const artisans = db.getArtisans();
  for (const artisan of artisans) {
    const { products } = db.getProducts({ artisanId: artisan.id });
    for (const p of products) {
      assert.strictEqual(p.artisan_id, artisan.id, 'Product artisan_id must match artisan');
    }
  }
});
