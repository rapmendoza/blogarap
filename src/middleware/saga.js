import { takeEvery, put } from 'redux-saga/effects';
import { actions } from '../components/Blogs/blogsSlice';
import { delay } from '../utils/helpers';

export function* fetchArticles({ payload }) {
  try {
    yield delay(payload);

    const url = 'https://blogarap-api.herokuapp.com/blogs?_sort=id&_order=desc';
    const data = yield fetch(url)
      .then(response => response.json())
      .then(blogs => blogs);

    yield put(actions.fetchSuccess({ data }));
  } catch (error) {
    yield put(actions.fetchFailure({ error }));
  }
}

export default function* blogsSaga() {
  yield takeEvery(actions.fetch.type, fetchArticles);
}
