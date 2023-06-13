import moment from "moment";
import { useEffect, useState } from "react";
import { Item } from "@/types";

export type IFilterType = "newest" | "oldest" | "a-z" | "z-a";

export const useFilterData = (data: Item[], filterType: IFilterType) => {
  const [filtered, setFiltered] = useState(data);
  const [search, setSearch] = useState("");

  const filterData = (filterType: IFilterType) => {
    let newFiltered = [...data];

    if (search) {
      newFiltered = [...newFiltered].filter((item) => {
        // item is Note
        if ("title" in item) {
          return (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.content.toLowerCase().includes(search.toLowerCase())
          );
        }
        // item is Notebook
        else if ("topics" in item) {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }

        // item is Tag or Topic
        else {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
      });
    }

    switch (filterType) {
      case "newest":
        {
          setFiltered(
            [...newFiltered].sort((a, b) => {
              return moment(b.updatedAt).isAfter(a.updatedAt) ? 1 : -1;
            })
          );
        }
        break;

      case "oldest":
        {
          setFiltered(
            [...newFiltered].sort((a, b) => {
              return moment(a.updatedAt).isAfter(b.updatedAt) ? 1 : -1;
            })
          );
        }
        break;

      case "a-z":
        {
          setFiltered(
            [...newFiltered].sort((a, b) => {
              // item is Note
              if ("title" in a && "title" in b) {
                return a.title.localeCompare(b.title);
              }

              // item is Notebook
              else if ("topics" in a && "topics" in b) {
                return a.name.localeCompare(b.name);
              }

              // item is Tag or Topic
              else if ("notesRef" in a && "notesRef" in b) {
                return a.name.localeCompare(b.name);
              }

              return 1;
            })
          );
        }
        break;

      case "z-a":
        {
          setFiltered(
            [...newFiltered].sort((a, b) => {
              // item is Note
              if ("title" in a && "title" in b) {
                return b.title.localeCompare(a.title);
              }
              // item is Notebook
              else if ("topics" in a && "topics" in b) {
                return b.name.localeCompare(a.name);
              }

              // item is Tag or Topic
              else if ("notesRef" in a && "notesRef" in b) {
                return b.name.localeCompare(a.name);
              }

              return 1;
            })
          );
        }
        break;

      default:
        data;
        break;
    }
  };

  useEffect(() => filterData(filterType), [filterType, data, search]);

  return { filtered, search, setSearch };
};
