"use client";
import React, { useContext, useState, useEffect } from "react"; 
// import styles from "./admincommentssection.module.css";
import DataTable from "react-data-table-component";
import styles from "../../components/blogtable/blogtable.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClose,
  faComment,
  faEdit,
  faEye,
  faShare,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";
import Link from "next/link";


const BlogTable = ({ data }) => {


  
  const capitalise = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  };



  const formattedData = data?.map((row, idx)=> {
    return {
      thumbnail: row?.user?.image,
      category: capitalise(row?.post?.catSlug),
      comment: row?.desc,
      userName: [row?.user?.name, row?.userEmail],
      post: [row?.post?.title, row?.postSlug]
    }
  });
  const { theme, toggleSidePane } = useContext(ThemeContext);
  const [records, setRecords] = useState(formattedData);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  useEffect(() => {
    setRecords(formattedData);
  }, [data]);
  
  
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowClick = (row) => {
    if (screenWidth <= 1024 || (screenWidth >= 1024 && !toggleSidePane)) {
      setSelectedRow(row);
      setModalOpen(true);
      console.log("Modal Opened: ", row);
    }
  };

  
  useEffect(() => {
    const sampleRow = {
      title: "This is Some Sample Title",
      date: "2024-10-26",
      category: "Tech",
      views: 100,
      thumbnail: "/p1.jpeg",
      comments: 3,
      shares: 8,
    };
    handleRowClick(selectedRow);
  }, [screenWidth, selectedRow]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const getColumns = () => {
      return [
        {
          name: "User Profile Pic",
          cell: (row) => (  
            <img
              src={`${BASE_PATH}${row?.thumbnail}` || '/coding.png'}
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
              href={`${process.env.NEXT_PUBLIC_BASE_URL}${row?.post[1]}`}
            >
              {row?.post[0]}
            </Link>
          ),
          sortable: true,
          width: "200px",
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <button className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className={`${styles.button} ${styles.delete}`}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          ),
          width: "200px",
        },
      ];
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
        cursor: screenWidth >= 1024 && !toggleSidePane ? "pointer" : "default",
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
        onRowClicked={handleRowClick} // Add this line
        theme={theme === "light" ? "solarized" : "dark"}
      />

      {isModalOpen && selectedRow && (
        <div className={styles.modal}>
          <div
            className={styles.modalContent}
            style={{ "--img": `url(${BASE_PATH}${selectedRow.thumbnail})` }}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2>{selectedRow.title}</h2>
            <div className={styles.extraInfoContainer}>
              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
                <p>{selectedRow.date}</p>
              </div>

              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faTag} />
                <p>{selectedRow.category}</p>
              </div>

              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faEye} />
                <p>{selectedRow.views}</p>
              </div>

              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faShare} />
                <p>{selectedRow.shares}</p>
              </div>

              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faComment} />
                <p>{selectedRow.comments}</p>
              </div>
            </div>
            <div className={styles.actionButtonsContainer}>
              <button
                className={`${styles.button} ${styles.buttonInModal} ${styles.edit}`}
              >
                <FontAwesomeIcon icon={faEdit} />
                <p>Edit</p>
              </button>
              <button
                className={`${styles.button} ${styles.buttonInModal} ${styles.delete}`}
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete</p>
              </button>
              <button
                className={`${styles.button} ${styles.buttonInModal} ${styles.view}`}
              >
                <FontAwesomeIcon icon={faEye} />
                <p>View</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;
