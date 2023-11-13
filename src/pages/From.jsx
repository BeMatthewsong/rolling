import { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FONT24B } from '@/styles/fontType';
import TextInput from '@/styles/input/TextInput';
import PrimaryButton from '@/styles/button/PrimaryButton';
import ProfileSelect from '@/components/Profile/ProfileSelect';
import Dropdown from '@/components/Dropdown/Dropdown';
import TextEditor from '@/components/TextEditor/TextEditor';
import { sendMessage } from '@/api/message';
import useAsync from '@/hooks/useAsync';
import { getProfileImages } from '@/api/profileImage';

const imageMockData = {
  imageUrls: [
    'https://fastly.picsum.photos/id/268/100/100.jpg?hmac=eqOIwP24u5Z5zeRyWxuRm-47F6O4HGh_2t7ydnCLB1g',
    'https://fastly.picsum.photos/id/522/100/100.jpg?hmac=qAjkBTDli2R3PAxAqv8HwfHWmdQskKVWNSDktu4tmHw',
    'https://fastly.picsum.photos/id/494/100/100.jpg?hmac=VY3bkvgk7NyiVsjLJ0_OBS_e_LWCFTrPEvndz6syOFQ',
    'https://fastly.picsum.photos/id/1064/100/100.jpg?hmac=ctylrOJlV6YpNYdxeSheUqNNZD7goTpAQjnF_ubkrPw',
    'https://fastly.picsum.photos/id/571/100/100.jpg?hmac=-fQ3pFGoTNXsXIgWPhYe3lTadQTWlLh5J1Xzc9vmlQE',
    'https://fastly.picsum.photos/id/866/100/100.jpg?hmac=ci1nxrYzr9SaVQenyuqBybKgVslILw_KRPf-cZjq4yg',
    'https://fastly.picsum.photos/id/437/100/100.jpg?hmac=-YlB-diqK8qqcHK263TJ4YfCVbAlzbaLJECUuGfg55s',
    'https://fastly.picsum.photos/id/1082/100/100.jpg?hmac=0rTbHjwuEo-KpMp2E4aCa2JWXFT_FPh6cqJwhTxcZl4',
    'https://fastly.picsum.photos/id/859/100/100.jpg?hmac=6QkQ5r5_o7xGLBIk04B6BGnYhczjRVVUHfgwEZBCtyk',
    'https://fastly.picsum.photos/id/547/100/100.jpg?hmac=GzEraiphe5k-m_Ika-BtHcx4xDxuRPW2LTQFzHjAyy4',
  ],
};

const INIT_MESSAGE = {
  sender: '',
  relationship: '지인',
  content: '',
  font: 'Noto Sans',
  profileImageURL: '',
};

function From() {
  const [postValue, setPostValue] = useState(INIT_MESSAGE);
  const [isValidForm, setIsValidForm] = useState(false);
  const [, , sendMessageAsync] = useAsync(sendMessage);
  const [, , getProfileImagesAsync] = useAsync(getProfileImages);

  const postResponse = useCallback(
    async (value) => {
      const response = await sendMessageAsync(value);
    },
    [sendMessageAsync],
  );

  const getProfile = useCallback(
    async (value) => {
      const response = await getProfileImagesAsync(value);
      console.log(response);
      return response;
    },
    [getProfileImagesAsync],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm) {
      postResponse(postValue);
    }
  };

  const preventSubmitKeyDownEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const getPostValue = (value) => {
    setPostValue((prev) => ({ ...prev, sender: value }));
  };

  useEffect(() => {
    const imageDatas = getProfile();
  }, []);

  return (
    <FromContainer>
      <Form onSubmit={handleSubmit} onKeyDown={preventSubmitKeyDownEnter}>
        <Section>
          <Title>From.</Title>
          <TextInput setIsValidForm={setIsValidForm} getPostValue={getPostValue} />
        </Section>
        <Section>
          <Title>프로필 이미지</Title>
          <ProfileSelect imageData={imageMockData} setPostValue={setPostValue} />
        </Section>
        <Section>
          <Title>상대와의 관계</Title>
          <Dropdown selectOption="relationship" setPostValue={setPostValue} />
        </Section>
        <Section>
          <Title>내용을 입력해 주세요</Title>
          <TextEditor setPostValue={setPostValue} />
        </Section>
        <Section>
          <Title>폰트 선택</Title>
          <Dropdown selectOption="font" setPostValue={setPostValue} />
        </Section>
        <Button type="submit">생성하기</Button>
      </Form>
    </FromContainer>
  );
}

export default From;

const FromContainer = styled.div`
  position: relative;
  padding: 5rem 2rem 2.4rem 2rem;
  max-width: 76.8rem;
  margin: 0 auto;
`;

const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  ${FlexColumn};
  width: 100%;
  gap: 5rem;
  margin: 0 auto;
`;

const Section = styled.div`
  ${FlexColumn};
  align-items: flex-start;
  gap: 1.2rem;
`;

const Title = styled.div`
  ${FONT24B};
  color: var(--gray-900, #181818);
`;

const Button = styled(PrimaryButton)`
  margin-top: 16rem;
`;
