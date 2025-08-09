import React from 'react';
import Link from 'next/link';
import { PaginationMeta } from '@/types';
import './pagination.css';

interface PaginationProps {
  meta: PaginationMeta;
  basePath: string;
  itemName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  meta,
  basePath,
  itemName = 'éléments',
}) => {
  if (!meta) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <p>
          Affichage de {meta.from} à {meta.to} sur {meta.total} {itemName}
        </p>
      </div>

      <div className="pagination-controls">
        {meta.current_page > 1 && (
          <Link
            href={`${basePath}?page=${meta.current_page - 1}`}
            className="pagination-btn pagination-prev"
          >
            ←
          </Link>
        )}

        <div className="pagination-numbers">
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={`${basePath}?page=${page}`}
                className={`pagination-btn pagination-number ${
                  page === meta.current_page ? 'active' : ''
                }`}
              >
                {page}
              </Link>
            ),
          )}
        </div>

        {meta.current_page < meta.last_page && (
          <Link
            href={`${basePath}?page=${meta.current_page + 1}`}
            className="pagination-btn pagination-next"
          >
            →
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
