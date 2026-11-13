import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useLang } from "@/context/LangContext.jsx";
import { useAllItems } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { Empty, ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";

const PAGE_SIZE = 24;

export default function GalleryCharacters() {
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useAllItems("characters");

  const withImages = useMemo(
    () => (data || []).filter((item) => item.image || item.image2),
    [data]
  );
  const pageItems = withImages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Seo title={t("gallery.title")} />
      <Frame label="PAGE: GALLERY/CHARACTER">
        <h1 className="home__sectionTitle">{t("gallery.title")}</h1>
        {isLoading && <Loading label={t("list.loadingAll")} />}
        {isError && <ErrorState error={error} />}
        {!isLoading && !isError && withImages.length === 0 && <Empty />}
        {!isLoading && !isError && withImages.length > 0 && (
          <>
            <div className="cardGrid cardGrid--gallery">
              {pageItems.map((item) => (
                <Link key={item.id} className="galleryCard" to={`/characters/${item.slug}`}>
                  <SafeImage
                    src={item.image || item.image2}
                    fallback={placeholders.character}
                    alt={item.name}
                  />
                  <div className="galleryCard__name">{item.name}</div>
                </Link>
              ))}
            </div>
            {withImages.length > PAGE_SIZE && (
              <div className="pager">
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={withImages.length}
                  showSizeChanger={false}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Frame>
    </>
  );
}
