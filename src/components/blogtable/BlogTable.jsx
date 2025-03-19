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
  faHourglassHalf,
  faShare,
  faSyncAlt,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";
import Link from "next/link";
import { faHourglassEmpty } from "@fortawesome/free-regular-svg-icons";




const BlogTable = ({ data, page }) => {



  // { id: 1, title: 'A Deep Dive into the World of Music', date: '01 Oct 2024', thumbnail: '/culture.png', category: 'Music', views: 150, comments: 5, shares: 10 },

  console.log(data, page)

  const { theme, toggleSidePane } = useContext(ThemeContext);
  const [records, setRecords] = useState(data);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);



  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowClick = (row) => {
    if (screenWidth <= 1024 || (screenWidth >= 1024 && !toggleSidePane)) {
      setSelectedRow(row);
      setIsModalOpen(true);
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
    setIsModalOpen(false);
    setSelectedRow(null);
  };



  const capitalise = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1)
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
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${row?.slug}`} className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${row?.slug}`} className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className={`${styles.button} ${styles.delete}`} onClick={async () => {
                try {
                  await deletePost(row?.id, row?.title);
                  // Optionally refresh or update UI after deletion
                } catch (err) {
                  console.error(err.message);
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "70px",
        },
      ];
    } else if (screenWidth <= 640) {
      return [
        {
          name: "Image",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
              style={{width:'30px', height:'30px'}}
            />
          ),
          width: "60px",
        },{
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          width: "230px",
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${row?.slug}`} className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${row?.slug}`} className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className={`${styles.button} ${styles.delete}`} onClick={async () => {
                try {
                  await deletePost(row?.id, row?.title);
                  // Optionally refresh or update UI after deletion
                } catch (err) {
                  console.error(err.message);
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "80px",
        },
      ];
    } else if (screenWidth <= 868) {
      return [
        {
          name: "Image",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
              style={{width:'30px', height:'30px'}}
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
          selector: (row) => capitalise(row.category),
          sortable: true,
          width: "100px",
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${row?.slug}`} className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${row?.slug}`} className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className={`${styles.button} ${styles.delete}`} onClick={async () => {
                try {
                  await deletePost(row?.id, row?.title);
                } catch (err) {
                  console.error(err.message);
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "80px",
        },
      ];
    } else if (screenWidth <= 1024) {
      return [
        {
          name: "Image",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
              style={{width:'30px', height:'30px'}}
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
          selector: (row) => capitalise(row.category),
          sortable: true,
          width: "100px",
        },
        {
          name: "Reading Time",
          selector: (row) => (`${row.readingTime} mins`),
          sortable: true,
          width: "100px",
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${row?.slug}`} className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${row?.slug}`} className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className={`${styles.button} ${styles.delete}`} onClick={async () => {
                try {
                  await deletePost(row?.id, row?.title);
                  // Optionally refresh or update UI after deletion
                } catch (err) {
                  console.error(err.message);
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "80px",
        },
      ];
    } else if (screenWidth >= 1024) {
      return [
        {
          name: "Thumbnail",
          cell: (row) => (
            <img
              src={`${BASE_PATH}${row.thumbnail}`}
              alt="Thumbnail"
              className={styles.img}
              style={{width:'30px', height:'30px'}}
            />
          ),
          width: "90px",
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
          width: "120px",
        },
        {
          name: "Last Modifed",
          selector: (row) => row.lastModifiedDate,
          sortable: true,
          width: "120px",
        },
        {
          name: "Category",
          selector: (row) => capitalise(row.category),
          sortable: true,
          width: "100px",
        },
        {
          name: "Reading Time",
          selector: (row) => `${row.readingTime} mins`,
          sortable: true,
          width: "130px",
        },
        ...(!(page === 'draft')
          ? [
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
                width: "120px",
              },
              {
                name: "Likes",
                selector: (row) => row.comments,
                sortable: true,
                width: "90px",
              },
        
              {
                name: "Featured",
                cell: (row) => (
                  <div className={styles.actionContainer}>
                    <input
                      type="checkbox"
                      checked={row?.isFeatured}
                      onChange={async () => {
                        try {
                          await toggleFeature(row.id, "isFeatured", row?.isFeatured);
                        } catch (err) {
                          console.error(err.message);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ),
                width: "90px",
              },
              {
                name: "Editor's Pick",
                cell: (row) => (
                  <div className={styles.actionContainer}>
                    <input
                      type="checkbox"
                      checked={row?.isEditorPick}
                      onChange={async () => {
                        try {
                          await toggleFeature(row.id, "isEditorPick", row?.isEditorPick);
                        } catch (err) {
                          console.error(err.message);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ),
                width: "110px",
              },
            ]
          : []),
        {
          name: "Actions",
          cell: (row) => (
            <div className={styles.actionContainer}>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${row?.slug}`} className={`${styles.button} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${row?.slug}`} className={`${styles.button} ${styles.edit}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className={`${styles.button} ${styles.delete}`} onClick={async () => {
                try {
                  await deletePost(row?.id, row?.title);
                } catch (err) {
                  console.error(err.message);
                }
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ),
          width: "200px",
        },
      ];
    } 
  };


  const toggleFeature = async (id, field, currentValue) => {
    try {
      const res = await fetch("/api/allPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [field]: !currentValue }),
      });
  
      const text = await res.text(); // Read raw response before parsing JSON
  
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.message || "Failed to update post");
        
        setRecords((prevPosts) =>
          prevPosts.map((post) => ({
            ...post,
            [field]: field === "isFeatured" ? post.id === id : post.id === id ? !currentValue : post[field],
          }))
        );

        setSelectedRow((prevRow) =>
          prevRow && prevRow.id === id ? { ...prevRow, [field]: !currentValue } : prevRow
        );
        
        // alert(`${field === "isFeatured" ? "Featured" : "Editor's Pick"} updated successfully!`);
      } catch (error) {
        console.error("Error toggling feature:", text); // Log raw response
        alert(`Unexpected server response. ${text}.`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Check console.");
    }
  };


  const deletePost = async (id, title) => {
    const isDraft = page == 'draft' ? true : false;
    // Ask for confirmation first
    const confirmDelete = window.confirm(
      isDraft
        ? "Are you sure you want to delete this draft?"
        : "This action is irreversible! You must enter the post title to confirm deletion."
    );

    if (!confirmDelete) return;

    // If post is published, require title confirmation
    if (!isDraft) {
      const userInput = prompt(`Type the post title to confirm deletion: "${title}"`);
      if (userInput !== title) {
        alert("Title does not match. Deletion canceled.");
        return;
      }
    }
    try {
      const response = await fetch(`/api/allPosts`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
      console.log("Response:", response);
      console.log("Response Data:", data);
    
  
      if (!response.ok) {
        alert(`Some thing Went Wrong: ${data?.message}`)
        throw new Error(data.message || "Failed to delete post");
      }
      alert(`${title} has been deleted Successfully.`)
      // Update records after deletion
    setRecords((prev) => prev.filter((post) => post.id !== id));

    // Close modal
    setIsModalOpen(false);
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete post");
      }
  
      return data;
    } catch (error) {
      console.error("Error deleting post:", error.message);
      throw error;
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
                <FontAwesomeIcon className={styles.icon} icon={faSyncAlt} />
                <p>{selectedRow.lastModifiedDate}</p>
              </div>

              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faTag} />
                <p>{capitalise(selectedRow.category)}</p>
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
              <div className={styles.extraInfo}>
                <FontAwesomeIcon className={styles.icon} icon={faHourglassHalf} />
                <p>{selectedRow.readingTime} mins</p>
              </div>
            </div>
            <div className={styles.actionButtonsContainer}>
                <Link style={{display:'flex', flexDirection:'column', textAlign:'center', alignItems:'center', justifyContent:'center'}} href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/editor?post=${selectedRow?.slug}`} className={`${styles.button} ${styles.buttonInModal} ${styles.edit}`}>
                  <FontAwesomeIcon icon={faEdit} />
                  <p>Edit</p>
                </Link>
                <button
                className={`${styles.button} ${styles.buttonInModal} ${styles.delete}`}
                onClick={async () => {
                  try {
                    await deletePost(selectedRow?.id, selectedRow?.title);
                  } catch (err) {
                    console.error(err.message);
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete</p>
              </button>
              <Link style={{display:'flex', flexDirection:'column', textAlign:'center', alignItems:'center', justifyContent:'center'}} href={`${process.env.NEXT_PUBLIC_BASE_URL}${page === 'draft' ? '/preview/' : ''}${selectedRow?.slug}`} className={`${styles.button} ${styles.buttonInModal} ${styles.view}`}>
                <FontAwesomeIcon icon={faEye} />
                <p>{page === "published" ? "View" : "Preview"}</p>
              </Link>
              <br/>
            </div>
            {
              page !== 'draft' ?
              (
                <div style={{display:'flex', justifyContent:'space-around', width:'100%'}} >
                  <div style={{background:'rgba(255, 255, 255, 0.1)', width:'fit-content', padding:'1rem', display:'flex', gap:'5px', border:'0.5px solid rgba(255,255,255,0.3)', borderRadius:'10px'}}>
                    <label>Featured</label>
                    <input
                      type="checkbox"
                      checked={selectedRow?.isFeatured}
                      onChange={() => toggleFeature(selectedRow.id, "isFeatured", selectedRow?.isFeatured)}
                      style={{cursor:'pointer'}}
                    />
                  </div>
                  <div style={{background:'rgba(255, 255, 255, 0.1)', width:'fit-content', padding:'1rem', display:'flex', gap:'5px', border:'0.5px solid rgba(255,255,255,0.3)', borderRadius:'10px'}}>
                    <label>Editor's Pick</label>
                    <input
                      type="checkbox"
                      checked={selectedRow?.isEditorPick}
                      onChange={() => toggleFeature(selectedRow.id, "isEditorPick", selectedRow?.isEditorPick)}
                      style={{cursor:'pointer'}}
                    />
                  </div>
                </div>
              )
              :
              ''
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;
