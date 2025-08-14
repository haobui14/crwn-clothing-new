import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchCategoriesStart } from "../../store/categories/categories.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { ShopPageContainer } from "./shop.styles";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <ShopPageContainer>
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    </ShopPageContainer>
  );
};

export default Shop;
