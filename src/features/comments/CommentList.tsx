import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FormStateType } from '../../App';
import { FIRST_PAGE } from '../../constants';
import { CommentState, useDeleteCommentByIdMutation } from '../api/apiSlice';

interface CommentProps {
  comments?: CommentState[];
  setPage: Dispatch<SetStateAction<number>>;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
}

export default function CommentList({ comments, setPage, setFormState }: CommentProps) {
  const [deleteCommentById] = useDeleteCommentByIdMutation();

  const handleCommentUpdate = (comment: CommentState) => {
    setFormState(() => ({ ...comment }));
  };

  const handleCommentDelete = (id: unknown) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentById(id as Pick<CommentState, 'id'>);
      setPage(FIRST_PAGE);
    }
  };
  return (
    <>
      {comments?.map((comment: CommentState) => (
        <Comment key={comment.id}>
          <img src={comment.profile_url} alt="" />

          {comment.author}

          <CreatedAt>{comment.createdAt}</CreatedAt>

          <Content>{comment.content}</Content>

          <ButtonsWrapper>
            <button onClick={() => handleCommentUpdate(comment)}>수정</button>
            <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
          </ButtonsWrapper>

          <hr />
        </Comment>
      ))}
    </>
  );
}

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;
  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const ButtonsWrapper = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
