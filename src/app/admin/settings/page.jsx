"use client";
import React, { useContext, useState } from "react";
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







const users = ["john@example.com", "jane@example.com", "admin@example.com"]; // Replace with real data

function OwnershipTransferModal({ onClose, onTransfer }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((u) => u.includes(search));

  return (
    <div className="modal">
      <h3>Transfer Ownership</h3>
      <p>Select a user to transfer ownership to:</p>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search user..."
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user} onClick={() => setSelectedUser(user)}>
            {user}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <>
          <p>Type "TRANSFER" to confirm:</p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <button
            onClick={() => onTransfer(selectedUser)}
            disabled={confirmText !== "TRANSFER"}
          >
            Confirm Transfer
          </button>
        </>
      )}

      <button onClick={onClose}>Cancel</button>
    </div>
  );
}













const Settings = () => {
  const { data } = useSession();
  const [isTransferOpen, setIsTransferOpen] = useState(false);

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
          ? { "--left": "80px", zIndex: 10 }
          : { "--left": "250px", zIndex: 10 }
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

        <div className={styles.accountSetting} style={{position:'realative'}}>
          <div className={styles.desc}>
            <h4>Transfer Ownership of This Blog</h4>
            <p>
              This removes your current ownership of this blog and then grants
              it to another user of your choosing
            </p>
          </div>
          <button onClick={() => setIsTransferOpen(true)}>Transfer Ownership</button>
          {isTransferOpen && (
            <div style={{backgroundColor:'red'}}>

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
