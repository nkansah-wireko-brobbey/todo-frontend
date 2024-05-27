import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxStore.hooks";
import { fetchCategories } from "@/store/reducers/category.slice";

export const useFetchCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.data) || [];

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return categories;
};
