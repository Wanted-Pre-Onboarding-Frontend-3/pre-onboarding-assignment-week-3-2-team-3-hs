import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

interface PageListProps {
  totalPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function PageList({ totalPage, page, setPage }: PageListProps) {
  const pageArray = [...Array(totalPage)].map((_, i) => i + 1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    setPage(page);
  };
  return (
    <PageListStyle>
      {pageArray.map((pageIdx) => (
        <Page key={pageIdx} onClick={(e) => handleClick(e, pageIdx)} active={pageIdx === page}>
          {pageIdx}
        </Page>
      ))}
    </PageListStyle>
  );
}

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const ActivePage = css`
  background: gray;
  color: #fff;
`;

const Page = styled.button<{ active?: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) => active && ActivePage}
  margin-right: 3px;
`;
