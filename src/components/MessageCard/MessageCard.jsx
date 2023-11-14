import { useCallback } from 'react';
import { deleteMessage } from '@/api/message';
import Badge from '@/components/MessageCard/Badge.jsx';
import {
  Author,
  AuthorFrom,
  AuthorTitle,
  AuthorWrapper,
  DeleteBox,
  DeleteImg,
  MessageBody,
  MessageCardProfile,
  MessageCardTop,
  MessageCardWrapper,
  MessageDate,
  ProfileImage,
  ProfileImageWrapper,
} from '@/components/MessageCard/MessageCard.style.jsx';
import deleteIcon from '@/assets/icons/deleted.svg';
import { FONT_PALETTE } from '@/util/font.jsx';

function MessageCard({ value, isEdit }) {
  const { id, profileImageURL, sender, relationship, content, font, createdAt } = value;
  const fontFamily = FONT_PALETTE[font];

  const handleDelete = useCallback(async () => {
    const deleteId = await deleteMessage({ messageId: id });
  }, [id]);

  return (
    <MessageCardWrapper>
      <MessageCardTop>
        {isEdit && (
          <DeleteBox>
            <DeleteImg src={deleteIcon} alt="메시지 카드 삭제 버튼" onClick={handleDelete} />
          </DeleteBox>
        )}
        <MessageCardProfile>
          <ProfileImageWrapper>
            <ProfileImage src={profileImageURL} />
          </ProfileImageWrapper>
          <AuthorWrapper>
            <AuthorTitle>
              <AuthorFrom>From.</AuthorFrom>
              <Author>{sender}</Author>
            </AuthorTitle>
            <Badge relationship={relationship} />
          </AuthorWrapper>
        </MessageCardProfile>
      </MessageCardTop>
      <MessageBody $font={fontFamily}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </MessageBody>
      <MessageDate>{new Date(createdAt).toLocaleDateString()}</MessageDate>
    </MessageCardWrapper>
  );
}

export default MessageCard;
