import TextButton, { StyledButtonText } from 'components/core/Button/TextButton';
import colors from 'components/core/colors';
import Spacer from 'components/core/Spacer/Spacer';
import { BodyRegular, Caption } from 'components/core/Text/Text';
import {
  useCollectionEditorActions,
  useCollectionMetadataState,
} from 'contexts/collectionEditor/CollectionEditorContext';
import { useMemo } from 'react';
import styled from 'styled-components';

function ColumnAdjuster() {
  const collectionMetadata = useCollectionMetadataState();
  const { incrementColumns, decrementColumns } = useCollectionEditorActions();

  const columns = useMemo(
    () => collectionMetadata.layout.columns,
    [collectionMetadata.layout.columns]
  );

  return (
    <StyledColumnAdjuster>
      <Caption>COLUMNS</Caption>
      <Spacer width={24} />
      <StyledButtonContainer>
        <StyledColumnButton text="−" onClick={decrementColumns} disabled={columns <= 1} />
        <StyledNumberOfColumns>{columns}</StyledNumberOfColumns>
        <StyledColumnButton text="+" onClick={incrementColumns} disabled={columns > 5} />
      </StyledButtonContainer>
    </StyledColumnAdjuster>
  );
}

const StyledColumnAdjuster = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledColumnButton = styled(TextButton)<{ disabled: boolean }>`
  font-size: 16px;

  // Override default TextButton font size
  ${StyledButtonText} {
    color: ${({ disabled }) => (disabled ? colors.gray20 : colors.gray70)};
    font-size: 20px;
  }
`;
const StyledNumberOfColumns = styled(BodyRegular)`
  padding: 0 8px;
`;

export default ColumnAdjuster;
