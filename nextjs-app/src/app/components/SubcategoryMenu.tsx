import React from 'react';

interface Subcategory {
  name: string;
  slug: string;
}

interface SubcategoryMenuProps {
  subcategories: Subcategory[];
}

const SubcategoryMenu: React.FC<SubcategoryMenuProps> = ({ subcategories }) => {
  return (
    <ul>
      {subcategories.map((sub) => (
        <li key={sub.slug}>{sub.name}</li>
      ))}
    </ul>
  );
};

export default SubcategoryMenu; 