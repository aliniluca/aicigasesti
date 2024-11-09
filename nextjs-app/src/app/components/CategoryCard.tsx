import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'react-bootstrap';

interface CategoryCardProps {
  name: string;
  slug: string;
  iconPath: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, slug, iconPath }) => {
  return (
    <Link href={`/category/${slug}`} passHref className="text-decoration-none">
      <Card className="mb-4 text-center h-100">
        <Card.Body className="d-flex flex-column justify-content-center">
          <Image src={iconPath} alt={name} width={64} height={64} className="mx-auto" />
          <Card.Title className="mt-3">{name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CategoryCard;



