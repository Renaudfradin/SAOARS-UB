import React from 'react';
import Link from 'next/link';
import { PaginationMeta } from '@/types';
import './pagination.css';

interface PaginationProps {
  meta: PaginationMeta;
  basePath: string;
  itemName?: string;
}

 export default function Pagination({
  meta,
  basePath,
}: PaginationProps) {
  if (!meta) return null;

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
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
      </div>
    </div>
  );
};