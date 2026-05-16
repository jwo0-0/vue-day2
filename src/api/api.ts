import gameData from '@/mocks/gameData.json';
import type { Deck } from '@/types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mainApi = {
  /**
   * 전체 메타 덱 리스트 조회
   */
  getMetaList: async (): Promise<Deck[]> => {
    try {
      await sleep(100);
      const data = gameData as Deck[]; 
      
      return data;
    } catch (error) {
      console.error('메타 데이터를 불러오는 중 오류 발생:', error);
      return [];
    }
  },

  /**
   * 전체 캐릭터 정보
   */
  getInfoList: async (): Promise<Deck[]> => {
    try {
      const data = gameData as Deck[];
      
      return data;
    } catch (error) {
      console.error('메타 데이터를 불러오는 중 오류 발생:', error);
      return [];
    }
  },
  
  /**
   * 특정 ID 조회
   */
  getMetaById: async (id: number): Promise<Deck | undefined> => {
    try {
      const list = await mainApi.getMetaList();
      return list.find((item) => item.id === id);
    } catch (error) {
      console.error(`${id}번 데이터를 찾는 중 오류 발생:`, error);
      return undefined;
    }
  }
};