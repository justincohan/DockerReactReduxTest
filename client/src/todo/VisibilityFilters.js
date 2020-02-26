import React from "react";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import { setFilter } from "./todoActions";
import { VISIBILITY_FILTERS } from "../constants";

const VisibilityFilters = () => {
  const dispatch = useDispatch();
  let activeFilter = useSelector(state => {
    return state.visibilityFilter;
  });

  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "filter",
              currentFilter === activeFilter && "filter--active"
            )}
            onClick={() => {
              dispatch(setFilter(currentFilter));
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

export default VisibilityFilters;
