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
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, slug, iconPath, subcategories }) => {
  return (
    <Link href={`/category/${slug}`} passHref className="text-decoration-none">
      <Card className="mb-4 text-center h-100">
        <Card.Body className="d-flex flex-column justify-content-center">
          <Image src={iconPath} alt={name} width={64} height={64} className="mx-auto" />
          <Card.Title className="mt-3">{name}</Card.Title>
          <SubcategoryMenu subcategories={subcategories.map(sub => sub.slug)} />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CategoryCard;



