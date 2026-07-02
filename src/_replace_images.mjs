import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('./data.ts', import.meta.url).pathname;
let content = readFileSync(filePath, 'utf-8');
const originalContent = content;

// ============================================================
// CATEGORY IMAGE MAPPING (by category id)
// ============================================================
const categoryImageMap = {
  'almonds': '/dry-fruits-img/almonds.jpg',
  'cashews': '/dry-fruits-img/kaju-dry-fruits.jpg',
  'pistachios': '/dry-fruits-img/pista.jpg',
  'walnuts': '/dry-fruits-img/almonds.jpg',
  'raisins': '/dry-fruits-img/kishmish.jpg',
  'dates': '/dry-fruits-img/kaju-dry-fruits.jpg',
  'seeds': '/dry-fruits-img/almonds.jpg',
  'gift-boxes': '/dry-fruits-img/kaju-dry-fruits.jpg',
};

// ============================================================
// STEP 1: Replace categories[] image fields
// ============================================================
// Each category block looks like:
//   id: "almonds",
//   ...
//   image: "https://...",
content = content.replace(
  /(export const categories: Category\[\] = \[)([\s\S]*?)(\];)/,
  (match, prefix, body, suffix) => {
    let newBody = body;
    for (const [catId, localImg] of Object.entries(categoryImageMap)) {
      // Match: id: "catId", ... image: "..."
      const catRegex = new RegExp(
        `(id:\\s*"${catId}"[\\s\\S]*?image:\\s*)"[^"]*"`,
        'g'
      );
      newBody = newBody.replace(catRegex, `$1"${localImg}"`);
    }
    return prefix + newBody + suffix;
  }
);

// ============================================================
// STEP 2: Replace products[] image + gallery fields
// ============================================================
// Each product has category: "xxx", ... image: "...", gallery: ["...", "..."]
// We process each product block individually
content = content.replace(
  /(export const products: Product\[\] = \[)([\s\S]*?)(\];)/,
  (match, prefix, body, suffix) => {
    let newBody = body;
    
    // Split by product objects - find each { ... } block
    // We'll use a different approach: find each category + image/gallery combo
    for (const [catId, localImg] of Object.entries(categoryImageMap)) {
      // For products with this category, replace image field
      // Pattern: category: "catId", ... image: "https://..."
      // We need to be careful to only match within the same product object
      
      // Replace image fields for products of this category
      const imgRegex = new RegExp(
        `(category:\\s*"${catId}"[\\s\\S]*?image:\\s*)"https?://[^"]*"`,
        'g'
      );
      
      // We need a non-greedy approach that doesn't cross product boundaries
      // Let's use a different strategy: find all product blocks
    }
    
    // Better approach: split products by their opening pattern and process each
    const productBlocks = [];
    let remaining = newBody;
    const productPattern = /(\s*\/\/[^\n]*\n)?\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    
    // Actually, let's just do line-by-line processing
    const lines = newBody.split('\n');
    let currentCategory = null;
    
    for (let i = 0; i < lines.length; i++) {
      const catMatch = lines[i].match(/category:\s*"([^"]+)"/);
      if (catMatch) {
        currentCategory = catMatch[1];
      }
      
      if (currentCategory && categoryImageMap[currentCategory]) {
        const localImg = categoryImageMap[currentCategory];
        
        // Replace image field
        if (lines[i].match(/^\s*image:\s*"https?:\/\//)) {
          lines[i] = lines[i].replace(/"https?:\/\/[^"]*"/, `"${localImg}"`);
        }
        
        // Replace gallery URLs
        if (lines[i].match(/^\s*"https?:\/\/images\.unsplash/)) {
          lines[i] = lines[i].replace(/"https?:\/\/[^"]*"/, `"${localImg}"`);
        }
      }
      
      // Reset category when we hit a closing brace at product level
      if (lines[i].match(/^\s*\},?\s*$/) && currentCategory) {
        // Check if this is a product-level close (not nested)
        // Simple heuristic: if next non-empty line starts a new product or comment
      }
    }
    
    newBody = lines.join('\n');
    return prefix + newBody + suffix;
  }
);

// ============================================================
// STEP 3: Replace blog image URLs (lines ~1067-1071)
// ============================================================
content = content.replace(
  /image:\s*\[\s*\n\s*"https:\/\/images\.unsplash\.com\/photo-1508061253366-f7da158b6d46\?[^"]*",\s*\n\s*"https:\/\/images\.unsplash\.com\/photo-1608039829572-78524f79c4c7\?[^"]*",\s*\n\s*"https:\/\/images\.unsplash\.com\/photo-1596547609652-9cf5d8d76921\?[^"]*"\s*\n\s*\]/,
  `image: [
      "/dry-fruits-img/almonds.jpg",
      "/dry-fruits-img/kaju-dry-fruits.jpg",
      "/dry-fruits-img/pista.jpg"
    ]`
);

// ============================================================
// STEP 4: DO NOT touch testimonials (avatar URLs) - they don't have unsplash product URLs
// ============================================================

// ============================================================
// STEP 5: Replace festivalCollections[] image fields
// ============================================================
const festivalMap = {
  'fest-diwali': '/dry-fruits-img/kaju-dry-fruits.jpg',
  'fest-rakhi': '/dry-fruits-img/almonds.jpg',
  'fest-wedding': '/dry-fruits-img/pista.jpg',
  'fest-corporate': '/dry-fruits-img/kaju-dry-fruits.jpg',
  'fest-birthday': '/dry-fruits-img/kishmish.jpg',
  'fest-eid': '/dry-fruits-img/almonds.jpg',
};

content = content.replace(
  /(export const festivalCollections: FestivalCollection\[\] = \[)([\s\S]*?)(\];)/,
  (match, prefix, body, suffix) => {
    let newBody = body;
    for (const [festId, localImg] of Object.entries(festivalMap)) {
      const regex = new RegExp(
        `(id:\\s*"${festId}"[\\s\\S]*?image:\\s*)"[^"]*"`,
        'g'
      );
      newBody = newBody.replace(regex, `$1"${localImg}"`);
    }
    return prefix + newBody + suffix;
  }
);

// ============================================================
// STEP 6: Replace corporateGiftPackages[] image fields
// ============================================================
const corpMap = {
  'corp-bronze': '/dry-fruits-img/almonds.jpg',
  'corp-silver': '/dry-fruits-img/kaju-dry-fruits.jpg',
  'corp-gold': '/dry-fruits-img/pista.jpg',
};

content = content.replace(
  /(export const corporateGiftPackages: CorporateGiftPackage\[\] = \[)([\s\S]*?)(\];)/,
  (match, prefix, body, suffix) => {
    let newBody = body;
    for (const [corpId, localImg] of Object.entries(corpMap)) {
      const regex = new RegExp(
        `(id:\\s*"${corpId}"[\\s\\S]*?image:\\s*)"[^"]*"`,
        'g'
      );
      newBody = newBody.replace(regex, `$1"${localImg}"`);
    }
    return prefix + newBody + suffix;
  }
);

// ============================================================
// Write back
// ============================================================
writeFileSync(filePath, content, 'utf-8');

// Count replacements
const originalUrls = (originalContent.match(/https:\/\/images\.unsplash\.com/g) || []).length;
const remainingUrls = (content.match(/https:\/\/images\.unsplash\.com/g) || []).length;
console.log(`Total Unsplash URLs in original: ${originalUrls}`);
console.log(`Remaining Unsplash URLs (testimonial avatars): ${remainingUrls}`);
console.log(`URLs replaced: ${originalUrls - remainingUrls}`);
