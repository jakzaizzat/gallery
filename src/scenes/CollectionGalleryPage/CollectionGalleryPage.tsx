import breakpoints, { pageGutter } from 'components/core/breakpoints';
import Page from 'components/core/Page/Page';
import styled from 'styled-components';
import Head from 'next/head';
import CollectionGallery from './CollectionGallery';
import useBackButton from 'hooks/useBackButton';
import ActionText from 'components/core/ActionText/ActionText';
import { useEffect } from 'react';
import { useTrack } from 'contexts/analytics/AnalyticsContext';
import StyledBackLink from 'components/NavbarBackLink/NavbarBackLink';

type CollectionGalleryPageProps = {
  username: string;
  collectionId: string;
};

function CollectionGalleryPage({ collectionId, username }: CollectionGalleryPageProps) {
  const headTitle = `${username} | Gallery`;
  const handleBackClick = useBackButton({ username });

  const track = useTrack();

  useEffect(() => {
    track('Page View: Collection', {
      username,
      collectionId,
    });
  }, [username, collectionId, track]);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Page>
        <StyledCollectionGalleryWrapper>
          <StyledBackLink>
            <ActionText onClick={handleBackClick}>← Back to Gallery</ActionText>
          </StyledBackLink>
          <CollectionGallery collectionId={collectionId} />
        </StyledCollectionGalleryWrapper>
      </Page>
    </>
  );
}

const StyledCollectionGalleryWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 ${pageGutter.mobile}px;

  @media only screen and ${breakpoints.tablet} {
    margin: 0 ${pageGutter.tablet}px;
  }
`;

export default CollectionGalleryPage;
