import styled from 'styled-components';
import Slider from 'react-slick';
import PaperCard from '@/components/PaperCard/PaperCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { paperCardSettings } from '@/util/carousel.jsx';

function RollingPaperList() {
  // const slickRef = useRef();
  //
  // const prev = useCallback(() => slickRef.current.slickPrev(), []);
  // const next = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <Div>
      <PaperListContainer>
        {/*<PaperListSlide>*/}
        {/*  {[1, 2, 3, 4, 5].map((num) => (*/}
        {/*    <PaperCard number={num} key={num} />*/}
        {/*  ))}*/}
        {/*</PaperListSlide>*/}
        <PaperListSlider {...paperCardSettings}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <PaperCard number={num} key={num} />
          ))}
        </PaperListSlider>
        {/*<NextArrow onClick={next} />*/}
        {/*<PrevArrow onClick={prev} />*/}
      </PaperListContainer>
    </Div>
  );
}

export default RollingPaperList;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaperListContainer = styled.div`
  width: 100%;

  @media (min-width: 1248px) {
    width: 116rem;
  }
`;

const PaperListSlider = styled(Slider)`

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const PaperListSlide = styled.div`
  display: flex;
  gap: 1.2rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:first-child {
    padding-left: 2rem;
  }

  &:last-child {
    padding-right: 2rem;
  }

  @media (min-width: 768px) {
    gap: 2rem;

    &:first-child {
      padding-left: 2.4rem;
    }

    &:last-child {
      padding-right: 2.4rem;
    }
  }

  @media (min-width: 1248px) {
    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;
