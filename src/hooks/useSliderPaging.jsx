// src/hooks/useSliderPaging.js
import { useState, useMemo, useCallback } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';

export function useSliderPaging({ totalItems, pageSize }) {
  // deviceType을 통한 데스크톱 여부 감지
  const deviceType = useDeviceType();
  const isDesktop = deviceType === 'desktop';

  // 2) 페이지 인덱스 관리
  const [pageIndex, setPageIndex] = useState(0);
  const totalPage = useMemo(
    () => Math.max(0, Math.ceil(totalItems / pageSize) - 1),
    [totalItems, pageSize],
  );

  // 3) 이전/다음 버튼 활성화 여부
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPage;

  // 4) 페이지 이동 함수
  const goPrev = useCallback(() => {
    if (canPrev) setPageIndex((idx) => idx - 1);
  }, [canPrev]);

  const goNext = useCallback(() => {
    // 항상 페이지 인덱스를 1 증가
    setPageIndex((idx) => idx + 1);
  }, []);
  return { isDesktop, pageIndex, totalPage, canPrev, canNext, goPrev, goNext };
}
