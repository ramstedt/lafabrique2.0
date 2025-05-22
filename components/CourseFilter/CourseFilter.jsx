import styles from './CourseFilter.module.css';

const CourseFilter = ({ selectedCategory, setSelectedCategory, events }) => {
  const categories = [
    'Alla',
    ...new Set(events.map((event) => event.category)),
  ];

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor='categoryFilter'>
        <strong>Filtrera efter kategori:</strong>
      </label>
      <select
        id='categoryFilter'
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseFilter;
