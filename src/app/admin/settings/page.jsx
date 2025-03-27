"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./settings.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faUser,
  faChevronDown,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import BASE_PATH from "../../../../base";
import { useSession } from "next-auth/react";
import slugify from "slugify";
import { handleImageUpload } from "@/utils/imageHandler";





  function OwnershipTransferModal({ users, onClose, onTransfer }) {
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmText, setConfirmText] = useState("");
    const [openUsers, setOpenUsers] = useState(false);
    const inputRef = useRef(null);
    const [transferText] = useState(crypto.randomUUID());
    const transferShowText = transferText;

    const handleSearch = (e) => {
      setSearch(e.target.value);
      setOpenUsers(true);
    };

    const handleSelectedUser = (user) => {
      setSelectedUser(user);
      setSearch(user.name);
      setOpenUsers(false);
    };

    const filteredUsers = users?.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );

    // Close dropdown when clicking outside
    const handleBlur = (e) => {
      if (!inputRef.current.contains(e.relatedTarget)) {
        setOpenUsers(false);
      }
    };

    return (
      <div
        className="modal"
        style={{
          borderRadius: "10px",
          backgroundColor: "green",
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          color:'white'
        }}
      >
        <h3>Transfer Ownership</h3>
        <p>Select a user to transfer ownership to:</p>

        <div style={{ position: "relative" }} ref={inputRef}>
          <input className={styles.input}
            type="text"
            value={search}
            onChange={handleSearch}
            onBlur={handleBlur}
            onFocus={()=>setOpenUsers(true)}
            placeholder="Search user..."
            style={{
              background: "rgba(255,255,255,0.1)",
              outline: "none",
              border: "2px solid red",
              padding: "10px",
              borderRadius: "10px",
              width: "100%"
            }}
          />
          {openUsers && filteredUsers?.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "green",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: 0,
                margin: 0,
                maxHeight: "150px",
                overflowY: "auto",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
              }}
            >
            {filteredUsers?.map((user) => (
                <li
                  key={user.id}
                  onMouseDown={() => handleSelectedUser(user)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Image src={user?.image || '/LinkedInAvatar.png'} width={30} height={30} alt={user.name} style={{ borderRadius: "50%" }} />
                  {user.name}
                  <input className={styles.input} type="checkbox" readOnly checked={user?.role === 'ADMIN'} style={{marginLeft:'auto'}}/>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedUser && (
          <>
            <p>Type <span style={{fontSize:'12px', fontWeight:'bold', userSelect: "none"}} contentEditable="false">"{transferShowText}"</span> to confirm:</p>
            <input className={styles.input}
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.1)",
                outline: "none",
                border: "2px solid blue",
                padding: "10px",
                borderRadius: "10px",
                width: "100%"
              }}
            />
            <button
              onClick={() => onTransfer(selectedUser)}
              disabled={confirmText !== transferText}
              style={{
                backgroundColor: confirmText === transferText ? "blue" : "gray",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: confirmText === transferText ? "pointer" : "not-allowed"
              }}
            >
              Confirm Transfer
            </button>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "10px" }}>Cancel</button>
      </div>
    );
  }




  

  function CategoryManagement({ allCat, onClose, onCategoryUpdate, onCategoryDelete }) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openCategories, setOpenCategories] = useState(false);
    const inputRef = useRef(null);
    const [newTitle, setNewTitle] = useState("");
    const [newColor, setNewColor] = useState("#000000"); // default color
    const [newImage, setNewImage] = useState(null);

    // console.log("Categories: ", allCat)

    const handleSearch = (e) => {
      setSearch(e.target.value);
      setOpenCategories(true);
    };

    const handleSelectedCategory = (cat) => {
      setSelectedCategory(cat);
      setSearch(cat.title);
      setNewTitle(cat.title); // Prefill title input
      setNewImage(cat.image); // Prefill title input
      setNewColor(cat.color || "#000000");
      setOpenCategories(false);
    };
    const filteredCategories = allCat?.filter((cat) =>
      (cat.title || "").toLowerCase().includes(search.toLowerCase())
    ) || [];
    

    // Close dropdown when clicking outside
    const handleBlur = (e) => {
      if (!inputRef.current.contains(e.relatedTarget)) {
        setOpenCategories(false);
      }
    };


    const handleConfirm = async () => {
      if (!selectedCategory) return;
    
      let imageUrl = selectedCategory.image; // Default to existing image
    
      if (newImage && newImage !== selectedCategory.image) {
        try {
          // Convert blob URL to File
          const response = await fetch(newImage);
          const blob = await response.blob();
          const file = new File([blob], "upload.jpg", { type: blob.type });
    
          // Upload to Cloudinary
          const uploadedImage = await handleImageUpload(file);
          imageUrl = uploadedImage.url;
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed.");
          return;
        }
      }
    
      const updatedCategory = {
        id: selectedCategory.id || "",
        title: newTitle?.trim() || selectedCategory.title,
        slug: slugify(newTitle || selectedCategory.title, { lower: true, strict: true }),
        image: imageUrl || "",
        color: newColor, // include the new color value
      };
    
      onCategoryUpdate(updatedCategory);
    };



    const handleDelete = () => {
      if (selectedCategory?.id) {
        onCategoryDelete(selectedCategory);
        setSelectedCategory(null);
        setSearch("");
        setNewTitle(""); 
        setNewImage(null); 
        setNewColor("#000000");
      }
    };
    


    return (
      <div
        className="modal"
        style={{
          borderRadius: "10px",
          backgroundColor: "green",
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          color:'white'
        }}
      >
        <h3>Manage Categories</h3>
        <p>Select a category to edit or click Add to create a new one.</p>

        <div style={{ position: "relative" }} ref={inputRef}>
          <input className={styles.input}
            type="text"
            value={search}
            onChange={handleSearch}
            onBlur={handleBlur}
            onFocus={()=>setOpenCategories(true)}
            placeholder="Search categories..."
            style={{
              background: "rgba(255,255,255,0.1)",
              outline: "none",
              border: "2px solid red",
              padding: "10px",
              borderRadius: "10px",
              width: "100%"
            }}
          />
          {openCategories && filteredCategories?.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "green",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: 0,
                margin: 0,
                maxHeight: "150px",
                overflowY: "auto",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
              }}
            >
              <li
              onMouseDown={() =>  handleSelectedCategory({ title: "" })}
              style={{
                padding: "12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add new category...
              </li>
            {filteredCategories?.map((cat) => (
                <li
                  key={cat.id}
                  onMouseDown={() => handleSelectedCategory(cat)}
                  style={{
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Image src={cat?.image || '/LinkedInAvatar.png'} width={30} height={30} alt={cat.title} style={{ borderRadius: "50%" }} />
                  {cat.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedCategory && (
          <>
            
            {newImage && <Image 
              src={newImage} 
              width={300} 
              height={200}  
              alt={newTitle} 
              style={{
                width: "100%", // Ensures responsiveness
                height: "200px",
                objectFit: "cover", // Ensures it fits properly
                borderRadius: "20px",
                marginInline: "auto",
                display: "block",
              }} 
            />}
            
            <input className={styles.input}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
              style={{
                background: "rgba(255,255,255,0.1)",
                outline: "none",
                border: "2px solid blue",
                padding: "10px",
                borderRadius: "10px",
                width: "100%",
              }}
            />

          <input className={styles.input}
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("Converting image")
                setNewImage(URL.createObjectURL(file)); // Convert file to preview URL
              }
            }}
            style={{
              background: "rgba(255,255,255,0.1)",
              outline: "none",
              border: "2px solid blue",
              padding: "10px",
              borderRadius: "10px",
              width: "100%",
            }}
          />


          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor:'pointer' }}>
            <label htmlFor="colorPicker">Category Color:</label>
            <input className={styles.input}
              id="colorPicker"
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              style={{ width: "100px", height: "30px", border: "none", padding: "0" }}
            />
          </div>


          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Confirm Update
          </button>

          {selectedCategory.id && (
              <button
                onClick={() => handleDelete(selectedCategory)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Delete Category
              </button>
            )}
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "10px" }}>Close</button>
      </div>
    );
  }











const Settings = () => {
  const { data } = useSession();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [isCatManagementOpen, setIsCatManagementOpen] = useState(false);
  const [allCat, setAllCat] = useState([]);

  const {autoSave,setAutoSave, theme, toggleSidePane, quillTheme, setQuillTheme, autoSaveDuration, setAutoSaveDuration,} = useContext(ThemeContext);
  const [emailNotificationFrequency, setEmailNotificationFrequency] = useState(0); 
  const [pushNotificationFrequency, setPushNotificationFrequency] = useState(0); 

  useEffect(()=>{
    const fetchData = async ()=>{
      if (isTransferOpen){
        try{
          const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/transferOwnership`);

          if (!result.ok){
            throw new Error(`Error - ${result.status}: ${result.statusText}`);
          }

          const data = await result.json();
          setAllUsers(data);

        }catch (e){
          alert(`Unable to get all users ${e.message}`);
        }
      }
    }
    fetchData()
  }, [isTransferOpen])


  useEffect(() => {
    if (!isCatManagementOpen) return;
    
    let fetched = false; // Prevent multiple fetches
  
    const fetchData = async () => {
      if (fetched) return; // Avoid duplicate calls
      fetched = true;
  
      try {
        // console.log("Fetching categories...");
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
        if (!result.ok) throw new Error(`Error - ${result.status}: ${result.statusText}`);
        const data = await result.json();
        // console.log("Fetched Categories:", data);
        setAllCat(data);
      } catch (e) {
        alert(`Unable to get all categories: ${e.message}`);
      }
    };
  
    fetchData();
  }, [isCatManagementOpen]);
  
  
  // Fix prop passing in CategoryManagement
  
  


  const handleDeleteAllPosts = async () => {
    const firstConfirm = window.confirm("Are you sure you want to delete all posts? This action cannot be undone.");
    if (!firstConfirm) return;
  
    const secondConfirm = window.confirm("This is your final confirmation. Deleting all posts is irreversible. Proceed?");
    if (!secondConfirm) return;

    const confirmationCode = crypto.randomUUID(); // Generate a random UUID
    const userInput = prompt(`To confirm, type the following code exactly:\n\n${confirmationCode}`);

    if (!userInput) return;

    if (userInput !== confirmationCode){alert("Sorry, what you typed in was incorrect. try again.");return}

  
    try {
      const res = await fetch("/api/deleteAllPosts", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("All posts have been deleted successfully.");
      } else {
        alert("Failed to delete posts: " + data.message);
      }
    } catch (error) {
      alert("An error occurred while deleting posts.");
    }
  };



  return (
    <div
      className={`${styles.container} ${toggleSidePane ? styles.active : ""}`}
      style={
        toggleSidePane
          ? { "--left": "80px", zIndex: 10, paddingBottom:'20%' }
          : { "--left": "250px", zIndex: 10, paddingBottom:'20%' }
      }
    >
      <h3>Basic Information</h3>

      <div className={styles.basicInfoContainer}>
        <div className={styles.profileImgContainer}>
          <Image
            fill
            src={`${data?.user?.image || '/LinkedInAvatar.png'}`}
            alt="profile picture"
            className={styles.img}
          />
        </div>
        <div className={styles.detailsContainer}>
          <div className={`${styles.detail}`}>
            <FontAwesomeIcon icon={faUser} />
            <p>{data?.user?.name}</p>
          </div>
          <Link href={`mailto:${data?.user?.email}`} className={`${styles.detail}`}>
            <FontAwesomeIcon icon={faAt} />
            <p>{data?.user?.email}</p>
          </Link>
          <Link href="/" className={`${styles.detail}`}>
            <FontAwesomeIcon icon={faHome} />
            <p>Home Page</p>
          </Link>
        </div>
      </div>

      <h3>Editor Settings</h3>

      <div className={styles.editorSettings}>
        <div className={styles.editorQuillThemeSetting}>
          <div className={styles.editorThemeSetting}>
            <label>
              <div className={styles.editorSetting}>
                <div className={styles.settingPreview}>
                  <Image
                    title="Snow Theme"
                    alt="Snow Theme"
                    className={styles.quillImg}
                    fill
                    src={
                      theme === "light"
                        ? `${BASE_PATH}/snow-theme-light.png`
                        : `${BASE_PATH}/snow-theme-dark.png`
                    }
                  />
                </div>
                <div className={styles.option}>
                  <input className={styles.input}
                    type="radio"
                    name="quillTheme"
                    value="snow"
                    checked={quillTheme === "snow"}
                    onChange={(e) => {
                      setQuillTheme(e.target.value);
                    }}
                  />
                  <span>Snow Theme</span>
                </div>
              </div>
            </label>

            
          </div>

          <div className={styles.editorThemeSetting}>
            <label>
              <div className={styles.editorSetting}>
                <div className={styles.settingPreview}>
                  <Image
                    title="Bubble Theme"
                    alt="Bubble Theme"
                    className={styles.quillImg}
                    fill
                    src={
                      theme === "light"
                        ? `${BASE_PATH}/bubble-theme-light.png`
                        : `${BASE_PATH}/bubble-theme-dark.png`
                    }
                  />
                </div>
                <div className={styles.option}>
                  <input className={styles.input}
                    type="radio"
                    name="quillTheme"
                    value="bubble"
                    checked={quillTheme === "bubble"}
                    onChange={(e) => {
                      setQuillTheme(e.target.value);
                    }}
                  />
                  <span>Bubble Theme</span>
                </div>
              </div>
            </label>
            

          </div>
        </div>

        <div className={styles.editAutoSaveSetting}>
          <div className={styles.desc}>
            <h4>Enable Autosave</h4>
            <p>
              This toggles the auto save feature of the editor, so you may not
              have to worry about closing without saving.
            </p>
          </div>
          <button
            onClick={() => {
              setAutoSave(!autoSave);
            }}
            className={autoSave ? styles.disabled : styles.enabled}
          >
            {autoSave ? "Disable" : "Enable"} Autosave
          </button>
        </div>

        <div className={styles.editAutoSaveSetting}>
          <div className={styles.desc}>
            <h4>Manage Autosave Interval</h4>
            <p>This determines the interval between auto saves</p>
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.selectBody}>
              <select
                value={autoSaveDuration}
                onChange={(e) => setAutoSaveDuration(Number(e.target.value))}
              >
                <option value="30000">Every 30 seconds</option>
                <option value="60000">Every 1 minute</option>
                <option value="120000">Every 2 minutes</option>
                <option value="300000">Every 5 minutes</option>
                <option value="600000">Every 10 minutes</option>
              </select>
              <div className={styles.selectIcon}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>Data Settings</h3>

      <div className={styles.dashboardSettings}>
        <div className={styles.accountSetting} style={{opacity:'40%'}}>
          <div className={styles.desc}>
            <h4>Download Dashboard Data</h4>
            <p>
              This Downloads all the given data in the chosen format for easy
              backing up
            </p>
          </div>
          <div className={styles.selectContainer}>
            <div className={`${styles.selectBody} ${styles.downloadSelect}`}>
              <select disabled>
                <option value="---"> Select Download Option </option>
                <option value="csv">CSV (Comma-Separated Values)</option>
                <option value="xls">XLS (Excel Spreadsheet)</option>
                <option value="xlsx">XLSX (Excel Open XML)</option>
                <option value="pdf">PDF (Portable Document Format)</option>
                <option value="json">JSON (JavaScript Object Notation)</option>
              </select>
              <div className={styles.selectIcon}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.accountSetting}>
          <div className={styles.desc}>
            <h4>Download Blog Data</h4>
            <p>
              This Downloads all the blog content ever created in the chosen
              format for easy backing up
            </p>
          </div>
          <div className={styles.selectContainer}>
            <div className={`${styles.selectBody} ${styles.downloadSelect}`}>
            <select
              onChange={(e) => {
                const format = e.target.value;
                if (format !== "---") {
                  window.open(`/api/downloadAllPosts?format=${format}`, "_blank");
                }
              }}
            >
                <option value="---"> Select Download Option </option>
                <option value="csv">CSV (Comma-Separated Values)</option>
                <option value="json">JSON (JavaScript Object Notation)</option>
              </select>
              <div className={styles.selectIcon}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
      </div>

      


      <h3>Category Settings</h3>

      <div className={styles.notificationSettings}>
        
        <div className={styles.editAutoSaveSetting}>
          <div className={styles.desc}>
            <h4>Manage Categories</h4>
            <p>
              This allows you to view, add, remove or edit a category for the posts.
            </p>
          </div>
          <button style={{position:'realative'}} onClick={() => {console.log("Something");setIsCatManagementOpen(!isCatManagementOpen)}} className={styles.disabled}>
           Manage Category
          </button>
          {isCatManagementOpen && (
            <div style={{width:'fit-content', top:'56%', right:'3.5%', position:'absolute', zIndex:'1'}}>
              <CategoryManagement
                allCat={allCat}
                onClose={() => setIsCatManagementOpen(false)}
                onCategoryDelete={async (category) => {
                  if (!category || !category.slug) return;

                  // Ask for confirmation with an extra prompt
                  const confirmDelete = window.confirm(
                    `Are you sure you want to delete the category "${category.title}"? All posts in this category will be reassigned to the "General" Category.`
                  );
                  if (!confirmDelete) return;

                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          slug: category.slug,
                          title: category.title,
                        }),
                      }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(data.message || "Failed to delete category");
                    }

                    alert(data.message);
                    // Optionally, update your UI state to remove the deleted category
                  } catch (error) {
                    console.error("Error deleting category:", error);
                    alert("Error deleting category: " + error.message);
                  }
                }}
                onCategoryUpdate={async (update) => {
                  try {
                    const response = await fetch("/api/categories", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(update),
                    });
                
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || "Failed to upload category");
                
                    alert("Category updated successfully!");
                    // onChange(data); // Send updated data back
                  } catch (error) {
                    console.error("Upload failed:", error);
                    alert("Upload failed. Check console for details.");
                  }
                  // alert(`New Category: ${JSON.stringify(update, null, 2)}`);  
                  // console.log("New Category: ", update);
                  setIsCatManagementOpen(false);
                }}
              />
            </div>
          )}
        </div>
        
      </div>


      <h3>Notification Settings</h3>

      <div className={styles.notificationSettings} style={{opacity:'40%'}}>
        <div className={styles.editAutoSaveSetting}>
          <div className={styles.desc}>
            <h4>Enable Email Notifications</h4>
            <p>
              Toggle email notifications for various updates and choose how
              often you would like to receive them.
            </p>
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.selectBody}>
              <select
                value={emailNotificationFrequency}
                onChange={(e) =>
                  setEmailNotificationFrequency(Number(e.target.value))
                }
                disabled
              >
                <option value="0">Never</option>
                <option value="300000">Every 5 minutes</option>
                <option value="1800000">Every 30 minutes</option>
                <option value="3600000">Every hour</option>
                <option value="86400000">Once a day</option>
              </select>
              <div className={styles.selectIcon}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.editAutoSaveSetting}>
          <div className={styles.desc}>
            <h4>Enable Push Notifications</h4>
            <p>
              Turn on push notifications to stay updated with the latest alerts
              and updates, and choose your preferred notification frequency.
            </p>
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.selectBody}>
              <select
                value={pushNotificationFrequency}
                onChange={(e) =>
                  setPushNotificationFrequency(Number(e.target.value))
                }
                disabled
              >
                <option value="0">Never</option>
                <option value="300000">Every 5 minutes</option>
                <option value="1800000">Every 30 minutes</option>
                <option value="3600000">Every hour</option>
                <option value="86400000">Once a day</option>
              </select>
              <div className={styles.selectIcon}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
      </div>



      <h3>Account Settings</h3>

      <div className={styles.accountSettings}>
        <div className={styles.accountSetting}>
          <div className={styles.desc}>
            <h4>Delete All Data</h4>
            <p>This gets rid of all content ever created as the current user</p>
          </div>
          <button onClick={handleDeleteAllPosts}>Delete Data</button>
        </div>

        <div className={styles.accountSetting}>
          <div className={styles.desc}>
            <h4>Transfer Ownership of This Blog</h4>
            <p>
              This removes your current ownership of this blog and then grants
              it to another user of your choosing
            </p>
          </div>
          <button style={{position:'realative'}} onClick={() => setIsTransferOpen(!isTransferOpen)}>Transfer Ownership</button>
          {isTransferOpen && (
            <div style={{width:'fit-content', top:'80%', right:'3.5%', position:'absolute', zIndex:'1'}}>
              <OwnershipTransferModal
                users={allUsers}
                onClose={() => setIsTransferOpen(false)}
                onTransfer={async (user) => {
                  if (!user) return;
                  console.log("USERS: ", user)
                  const newRole = user.role === "ADMIN" ? "USER" : "ADMIN"; // Toggle role
                
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/transferOwnership`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ userId: user.id, newRole }),
                    });
                
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message || "Failed to update role");
                
                    alert("User role updated successfully");

                    // window.location.reload();  
                    
                  } catch (error) {
                    alert(error.message);
                  } finally{
                    setIsTransferOpen(false);
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className={styles.accountSetting} style={{opacity:'40%'}}>
          <div className={styles.desc}>
            <h4>Change Current Password</h4>
            <p>This changes your current password to a new one</p>
          </div>
          <button disabled style={{}}>Change Password</button>
        </div>

        <div className={styles.accountSetting} style={{opacity:'40%'}}>
          <div className={styles.desc}>
            <h4>Two Factor Verification (2FA)</h4>
            <p>This Eneables Two Factor Verification (2FA)</p>
          </div>
          <button disabled style={{}}>Enable 2FA</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
