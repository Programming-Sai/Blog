import React from "react";
import styles from "./admincommentssection.module.css";
import BASE_PATH from "../../../base";

const comments = [
  {
    image: "/food.png",
    text: "This is an insightful post!",
    name: "John Doe",
    email: "john@example.com",
    timestamp: 1697364830000, // Unix timestamp
    postTitle: "Understanding React Hooks",
  },
  {
    image: "/fashion.png",
    text: "Thanks for the detailed explanation.",
    name: "Jane Smith",
    email: "jane@example.com",
    timestamp: 1697288400000,
    postTitle: "Advanced JavaScript Tips",
  },
  {
    image: "/travel.png",
    text: "Great read! I learned a lot.",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    timestamp: 1697378430000,
    postTitle: "CSS Flexbox Guide",
  },
  {
    image: "/coding.png",
    text: "Could you elaborate on the use of context in React?",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    timestamp: 1697302030000,
    postTitle: "Understanding React Context API",
  },
  {
    image: "/style.png",
    text: "This was exactly what I needed, thank you!",
    name: "Charlie Davis",
    email: "charlie.d@example.com",
    timestamp: 1697315630000,
    postTitle: "JavaScript ES6 Features",
  },
  {
    image: "/travel.png",
    text: "I disagree with some points, but interesting perspective!",
    name: "Eve Adams",
    email: "eve.a@example.com",
    timestamp: 1697359230000,
    postTitle: "Debunking Common JavaScript Myths",
  },
  {
    image: "/coding.png",
    text: "Fantastic tips for beginners!",
    name: "George Harris",
    email: "george.h@example.com",
    timestamp: 1697345630000,
    postTitle: "Getting Started with Node.js",
  },
  {
    image: "/fashion.png",
    text: "Your writing style is very engaging!",
    name: "Hannah King",
    email: "hannah.k@example.com",
    timestamp: 1697322030000,
    postTitle: "Building Accessible Web Apps",
  },
  {
    image: "/style.png",
    text: "I can’t wait to try these techniques out.",
    name: "Ian Thompson",
    email: "ian.t@example.com",
    timestamp: 1697338430000,
    postTitle: "Mastering CSS Grid",
  },
  {
    image: "/culture.png",
    text: "Please share more examples in the future!",
    name: "Jessica White",
    email: "jessica.w@example.com",
    timestamp: 1697382030000,
    postTitle: "Intro to TypeScript",
  },
];

const AdminCommentsSection = () => {
  return (
    <div className={styles.container}>
      <h2>Recent Comments</h2>
      <table className={styles.commentsTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Comment</th>
            <th>Name</th>
            <th>Email</th>
            <th>Timestamp</th>
            <th>Post Title</th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((comment, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`${BASE_PATH}${comment.image || '/coding.png'}`}
                  alt="Commenter"
                  className={styles.commentImage}
                />
              </td>
              <td>{comment.text}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{new Date(comment.timestamp).toLocaleString()}</td>
              <td>{comment.postTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCommentsSection;
