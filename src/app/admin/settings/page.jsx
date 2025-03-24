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
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import BASE_PATH from "../../../../base";
import { useSession } from "next-auth/react";






// const users = [
//   {
//     "id": "cm3kewr1t000010ao83elh8t0",
//     "name": "Isaiah Nii-Larte Mensah Lartey",
//     "email": "saiahniimensah@gmail.com",
//     "role": "ADMIN",
//     "image": null
//   },
//   {
//     "id": "cm3khf5yn0000d50anlh7xkfv",
//     "name": "Mensah",
//     "email": "saiahprog6@gmail.com",
//     "role": "ADMIN",
//     "image": "https://lh3.googleusercontent.com/a/ACg8ocKKy29LEnCUIufiN1Arm7zDTuldRkNOymhRM8cGQdOnYaqA7Q=s96-c"
//   },
//   {
//     "id": "cm8axu597000085en7kw92e82",
//     "name": "Saiah Good",
//     "email": "saiahgood113@gmail.com",
//     "role": "USER",
//     "image": "https://lh3.googleusercontent.com/a/ACg8ocKuzkGE3M6MFVRlkUl16GASxaDpWfPeVh_31QFlfVR2QRJsrg=s96-c"
//   },
//   {
//     "id": "cm8cfgllz0000da18469s4doc",
//     "name": "Mensah Naadu",
//     "email": "naadumensah17@gmail.com",
//     "role": "ADMIN",
//     "image": "https://lh3.googleusercontent.com/a/ACg8ocKWQ7XJkN7HTTjG6ap-IxwbFBvSTqoxEEliRfM_wagI3l9shA=s96-c"
//   },
//   {
//     "id": "cm8ipkmb6000011a319biy5a7",
//     "name": "Mensah Lartey Isaiah Nii Larte",
//     "email": "mensah.larte@a2sv.org",
//     "role": "ADMIN",
//     "image": "https://lh3.googleusercontent.com/a/ACg8ocJnfM3jjU1YBVpn9RuhSMM1k3nLY9Vo58aHx7K9-hmMFGvujg=s96-c"
//   },
  
// ]

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
          <input
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
                  <input type="checkbox" readOnly checked={user?.role === 'ADMIN'} style={{marginLeft:'auto'}}/>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedUser && (
          <>
            <p>Type <span style={{fontSize:'12px', fontWeight:'bold', userSelect: "none"}} contentEditable="false">"{transferShowText}"</span> to confirm:</p>
            <input
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











const Settings = () => {
  const { data } = useSession();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

  const {
    autoSave,
    setAutoSave,
    theme,
    toggleSidePane,
    quillTheme,
    setQuillTheme,
    autoSaveDuration,
    setAutoSaveDuration,
  } = useContext(ThemeContext);
  const [emailNotificationFrequency, setEmailNotificationFrequency] =
    useState(0); // default to 'Never'
  const [pushNotificationFrequency, setPushNotificationFrequency] = useState(0); // default to 'Never'

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
      const res = await fetch("/api/delete", { method: "DELETE" });
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
                  <input
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
                  <input
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
                onTransfer={(user) => {
                  console.log("Transferring ownership to:", user);
                  setIsTransferOpen(false);
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
