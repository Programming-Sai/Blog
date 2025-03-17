"use client";
import React, { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import styles from "./blogtable.module.css";
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




const BlogTable = ({ data, page }) => {



  // { id: 1, title: 'A Deep Dive into the World of Music', date: '01 Oct 2024', thumbnail: '/culture.png', category: 'Music', views: 150, comments: 5, shares: 10 },

  console.log(data, page)

  const { theme, toggleSidePane } = useContext(ThemeContext);
  const [records, setRecords] = useState(data);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);



  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowClick = (row) => {
    if (screenWidth <= 1024 || (screenWidth >= 1024 && !toggleSidePane)) {
      setSelectedRow(row);
      setModalOpen(true);
      // console.log("Modal Opened: ", row);
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
    if (screenWidth <= 480) {
      return [
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "165px",
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
          width: "70px",
        },
      ];
    } else if (screenWidth <= 640) {
      return [
        {
          name: "ID",
          selector: (row) => row.id,
          sortable: true,
          width: "55px",
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "140px",
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true,
          width: "110px",
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
          width: "80px",
        },
      ];
    } else if (screenWidth <= 868) {
      return [
        { name: "#", selector: (row) => row.id, sortable: true, width: "45px" },
        {
          name: "Image",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
            />
          ),
          width: "75px",
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "200px",
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true,
          width: "110px",
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
          width: "80px",
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
          width: "80px",
        },
      ];
    } else if (screenWidth <= 1024) {
      return [
        { name: "#", selector: (row) => row.id, sortable: true, width: "45px" },
        {
          name: "Image",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
            />
          ),
          width: "75px",
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "250px",
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true,
          width: "110px",
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
          width: "80px",
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
          width: "80px",
        },
      ];
    } else if (screenWidth >= 1024 && toggleSidePane) {
      return [
        {
          name: "ID",
          selector: (row) => row.id,
          sortable: true,
          width: "60px",
        },
        {
          name: "Thumbnail",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
            />
          ),
          width: "90px",
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "450px",
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true,
          width: "120px",
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
          width: "100px",
        },
        {
          name: "Views",
          selector: (row) => row.views,
          sortable: true,
          width: "100px",
        },
        {
          name: "Comments",
          selector: (row) => row.comments,
          sortable: true,
          width: "90px",
        },
        {
          name: "Likes",
          selector: (row) => row.comments,
          sortable: true,
          width: "90px",
        },
        {
          name: "Sends",
          selector: (row) => row.shares,
          sortable: true,
          width: "90px",
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
    } else if (screenWidth >= 1024) {
      return [
        {
          name: "ID",
          selector: (row) => row.id,
          sortable: true,
          width: "60px",
        },
        {
          name: "Thumbnail",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
            />
          ),
          width: "90px",
        },
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "450px",
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true,
          width: "120px",
        },
        {
          name: "Category",
          selector: (row) => row.category,
          sortable: true,
          width: "100px",
        },
        {
          name: "Views",
          selector: (row) => row.views,
          sortable: true,
          width: "100px",
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
    }
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    // console.log("Selected Rows:", selectedRows);
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
    const fieldsToSearch = ["title", "category", "date"];
    setRecords(
      data.filter((row) => {
        return fieldsToSearch.some((field) =>
          row[field].toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
    );
  };

  useEffect(()=>{
    setRecords(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <input
          placeholder="Search By Title, Category or Date..."
          onChange={handleFilter}
        />
        <div className={styles.underline} />
      </div>
      <DataTable
        columns={getColumns()}
        data={records}
        pagination
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
                <p>{page === "published" ? "View" : "Preview"}</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;
