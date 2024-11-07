import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, createLists, deleteLists } from "../features/listSlice";

import CreateComponent from "../components/CreateComponent";
import AllLists from "../components/AllLists";

const EachBoardPage = () => {
  const { id } = useParams();
  const { isLoading, listsData, error } = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLists(id));
  }, [dispatch]);

  if (isLoading) {
    return <h2>loadingggg</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const handleCreateList = (listName) => {
    dispatch(createLists({ listName, id }));
  };

  const handleDeleList = (listId) => {
    dispatch(deleteLists(listId));
    dispatch(fetchLists(id));
  };

  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
        marginTop: "3rem",
      }}
    >
      <CreateComponent
        prop={{
          onCreate: handleCreateList,
          heading: "Create List",
          label: "List",
          element: "list",
        }}
      />
      {listsData && <AllLists lists={listsData} onDelete={handleDeleList} />}
    </div>
  );
};

export default EachBoardPage;
