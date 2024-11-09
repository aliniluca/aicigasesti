'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/utils/axiosApiRequest';
import AdCard from '@/app/components/AdCard';
import { Spinner, Row, Col, Alert } from 'react-bootstrap';

interface Media {
  b64: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  mediaData: Media[];
}

const SubcategoryAdsPage: React.FC = () => {
  const params = useParams();
  const { categorySlug, subcategorySlug } = params;
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      if (!categorySlug || !subcategorySlug) {
        setError('Invalid category or subcategory.');
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/ads/category/${categorySlug}/subcategory/${subcategorySlug}`,
        });
        setAds(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching ads.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [categorySlug, subcategorySlug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading ads...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h1 className="my-4">
        Ads in Subcategory: {typeof subcategorySlug === 'string' ? subcategorySlug.replace(/-/g, ' ') : ''}
      </h1>
      <Row>
        {ads.length > 0 ? (
          ads.map(ad => (
            <Col md={4} key={ad.id}>
              <AdCard ad={ad} />
            </Col>
          ))
        ) : (
          <p>No ads found in this subcategory.</p>
        )}
      </Row>
    </div>
  );
};

export default SubcategoryAdsPage; 