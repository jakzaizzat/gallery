import GalleryRoute from 'scenes/_Router/GalleryRoute';
import NftDetailPageScene from 'scenes/NftDetailPage/NftDetailPage';
import { GetServerSideProps } from 'next';
import GalleryRedirect from 'scenes/_Router/GalleryRedirect';
import { MetaTagProps } from 'pages/_app';
import { openGraphMetaTags } from 'utils/openGraphMetaTags';

type NftDetailPageProps = MetaTagProps & {
  nftId?: string;
};

export default function NftDetailPage({ nftId }: NftDetailPageProps) {
  if (!nftId) {
    // Something went horribly wrong
    return <GalleryRedirect to="/" />;
  }

  return <GalleryRoute element={<NftDetailPageScene nftId={nftId} />} footerIsFixed />;
}

export const getServerSideProps: GetServerSideProps<NftDetailPageProps> = async ({ params }) => {
  const username = params?.username ? (params.username as string) : undefined;
  const nftId = params?.nftId ? (params.nftId as string) : undefined;
  return {
    props: {
      nftId,
      metaTags: nftId
        ? openGraphMetaTags({
            title: `${username} | Gallery`,
            previewPath: `/opengraph/nft/${nftId}`,
          })
        : null,
    },
  };
};
