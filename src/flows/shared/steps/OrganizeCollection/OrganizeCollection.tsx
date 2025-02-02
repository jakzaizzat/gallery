import { useCallback, useEffect } from 'react';
import { WizardContext } from 'react-albus';

import { useWizardCallback } from 'contexts/wizard/WizardCallbackContext';
import CollectionEditorProvider, {
  useCollectionMetadataState,
  useStagedItemsState,
} from 'contexts/collectionEditor/CollectionEditorContext';
import { useModal } from 'contexts/modal/ModalContext';
import useUpdateCollectionNfts from 'hooks/api/collections/useUpdateCollectionNfts';
import {
  useCollectionWizardActions,
  useCollectionWizardState,
} from 'contexts/wizard/CollectionWizardContext';
import { useWizardId } from 'contexts/wizard/WizardDataProvider';
import CollectionEditor from './Editor/CollectionEditor';
import CollectionCreateOrEditForm from './CollectionCreateOrEditForm';
import { useTrack } from 'contexts/analytics/AnalyticsContext';

type ConfigProps = {
  push: WizardContext['push'];
};

function useWizardConfig({ push }: ConfigProps) {
  const { setOnNext, setOnPrevious } = useWizardCallback();
  const { showModal } = useModal();
  const wizardId = useWizardId();

  const stagedItems = useStagedItemsState();

  const updateCollection = useUpdateCollectionNfts();
  const { collectionIdBeingEdited } = useCollectionWizardState();
  const { setCollectionIdBeingEdited } = useCollectionWizardActions();

  const collectionMetadata = useCollectionMetadataState();

  const goToOrganizeGalleryStep = useCallback(() => {
    // Clear selected collection when moving to next step
    setCollectionIdBeingEdited('');
    push('organizeGallery');
  }, [push, setCollectionIdBeingEdited]);

  const track = useTrack();

  useEffect(() => {
    // If collection is being edited, trigger update
    if (collectionIdBeingEdited) {
      setOnNext(async () => {
        // Errors will be handled in the catch block within `WizardFooter.tsx`
        try {
          await updateCollection(collectionIdBeingEdited, stagedItems, collectionMetadata.layout);
        } catch {
          // TODO: display error toast here
        }

        goToOrganizeGalleryStep();
      });

      setOnPrevious(goToOrganizeGalleryStep);
      return;
    }

    // If collection is being created, trigger creation
    setOnNext(async () => {
      track('Save new collection button clicked');
      showModal(
        <CollectionCreateOrEditForm
          onNext={goToOrganizeGalleryStep}
          stagedItems={stagedItems}
          layout={collectionMetadata.layout}
        />
      );
    });

    // If user is editing their gallery, clicking "back" should bring them
    // back to the organize gallery view
    if (wizardId === 'edit-gallery') {
      setOnPrevious(goToOrganizeGalleryStep);
    }
  }, [
    collectionIdBeingEdited,
    goToOrganizeGalleryStep,
    setOnNext,
    setOnPrevious,
    showModal,
    updateCollection,
    wizardId,
    collectionMetadata,
    stagedItems,
    track,
  ]);
}

// In order to call `useWizardConfig`, component must be under `CollectionEditorProvider`
type DecoratedCollectionEditorProps = {
  push: WizardContext['push'];
};

function DecoratedCollectionEditor({ push }: DecoratedCollectionEditorProps) {
  useWizardConfig({ push });

  return <CollectionEditor />;
}

function OrganizeCollectionWithProvider({ push }: WizardContext) {
  return (
    <CollectionEditorProvider>
      <DecoratedCollectionEditor push={push} />
    </CollectionEditorProvider>
  );
}

export default OrganizeCollectionWithProvider;
