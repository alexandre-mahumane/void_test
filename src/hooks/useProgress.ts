import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slice/slice";
import { RootState, AppDispatch } from "../redux/store";

const useProgresso = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sectors, areas, progresso, analytics, loading, error } = useSelector(
    (state: RootState) => state.progressoReducer
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { sectors, areas, progresso, analytics, loading, error };
};

export default useProgresso;
