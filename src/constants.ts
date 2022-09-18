export const FIRST_PAGE = 1;

export const INITIAL_LIMIT = 5;

export const INITITIAL_FORM_STATE = {
  profile_url: 'https://picsum.photos/id/1/50/50',
  author: '',
  content: '',
};

export const FORM_INPUTS = [
  {
    _id: 1,
    name: 'profile_url',
    type: 'url',
    placeholder: 'https://picsum.photos/id/__id__/50/50',
    label: '프로필 이미지',
    required: true,
  },
  {
    _id: 2,
    name: 'author',
    type: 'text',
    placeholder: '작성자',
    label: '작성자',
    required: true,
  },
  {
    _id: 3,
    name: 'content',
    type: 'textfield',
    placeholder: '내용',
    label: '내용',
    required: true,
  },
];
