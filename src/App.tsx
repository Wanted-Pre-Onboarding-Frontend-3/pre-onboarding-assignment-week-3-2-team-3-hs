import { useState } from 'react';
import { FIRST_PAGE, INITIAL_LIMIT, INITITIAL_FORM_STATE } from './constants';
import { CommentState, useGetCommentsQuery } from './features/api/apiSlice';
import CommentList from './features/comments/CommentList';
import Form from './features/comments/Form';
import PageList from './features/comments/PageList';

export type FormStateType = Partial<CommentState>;

function App() {
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const [formState, setFormState] = useState<FormStateType>(INITITIAL_FORM_STATE);

  const { data: totalComments = [] } = useGetCommentsQuery({});
  const { data: currentComments } = useGetCommentsQuery({ _page: page + '', _limit: limit + '' });
  const totalPage = Math.ceil(totalComments.length / limit);
  return (
    <div>
      <CommentList comments={currentComments} setPage={setPage} setFormState={setFormState} />
      <PageList totalPage={totalPage} page={page} setPage={setPage} />
      <Form formState={formState} setFormState={setFormState} setPage={setPage} />
    </div>
  );
}

export default App;
