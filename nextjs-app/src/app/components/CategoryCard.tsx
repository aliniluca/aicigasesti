import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import SubcategoryMenu from './Subcategory';

interface Subcategory {
  name: string;
  slug: string;
}

interface CategoryCardProps {
  name: string;
  slug: string;
  iconPath: string;
  subcategories: Subcategory[];
  isExpanded: boolean;
  onToggle: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, slug, iconPath, subcategories, isExpanded, onToggle }) => {
  return (
    <div className="card mb-4">
      <div className="card-body" onClick={onToggle} style={{ cursor: 'pointer' }}>
        <img src={iconPath} alt={name} className="category-icon" />
        <h5 className="card-title">{name}</h5>
      </div>
      {isExpanded && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href={`/category/${slug}`}>All in {name}</a>
          </li>
          {subcategories.map((subcategory) => (
            <li key={subcategory.slug} className="list-group-item">
              <a href={`/category/${slug}/${subcategory.slug}`}>{subcategory.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryCard;



