import axios from 'axios';
import { DOMAIN_TEAM } from '@/api/Domain.js';

/**
 * 대상에게 보내는 메세지 생성 API
 * @param {number} recipientId - 페이퍼 ID
 * @param {string} sender - 보내는 사람
 * @param {string} relationship - 관계(”친구” | “지인” | “동료” | “가족”)
 * @param {string} content - 메세지 내용
 * @param {string} font - 폰트("Noto Sans” | "Pretendard” | "나눔명조” | "나눔손글씨 손편지체”)
 * @param {string} profileImageURL - 프로필 이미지 URL
 * @returns {Promise<any>}
 */
export async function sendMessage({ recipientId, sender, relationship, content, font, profileImageURL }) {
  try {
    const response = await axios.post(`${DOMAIN_TEAM}/recipients/${recipientId}/messages/`, {
      sender,
      relationship,
      content,
      font,
      profileImageURL,
    });
    return response.data;
  } catch (error) {
    throw new Error('메세지 생성을 실패했습니다.');
  }
}
