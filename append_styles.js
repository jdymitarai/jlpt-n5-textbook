const fs = require('fs');

const cssToAdd = `
/* =========================================
   Counters (數字與量詞) Styles
   ========================================= */
.counters-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
}

.counter-section {
  background: var(--surface-light);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  border: 1px solid var(--border-color);
}

[data-theme='dark'] .counter-section {
  background: var(--surface-dark);
}

.counter-header {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-light);
}

.counter-header h2 {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

[data-theme='dark'] .counter-header h2 {
  color: var(--text-dark);
}

.counter-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.counter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.counter-card {
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

[data-theme='dark'] .counter-card {
  background: var(--background-dark);
}

.counter-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.counter-num {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.counter-kanji {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

[data-theme='dark'] .counter-kanji {
  color: var(--text-dark);
}

.counter-furigana {
  font-size: 0.9rem;
  color: var(--primary-color);
}

.counter-romaji {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Irregular pronunciation highlight */
.counter-card.irregular {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.02);
}

[data-theme='dark'] .counter-card.irregular {
  background: rgba(239, 68, 68, 0.05);
}

.counter-card.irregular .counter-furigana {
  color: #ef4444; /* red-500 */
  font-weight: 600;
}
`;

fs.appendFileSync('styles.css', cssToAdd, 'utf8');
console.log('Appended to styles.css');
