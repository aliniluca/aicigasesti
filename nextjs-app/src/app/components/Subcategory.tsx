import React from 'react';

    interface SubcategoryMenuProps {
      subcategories: string[];
    }

    const SubcategoryMenu: React.FC<SubcategoryMenuProps> = ({ subcategories }) => {
      return (
        <ul className="subcategory-menu">
          {subcategories.map(sub => (
            <li key={sub}>{sub}</li>
          ))}
        </ul>
      );
    };

    export default SubcategoryMenu;