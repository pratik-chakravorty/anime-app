import { useDispatch, useSelector } from "react-redux";

export function useDataLoader(actionCreator, id) {
  const dispatch = useDispatch();
  const { animes, isLoading, pageCount, showMoreLoading } = useSelector(
    state => state.animeState
  );
  const handleShowMore = () => {
    if (!id) {
      dispatch(actionCreator(pageCount, true));
    } else {
      dispatch(actionCreator(id, pageCount, true));
    }
  };

  return [handleShowMore, animes, isLoading, showMoreLoading];
}
