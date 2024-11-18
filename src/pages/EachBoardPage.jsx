import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, createLists, deleteLists } from "../features/listSlice";

import CreateComponent from "../components/CreateComponent";
import AllLists from "../components/AllLists";
import Loader from "../components/Loader";

const EachBoardPage = () => {
  const { id } = useParams();
  // console.log(id);
  const { isLoading, listsData, error } = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLists(id));
  }, []);



  const handleCreateList = (listName) => {
    dispatch(createLists({ listName, id }));
    dispatch(fetchLists(id));
  };

  const handleDeleList = (listId) => {
    dispatch(deleteLists(listId))
  };
  let listInfo = listsData[id];

  return (
    <div
      style={{
        backgroundColor: "#eeeeee",
        minHeight: "100vh",
        maxHeight:"100%",
        width: "100vw",
        overflow: "auto",
        marginTop: "3rem",
        backgroundAttachment:"fixed"
      }}
    >
      {isLoading ? (<Loader />) : (
        <>
          <CreateComponent
            prop={{
              onCreate: handleCreateList,
              heading: "Create List",
              label: "List",
              element: "list",
            }}
          />
          {listInfo && <AllLists lists={listInfo} onDelete={handleDeleList} />}
          
        </>
      )}
    </div>
  );
};

export default EachBoardPage;
