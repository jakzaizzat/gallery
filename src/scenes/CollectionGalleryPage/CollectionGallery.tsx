import { contentSize } from 'components/core/breakpoints';
import styled from 'styled-components';
import Spacer from 'components/core/Spacer/Spacer';
import NotFound from 'scenes/NotFound/NotFound';
import CollectionGalleryHeader from './CollectionGalleryHeader';
import useCollectionById from 'hooks/api/collections/useCollectionById';
import NftGallery from 'components/NftGallery/NftGallery';
import useMobileLayout from 'hooks/useMobileLayout';

type Props = {
  collectionId?: string;
};

function CollectionGallery({ collectionId }: Props) {
  const collection = useCollectionById(collectionId ?? '') ?? null;
  const { mobileLayout, setMobileLayout } = useMobileLayout();

  if (!collection) {
    return <NotFound />;
  }

  return (
    <StyledCollectionGallery>
      <CollectionGalleryHeader
        collection={collection}
        mobileLayout={mobileLayout}
        setMobileLayout={setMobileLayout}
      />
      <Spacer height={80} />
      <NftGallery collection={collection} mobileLayout={mobileLayout} />
    </StyledCollectionGallery>
  );
}

const StyledCollectionGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  max-width: ${contentSize.desktop}px;
`;

export default CollectionGallery;
