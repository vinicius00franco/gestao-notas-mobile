import styled from 'styled-components';

export const HorizontalScroller = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-left: 16px;
  padding-bottom: 4px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  & > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  & > *:last-child {
    margin-right: 16px;
  }
`;
