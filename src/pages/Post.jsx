import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostHeader from '@/components/Header/PostHeader.jsx';
import PlusMessageCard from '@/components/MessageCard/PlusMessageCard';
import MessageCard from '@/components/MessageCard/MessageCard';
import { getRecipientsId } from '@/api/recipients';
import { BACKGROUND_COLOR_PALETTE } from '@/util/backgroundColors.jsx';

function Post() {
  const [postName, setPostName] = useState('');
  const [postMessageCount, setPostMessageCount] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [messageContents, setMessageContents] = useState();
  const [background, setBackground] = useState('var(--orange-200, #ffe2ad)');
  const [hasNext, sethasNext] = useState(false);
  const [offset, setOffset] = useState(8);
  const observerRef = useRef(null);
  const { recipientId } = useParams();

  const handleRollingPaper = useCallback(async () => {
    const results = await getRecipientsId({ id: recipientId });
    const { name, messageCount, backgroundColor, backgroundImageURL, topReactions } = { ...results };
    const { color } = BACKGROUND_COLOR_PALETTE[backgroundColor];
    const recentMessages = [...results.recentMessages];

    handlePostHeader(name, messageCount, topReactions, recentMessages);

    setMessageContents(recentMessages);
    setBackground({ color, backgroundImageURL });
  }, [recipientId]);

  const io = new IntersectionObserver((entries) => {
    console.log(entries);
  });

  useEffect(() => {
    handleRollingPaper();
    io.observe(observerRef.current);
  }, [handleRollingPaper]);

  const handlePostHeader = (name, messageCount, topReactions, recentMessages) => {
    setPostName(name);
    setPostMessageCount(messageCount);
    setReactions([...topReactions].slice(0, 3));
    const recentPostProfileImages =
      recentMessages.length === 0 ? [] : recentMessages.map((message) => message.profileImageURL).slice(0, 3);
    setProfileImages(recentPostProfileImages);
  };

  return (
    <>
      <PostHeader name={postName} messageCount={postMessageCount} reactions={reactions} profileImages={profileImages} />
      <PostContainer $backgroundColor={background.color} $imageUrl={background.backgroundImageURL}>
        <PlusMessageCard />
        {messageContents &&
          messageContents.map((messageCard) => <MessageCard value={messageCard} key={messageCard.id} />)}
      </PostContainer>
      <div ref={observerRef}>여기 닿으면</div>
    </>
  );
}

export default Post;

const PostContainer = styled.div`
  padding: 4.2rem 2rem 0;
  display: grid;
  grid-template-columns: repeat(1, 32rem);
  grid-template-rows: repeat(auto-fit, 23rem);
  justify-content: center;
  gap: 2.4rem;
  margin: 0 auto;
  align-items: center;
  height: 100vh;
  background: ${({ $backgroundColor, $imageUrl }) =>
    $imageUrl
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%), url(${$imageUrl})`
      : `${$backgroundColor}`};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 35.4rem);
    grid-template-rows: repeat(auto-fit, 28.4rem);
    gap: 3rem;
    padding: 4.9rem 2.4rem;
  }

  @media (min-width: 1248px) {
    padding: 6rem 2.4rem;
    grid-template-columns: repeat(3, 38.4rem);
    grid-template-rows: repeat(auto-fit, 28rem);
  }
`;
