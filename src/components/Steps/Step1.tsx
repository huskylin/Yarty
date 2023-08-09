import { TbPlaylistAdd } from 'react-icons/tb';
import { FlexContainer, OptionText, Option } from './style';
import { BiImport } from 'react-icons/bi';

export const step1 = (create: any, load: any) => {
  return (
    <>
      <FlexContainer>
        <Option onClick={create}>
          <OptionText>
            <TbPlaylistAdd />
            新建清單
          </OptionText>
        </Option>
        <Option onClick={load}>
          <OptionText>
            <BiImport />
            匯入至已有清單
          </OptionText>
        </Option>
      </FlexContainer>
    </>
  );
};
