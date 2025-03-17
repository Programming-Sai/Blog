"use client";
import React, { useContext, useState, useEffect } from "react"; 
import DataTable from "react-data-table-component";
import styles from "../../components/blogtable/blogtable.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, } from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";
import Link from "next/link";


const BlogTable = ({ data }) => {


  
  const capitalise = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  };



  const formattedData = data?.map((row, idx)=> {
    return {
      commentId: row?.id,
      thumbnail: row?.user?.image,
      category: capitalise(row?.post?.catSlug),
      comment: row?.desc,
      userName: [row?.user?.name, row?.userEmail],
      post: [row?.post?.title, row?.postSlug]
    }
  });
  const { theme } = useContext(ThemeContext);
  const [records, setRecords] = useState(formattedData);
  
  useEffect(() => {
    setRecords(formattedData);
  }, [data]);
  
  
  const getColumns = () => {
      return [
        {
          name: "User Profile Pic",
          cell: (row) => (  
            <img
              src={`${BASE_PATH}${row?.thumbnail  || '/LinkedInAvatar.png'}`}
              alt={row?.userName[0]}
              className={styles.img}
            />
          ),
          width: "90px",
        },
        {
          name: "Comment",
          selector: (row) => row?.comment,
          sortable: true,
          width: "350px",
        },
        {
          name: "Category",
          selector: (row) => row?.category,
          sortable: true,
          width: "100px",
        },
        {
          name: "User Name",
          cell: (row) => (  
            <Link 
              href={`mailto:${row?.userName[1]}`}
            >
              {row?.userName[0]}
            </Link>
          ),
          sortable: true,
          width: "150px",
        },
        {
          name: "Post",
          cell: (row) => (  
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}${row?.post[1]}#${row?.commentId}`}
              style={{textDecoration:'underline'}}
            >
              {row?.post[0]}
            </Link>
          ),
          sortable: true,
          width: "200px",
        },
        {
          name: "Delete",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <button className={`${styles.button} ${styles.delete}`} onClick={() => deleteComment(row?.commentId)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "200px",
        },
      ];
  };

  const deleteComment = async (id) => {
    if (!id) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`/api/comments?id=${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
  
      // Remove the comment from the state after successful deletion
      setRecords((prevRecords) => prevRecords.filter((comment) => comment.commentId !== id));
  
      alert("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };
  

  const handleSelectedRowsChange = ({ selectedRows }) => {
    console.log("Selected Rows:", selectedRows);
  };

  const customStyles = {
    table: {
      style: {
        backgroundColor: "transparent", // Clip content that overflows the border
      },
    },
    headRow: {
      style: {
        backgroundColor: `rgba(6,120,11,0.6)`,
      },
    },
    headCells: {
      style: {
        color: theme === "light" ? "black" : "white",
        fontWeight: "bold",
        fontSize: "1.1em",
        padding: "10px",
        textAlign: "left",
      },
    },
    rows: {
      style: {
        backgroundColor: "rgba(217, 217, 217, 0.43)",
        "&:hover": {
          backgroundColor: "rgba(217, 217, 217, 0.43)",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: `rgba(6,120,11,0.6)`,
        color: "#ffffff",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      },
      pageButtonsStyle: {
        backgroundColor:
          theme === "light"
            ? "rgba(217, 217, 217, 0.43)"
            : "rgba(217, 217, 217, 0.5)",
        border: "none", // Remove border
        padding: "8px 12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "0 4px", // Margin between buttons
        cursor: "pointer", // Pointer on hover
        ":focus": {
          outline: "none", // Remove focus outline
        },
      },
    },
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
  
    if (!searchValue) {
      // If the input is cleared, reset the records to the original data
      setRecords(formattedData);
      return;
    }
  
    const fieldsToSearch = ["comment", "category", "post"];
    setRecords(
      formattedData.filter((row) => {
        return fieldsToSearch.some((field) =>
          field === "post"
            ? row[field][0]?.toLowerCase().includes(searchValue) // Check the first element of "post"
            : row[field]?.toLowerCase().includes(searchValue) // Check other fields
        );
      })
    );
  };

  return (
    <div className={styles.container}>
      <h3>All Comments</h3>
      <div className={styles.filterContainer}>
        <input
          placeholder="Search By Comment, Category or Post..."
          onChange={handleFilter}
        />
        <div className={styles.underline} />
      </div>
      <DataTable
        columns={getColumns()}
        data={records}
        pagination
        paginationPerPage={5} // Set the default number of rows per page
        paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 50]}  
        responsive
        highlightOnHover
        striped
        customStyles={customStyles}
        selectableRows
        onSelectedRowsChange={handleSelectedRowsChange}
        theme={theme === "light" ? "solarized" : "dark"}
      />


    </div>
  );
};

export default BlogTable;
